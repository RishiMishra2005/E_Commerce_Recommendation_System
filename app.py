from flask import Flask, render_template, request, session
import pandas as pd
import random
from util import truncate, price, content_based_recommendations
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

# Load the product data
trending_products = pd.read_csv("models/updated_products.csv")
train_data = pd.read_csv("models/clean_data.csv")

# Flask configuration
app.secret_key = "secret_key"
app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///ecom_db.sqlite"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# Define the user models
class Signup(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), nullable=False)
    password = db.Column(db.String(100), nullable=False)

class Signin(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), nullable=False)
    password = db.Column(db.String(100), nullable=False)

class UserInteraction(db.Model):
    __tablename__ = 'user_interaction'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, nullable=False)
    product_id = db.Column(db.Integer, nullable=False)
    interaction_count = db.Column(db.Integer, default=1)

def record_interaction(user_id, product_id):
    # conn = sqlite3.connect('ecom_db.sqlite')
    # cursor = conn.cursor()
    # cursor.execute('''SELECT * FROM user_interaction WHERE user_id = ? AND product_id = ?''', (user_id, product_id))
    # result = cursor.fetchone()
    
    # if result:
    #     cursor.execute('''UPDATE user_interaction SET interaction_count = interaction_count + 1 WHERE user_id = ? AND product_id = ?''', (user_id, product_id))
    # else:
    #     cursor.execute('''INSERT INTO user_interaction (user_id, product_id) VALUES (?, ?)''')
    
    # conn.commit()
    # conn.close()
    ui=UserInteraction.query.filter_by(user_id=user_id, product_id=product_id).first()
    if(ui):
        ui.interaction_count += 1
        db.session.commit()
    else:
        new_ui=UserInteraction(user_id=user_id, product_id=product_id, interaction_count=1)
        db.session.add(new_ui)
        db.session.commit()

def get_personal_recommendations(user_id):
    # conn = sqlite3.connect('ecom_db.sqlite')
    # cursor = conn.cursor()
    
    # cursor.execute('''SELECT product_id, interaction_count FROM user_interaction WHERE user_id = ? ORDER BY interaction_count DESC LIMIT 5''', (user_id,))
    # recommendations = cursor.fetchall()
    
    # conn.close()
    
    # if recommendations:
    #     return [row[0] for row in recommendations]
    # else:
    #     return []
    ui=UserInteraction.query.filter_by(user_id=user_id).order_by(UserInteraction.interaction_count.desc()).limit(5).all()
    print(ui)
    if(ui):
        return [row.product_id for row in ui]
    else:
        return []


# Routes
@app.route("/")
def index():
    """Home page with trending products."""
    return render_template(
        'index.html',
        trending_products=trending_products.head(8),
        truncate=truncate,
        random_price=random.choice(price)
    )

@app.route("/main")
def main():
    """Main recommendations page."""
    return render_template("main.html", content_based_rec=None, message="Search for product recommendations.")

@app.route("/index")
def indexredirect():
    """Redirect to home page."""
    return render_template(
        'index.html',
        trending_products=trending_products.head(8),
        truncate=truncate,
        random_price=random.choice(price)
    )

@app.route("/close", methods=['POST'])
def close():
    """Display product details and record interaction."""
    user_id = session.get('user_id')
    data = request.get_json()  # Get the JSON data from the POST request
    product_id = data.get('product_id')
    print(product_id)
    if user_id:
        record_interaction(user_id, product_id)
    
    return {"message": "Product modal closed", "product_id": product_id}
    #product = trending_products.loc[trending_products['ID'] == product_id].iloc[0]
    
    #return render_template('product_detail.html', product=product)

@app.route("/personal_recommendations")
def personal_recommendations():
    """Display personal recommendations for a user."""
    user_id = session.get('user_id')
    
    if not user_id:
        return "You need to log in to see personal recommendations."
    
    recommended_products_ids = get_personal_recommendations(user_id)
    
    recommended_products = trending_products[trending_products['ID'].isin(recommended_products_ids)]
    print(recommended_products)
    
    if not recommended_products.empty:
        return render_template(
            'personal_recommendation.html', 
            recommendations=recommended_products,
            truncate=truncate,
            random_price=random.choice(price)
        )
    else:
        return render_template('personal_recommendation.html', message="No personalized recommendations available.")

@app.route("/recommendations", methods=['POST'])
def recommendations():
    """Display product recommendations based on content."""
    prod = request.form.get('prod')
    nbr = int(request.form.get('nbr'))

    content_based_rec = content_based_recommendations(train_data, prod, top_n=nbr)

    if content_based_rec.empty:
        message = f"No recommendations available for product '{prod}'."
        return render_template('main.html', content_based_rec=None, message=message)
    else:
        return render_template(
            'main.html', 
            content_based_rec=content_based_rec, 
            truncate=truncate,
            random_price=random.choice(price),
            message=None
        )

@app.route("/signup", methods=['POST', 'GET'])
def signup():
    """Handle signup requests."""
    if request.method == 'POST':
        username = request.form['username']
        email = request.form['email']
        password = request.form['password']

        new_signup = Signup(username=username, email=email, password=password)
        db.session.add(new_signup)
        db.session.commit()

        return render_template(
            'index.html', 
            trending_products=trending_products.head(8), 
            truncate=truncate,
            random_price=random.choice(price),
            signup_message='User signed up successfully!'
        )
    return render_template('index.html')

@app.route('/signin', methods=['POST', 'GET'])
def signin():
    """Handle signin requests."""
    if request.method == 'POST':
        username = request.form['signinUsername']
        password = request.form['signinPassword']
        
        user = Signup.query.filter_by(username=username, password=password).first()
        if user:
            session['user_id'] = user.id  # Store user id in session for tracking
            return render_template(
                'index.html', 
                trending_products=trending_products.head(8), 
                truncate=truncate,
                random_price=random.choice(price),
                signup_message='User signed in successfully!'
            )
        else:
            return render_template(
                'index.html', 
                trending_products=trending_products.head(8), 
                truncate=truncate,
                random_price=random.choice(price),
                signup_message='Invalid username or password!'
            )
    return render_template('index.html')

if __name__ == "__main__":
    with app.app_context():
        db.create_all()
        print('Table created successfully')
    app.run(debug=True)