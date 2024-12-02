from flask import Flask, request, jsonify
import pandas as pd

from util import content_based_recommendations, collaborative_recommendations, hybrid_recommendations
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)

# Load the product data
# train_data = pd.read_csv("models/clean_data.csv")
train_data = pd.read_csv("models/final_data.csv")

# Flask configuration
app.secret_key = "secret_key"
app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///ecom_db.sqlite"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# Define the database models
class Signup(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), nullable=False, unique=True)
    password = db.Column(db.String(100), nullable=False)

class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    price = db.Column(db.Float, nullable=False)
    img = db.Column(db.String(255), nullable=True)
    category_id = db.Column(db.Integer, nullable=True)
    factory = db.Column(db.String(100), nullable=True)
    description = db.Column(db.String(500), nullable=True)

class Cart(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_email = db.Column(db.String(100), nullable=False)
    product_id = db.Column(db.Integer, nullable=False)

class UserInteraction(db.Model):
    _tablename_ = 'user_interaction'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, nullable=False)
    product_id = db.Column(db.Integer, nullable=False)
    interaction_count = db.Column(db.Integer, default=1)

# Helper Functions
def record_interaction(user_id, product_id):
    ui = UserInteraction.query.filter_by(user_id=user_id, product_id=product_id).first()
    if ui:
        ui.interaction_count += 1
    else:
        ui = UserInteraction(user_id=user_id, product_id=product_id, interaction_count=1)
        db.session.add(ui)
    db.session.commit()

def get_personal_recommendations(user_id):
    interactions = UserInteraction.query.filter_by(user_id=user_id).order_by(UserInteraction.interaction_count.desc()).limit(5).all()
    return [interaction.product_id for interaction in interactions]

# Routes
@app.route('/users', methods=['POST'])
def add_user():
    data = request.get_json()
    new_user = Signup(username=data['fullName'], email=data['email'], password=data['password'])
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"message": "User added successfully", "user": data}), 201

@app.route('/viewProduct', methods=['POST'])
def view_product():
    data = request.get_json()
    record_interaction(data['user_id'],product_id=data['product_id'])
    
    return jsonify({"message": "Interaction added successfully"}), 201

@app.route('/fetchUser', methods=['POST'])
def fetch_user():
    data = request.get_json()
    user = Signup.query.filter_by(email=data['email'], password=data['password']).first()
    if user:
        role="U"
        if(user.email=="rishim842005@gmail.com"):
            role = "A"
        return jsonify({"id": user.id, "fullName": user.username, "email":user.email, "password":user.password,"isPresent":"Y",
                        "role":role}), 200
    return jsonify({"message": "Invalid credentials"}), 401

@app.route('/products', methods=['GET', 'POST'])
def manage_products():
    if request.method == 'GET':
        products = Product.query.all()
        return jsonify([{
            "id": product.id,
            "Name": product.name,
            "Quantity": product.quantity,
            "Price": product.price,
            "Img": product.img,
            "Categoryid": product.category_id,
            "Factory": product.factory,
            "Description": product.description
        } for product in products]), 200
    elif request.method == 'POST':
        data = request.get_json()
        new_product = Product(
            name=data['Name'],
            quantity=data['Quantity'],
            price=data['Price'],
            img=data.get('Img'),
            category_id=data.get('Categoryid'),
            factory=data.get('Factory'),
            description=data.get('Description')
        )
        db.session.add(new_product)
        db.session.commit()
        return jsonify({"message": "Product added successfully"}), 201

@app.route('/products/<int:prdID>', methods=['GET', 'PUT', 'DELETE'])
def product_operations(prdID):
    product = Product.query.get(prdID)
    if not product:
        return jsonify({"message": "Product not found"}), 404

    if request.method == 'GET':
        return jsonify({
            "id": product.id,
            "Name": product.name,
            "Quantity": product.quantity,
            "Price": product.price,
            "Img": product.img,
            "Categoryid": product.category_id,
            "Factory": product.factory,
            "Description": product.description
        }), 200
    elif request.method == 'PUT':
        data = request.get_json()
        product.name = data['Name']
        product.quantity = data['Quantity']
        product.price = data['Price']
        product.img = data.get('Img')
        product.category_id = data.get('Categoryid')
        product.factory = data.get('Factory')
        product.description = data.get('Description')
        db.session.commit()
        return jsonify({"message": "Product updated successfully"}), 200
    elif request.method == 'DELETE':
        db.session.delete(product)
        db.session.commit()
        return jsonify({"message": "Product deleted successfully"}), 200

