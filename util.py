import pandas as pd
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity


def truncate(text, length):
    """Truncate text to a given length and add ellipsis."""
    if len(text) > length:
        return text[:length] + "..."
    else:
        return text

def content_based_recommendations(train_data, item_name, top_n=10):
    """Generate content-based recommendations based on product tags."""
    if not train_data['Name'].apply(lambda x: item_name.lower() in x.lower()).any():
        print(f"Item '{item_name}' not found in the training data.")
        return pd.DataFrame()
    
    tfidf_vectorizer = TfidfVectorizer(stop_words='english')
    tfidf_matrix_content = tfidf_vectorizer.fit_transform(train_data['Tags'])
    
    print(f"TF-IDF Matrix Shape: {tfidf_matrix_content.shape}")
    
    cosine_similarities_content = cosine_similarity(tfidf_matrix_content, tfidf_matrix_content)
    item_index = train_data[train_data['Name'].apply(lambda x: item_name.lower() in x.lower())].index[0]
    similar_items = list(enumerate(cosine_similarities_content[item_index]))
    
    similar_items = sorted(similar_items, key=lambda x: x[1], reverse=True)
    top_similar_items = similar_items[1:top_n+1]
    
    recommended_item_indices = [x[0] for x in top_similar_items]
    
    recommended_items_details = train_data.iloc[recommended_item_indices][['id','Name', 'ReviewCount', 'Factory', 'Img', 'Rating','Description']]
    
    return recommended_items_details


# Collaborative recommendations

def collaborative_recommendations(user_id):
    from app import UserInteraction
    
    interactions = UserInteraction.query.all()

    interaction_data = [(i.user_id, i.product_id, i.interaction_count) for i in interactions]
    interaction_df = pd.DataFrame(interaction_data, columns=['user_id', 'product_id', 'interaction_count'])

    user_item_matrix = interaction_df.pivot_table(index='user_id', columns='product_id', values='interaction_count', fill_value=0)
    reconstructed_matrix, user_mean, user_ids, product_ids = perform_svd(user_item_matrix)

    return recommend_products(user_id, reconstructed_matrix, user_mean, user_ids, product_ids)

def perform_svd(interaction_matrix, k=50):
    from scipy.sparse.linalg import svds

    interaction_matrix_np = interaction_matrix.values
    user_mean = interaction_matrix_np.mean(axis=1).reshape(-1, 1)
    interaction_matrix_centered = interaction_matrix_np - user_mean

    U, sigma, Vt = svds(interaction_matrix_centered, k=k)
    sigma = np.diag(sigma)
    reconstructed_matrix = np.dot(np.dot(U, sigma), Vt) + user_mean

    return reconstructed_matrix, user_mean, interaction_matrix.index, interaction_matrix.columns

def recommend_products(user_id, reconstructed_matrix, user_mean, user_ids, product_ids, top_n=5):
    if user_id not in user_ids:
        return []
    
    user_idx = user_ids.get_loc(user_id)
    predicted_scores = reconstructed_matrix[user_idx]
    recommended_indices = predicted_scores.argsort()[::-1]

    recommended_product_ids = [product_ids[i] for i in recommended_indices if i not in user_ids[user_id]]

    return recommended_product_ids[:top_n]


def hybrid_recommendations(train_data, user_id, item_name, user_item_matrix, top_n=10, content_weight=0.5, collaborative_weight=0.5):
    """Generate hybrid recommendations by combining content-based and collaborative filtering."""
    from scipy.sparse.linalg import svds

    U, sigma, Vt = svds(user_item_matrix, k=50)
    sigma = np.diag(sigma)

    # Content-based recommendations
    content_rec = content_based_recommendations(train_data, item_name, top_n=top_n)
    content_rec_ids = content_rec['id'].tolist()
    content_scores = {id: rank for rank, id in enumerate(content_rec_ids)}

    # Collaborative filtering predictions
    if user_id not in user_item_matrix.index:
        print(f"User ID {user_id} not found in interaction data. Skipping collaborative filtering.")
        collaborative_rec_ids = []
        collaborative_scores = {}
    else:
        user_idx = user_item_matrix.index.get_loc(user_id)
        predicted_scores = np.dot(np.dot(U, sigma), Vt)[user_idx]
        product_ids = user_item_matrix.columns
        collaborative_scores = {product_ids[i]: predicted_scores[i] for i in range(len(product_ids))}
        collaborative_rec_ids = sorted(collaborative_scores, key=collaborative_scores.get, reverse=True)

    # Merging both
    combined_scores = {}
    for id in set(content_rec_ids + collaborative_rec_ids):
        combined_scores[id] = (
            content_weight * content_scores.get(id, float('inf')) +
            collaborative_weight * -collaborative_scores.get(id, float('-inf'))
        )

    hybrid_rec_ids = sorted(combined_scores, key=combined_scores.get)[:top_n]

    hybrid_recommendations = train_data[train_data['id'].isin(hybrid_rec_ids)]
    return hybrid_recommendations
