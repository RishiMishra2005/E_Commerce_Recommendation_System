import pandas as pd
import sqlite3
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

price = [40, 50, 60, 70, 100, 122, 106, 50, 30, 50]

def truncate(text, length):
    """Truncate text to a given length and add ellipsis."""
    if len(text) > length:
        return text[:length] + "..."
    else:
        return text

def content_based_recommendations(train_data, item_name, top_n=10):
    """Generate content-based recommendations based on product tags."""
    if item_name not in train_data['Name'].values:
        print(f"Item '{item_name}' not found in the training data.")
        return pd.DataFrame()

    tfidf_vectorizer = TfidfVectorizer(stop_words='english')
    tfidf_matrix_content = tfidf_vectorizer.fit_transform(train_data['Tags'])
    
    print(f"TF-IDF Matrix Shape: {tfidf_matrix_content.shape}")
    
    cosine_similarities_content = cosine_similarity(tfidf_matrix_content, tfidf_matrix_content)
    item_index = train_data[train_data['Name'] == item_name].index[0]
    similar_items = list(enumerate(cosine_similarities_content[item_index]))
    
    similar_items = sorted(similar_items, key=lambda x: x[1], reverse=True)
    top_similar_items = similar_items[1:top_n+1]
    
    recommended_item_indices = [x[0] for x in top_similar_items]
    
    recommended_items_details = train_data.iloc[recommended_item_indices][['Name', 'ReviewCount', 'Brand', 'ImgURL', 'Rating']]
    
    return recommended_items_details

def record_interaction(user_id, product_id):
    conn = sqlite3.connect('ecom_db.sqlite')
    cursor = conn.cursor()
    cursor.execute('''SELECT * FROM user_interaction WHERE user_id = ? AND product_id = ?''', (user_id, product_id))
    result = cursor.fetchone()
    
    if result:
        cursor.execute('''UPDATE user_interaction SET interaction_count = interaction_count + 1 WHERE user_id = ? AND product_id = ?''', (user_id, product_id))
    else:
        cursor.execute('''INSERT INTO user_interaction (user_id, product_id) VALUES (?, ?)''')
    
    conn.commit()
    conn.close()

def get_personal_recommendations(user_id):
    conn = sqlite3.connect('ecom_db.sqlite')
    cursor = conn.cursor()
    
    cursor.execute('''SELECT product_id, interaction_count FROM user_interaction WHERE user_id = ? ORDER BY interaction_count DESC LIMIT 5''', (user_id,))
    recommendations = cursor.fetchall()
    
    conn.close()
    
    if recommendations:
        return [row[0] for row in recommendations]
    else:
        return []