@app.route('/cart', methods=['POST', 'GET', 'DELETE'])
def manage_cart():
    if request.method == 'POST':
        data = request.get_json()
        new_cart_item = Cart(user_email=data['email'], product_id=data['product']['id'])
        db.session.add(new_cart_item)
        db.session.commit()
        return jsonify({"message": "Product added to cart"}), 201
    elif request.method == 'GET':
        user_email = request.args.get('email')
        cart_items = Cart.query.filter_by(user_email=user_email).all()
        products = Product.query.filter(Product.id.in_([item.product_id for item in cart_items])).all()
        return jsonify([{
            "id": product.id,
            "Name": product.name,
            "Quantity": product.quantity,
            "Price": product.price,
            "Img": product.img,
            "Categoryid": product.category_id,
            "Factory": product.factory,
            "Description": product.description
        } for product in products]), 200
    elif request.method == 'DELETE':
        #data = request.get_json()
        Cart.query.filter_by(user_email=request.args.get('email'), product_id=request.args.get('product_id')).delete()
        db.session.commit()
        return jsonify({"message": "Product removed from cart"}), 200

@app.route('/personal_recommendations', methods=['GET'])
def personal_recommendations():
    user_id = request.args.get('user_id')

    if not user_id:
        return jsonify({"message": "Please log in to view recommendations"}), 401
    recommended_productids = get_personal_recommendations(user_id)
    products = Product.query.filter(Product.id.in_(recommended_productids)).all()
    return jsonify([{
            "id": product.id,
            "Name": product.name,
            "Quantity": product.quantity,
            "Price": product.price,
            "Img": product.img,
            "Categoryid": product.category_id,
            "Factory": product.factory,
            "Description": product.description
        } for product in products]), 200

@app.route("/recommendations", methods=['POST']) 
def recommendations(): 
    data = request.get_json(); 
    prod = data.get('prod'); 
    nbr = data.get('nbr', 5)
    content_based_rec = content_based_recommendations(train_data, prod, top_n=nbr) 
    return jsonify(content_based_rec.to_dict(orient="records")), 200

# Collaborative Rcommendations
@app.route('/collaborative_recommendations', methods=['POST'])
def collaborative_recommendations_route():
    data = request.get_json()
    user_id = data.get('user_id')
    recommendations = collaborative_recommendations(user_id,UserInteraction.query.all())
    return jsonify(recommendations), 200

# Hybrid Recommendations
@app.route("/hybrid_recommendations", methods=['POST'])
def hybrid_recommendations_api():
    data = request.get_json()
    user_id = data.get('user_id')
    item_name = data.get('item_name')
    nbr = data.get('nbr', 5)

    if not user_id or not item_name:
        return jsonify({"message": "User ID and item name are required"}), 400

    try:
        interaction_data = UserInteraction.query.all()
        interaction_df = pd.DataFrame([(i.user_id, i.product_id, i.interaction_count) for i in interaction_data], columns=['user_id', 'product_id', 'interaction_count'])
        user_item_matrix = interaction_df.pivot_table(index='user_id', columns='product_id', values='interaction_count', fill_value=0)

        hybrid_rec = hybrid_recommendations(train_data, user_id, item_name, user_item_matrix, top_n=nbr)
        return jsonify(hybrid_rec.to_dict(orient="records")), 200
    except Exception as e:
        return jsonify({"message": str(e)}), 500

# Filter by price 
@app.route('/products/filterByPrice', methods=['GET'])
def filter_by_price():
    try:
        min_price = request.args.get('min_price', default=0, type=float)
        max_price = request.args.get('max_price', default=float('inf'), type=float)

        products = Product.query.filter(Product.price >= min_price, Product.price <= max_price).all()

        return jsonify([{
            "id": product.id,
            "Name": product.name,
            "Quantity": product.quantity,
            "Price": product.price,
            "Img": product.img,
            "Categoryid": product.category_id,
            "Factory": product.factory,
            "Description": product.description
        } for product in products]), 200
    except Exception as e:
        return jsonify({"message": f"Error: {str(e)}"}), 500


if __name__ == "__main__":
    with app.app_context():
        db.create_all()
        print("Database initialized")
        CORS(app)
    app.run(debug=True)