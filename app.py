from flask import Flask, render_template, request
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

with app.app_context():
    db.create_all()

if __name__ == "__main__":
    app.run(debug=True)