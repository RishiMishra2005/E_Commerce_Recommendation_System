# EchoMart: Where Every Click Matters  

EchoMart is an innovative e-commerce platform designed to enhance the online shopping experience with machine learning-powered recommendations, seamless user interaction, and an intuitive design.  

## 🚀 Features  

### 🛒 Why EchoMart?  
- **Personalized Recommendations**: Tailored suggestions using ML algorithms.  
- **Optimized Server-Side Computation**: Recommendations are generated only when needed, ensuring efficiency.  
- **24/7 Chatbot Support**: Instant assistance for users.  
- **Admin Panel**: Manage products with options to add, edit, or remove items.  
- **User-Friendly Interface**: Simplifies navigation for a seamless shopping experience.  

### 🔍 Recommendation Strategies  
1. **Content-Based Filtering**: Here the recommendations are provided to the user based on the name of the product from which the user interact, i.e products having similar name will be recommended to the user.
2. **Collaborative Filtering**: Here the recommendations are provided to the user based on the interactions of all the different users, thus providing diverse recommendations.
3. **Hybrid Recommendation System**: Here recommendations are provided to the user based on both the Content-Based filtering and Collaboraive filtering.  

## 💻 Tech Stack  
- **Frontend**: Angular, Bootstrap  
- **Backend**: Flask  
- **Database**: SQLite  

## 📂 Project Structure  
```
/echomart
├── static/               # Static files (CSS, JS, images)
├── templates/            # HTML templates (index.html, main.html, etc.)
├── app.py                # Main Flask application
├── util.py               # Recommendation utility functions
├── models/               # Database models
├── Angular-frontend/     # Angular frontend files
└── README.md             # Project documentation
```


## 🛠️ Installation  

### Prerequisites  
- Python 3.8+  
- Node.js and Angular CLI  

### Setup  
1. Clone the repository:  
   ```  
   git clone https://github.com/username/echomart.git  
   cd echomart
   ```
2. Set up the backend:
   ```
   pip install -r requirements.txt  
   python app.py
   ```
3. Set up the frontend:
   ```
   cd Angular-Frontend  
   npm install  
   ng serve
   ```
4. Access the application at:<br>
   Backend: http://localhost:5000<br>
   Frontend: http://localhost:4200
  
## Contributing
Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a new branch (git checkout -b feature-branch).
3. Make your changes.
4. Commit your changes (git commit -m 'Add some feature').
5. Push to the branch (git push origin feature-branch).
6. Open a pull request.

Happy shoppping with EchoMart! If you encounter any issues, feel free to open an issue on the repository.

