from flask import Flask, render_template
import pandas as pd
import random
from util import truncate

app = Flask(__name__)

trending_products = pd.read_csv("models/updated_products.csv")
train_data = pd.read_csv("models/clean_data.csv")

price = [40, 50, 60, 70, 100, 122, 106, 50, 30, 50]

@app.route("/")
def index():
    return render_template(
        'index.html',
        trending_products=trending_products.head(8),
        truncate=truncate,
        random_price=random.choice(price)
    )

@app.route("/main")
def main():
    return render_template("main.html")

@app.route("/index")
def indexredirect():
    return render_template(
        'index.html',
        trending_products=trending_products.head(8),
        truncate=truncate,
        random_price=random.choice(price)
    )


if __name__ == "__main__":
    app.run(debug=True)
