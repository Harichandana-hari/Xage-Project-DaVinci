# **XAGE Bone-Age-Gender-Prediction**

## **Table of Contents**
1. [**Objective**](#objective)  
2. [**About the Project**](#about-the-project)  
3. [**Key Features**](#key-features)  
4. [**Dataset**](#dataset)  
5. [**Application Features**](#application-features)  
6. [**Technology Stack**](#technology-stack)  
7. [**Installation**](#installation)  
8. [**Usage**](#usage)  
9. [**Project Structure**](#project-structure)  
10. [**Acknowledgments**](#acknowledgments)  

---

## **Objective**
Develop a machine learning model to predict **bone age** (in months) and classify **gender** (Male/Female) from hand X-ray images.  

---

## **About the Project**
This project combines multi-output regression and classification techniques to provide a robust solution for analyzing hand X-ray images. It includes:  
- Secure user authentication for managing access.  
- A dynamic, modern homepage for uploading and analyzing X-rays.  

---

## **Key Features**
- **Bone Age Prediction**: Outputs the predicted bone age in months.  
- **Gender Classification**: Classifies the gender as Male or Female.  
- **User Authentication**: Secured with **bcrypt hashing**.  
- **Modern Frontend**: Built with React.js for a responsive and interactive user experience.  

---

## **Dataset**
The dataset comprises X-ray images annotated with bone age and gender labels:  
- **Total Images**: 15,800  
- **Image Size**: Resized to 128x128 pixels  
- **Gender Labels**: Binary (1 for Male, 0 for Female)  
- **Bone Age Labels**: Continuous values in months  

---

## **Application Features**

### **Login Page**
- Developed using **HTML**, **CSS**, and **JavaScript**.  
- **Secure Passwords**: Uses bcrypt hashing for password security.  

### **Homepage**
- **React.js**-based interface for uploading X-ray images and viewing predictions.  

### **Backend**
- A **Flask** API integrates the machine learning model with the frontend.  

### **Database**
- **MongoDB** stores user credentials and related data.  

---

## **Technology Stack**
- **Frontend**: HTML, CSS, JavaScript, React.js  
- **Backend**: Flask  
- **Database**: MongoDB  
- **Machine Learning**: Python, scikit-learn, NumPy, Pandas, scikit-image  

---

## **Installation**

### **Prerequisites**
- Python (3.8 or later)  
- Node.js and npm  
- MongoDB  

### **Steps**
1. **Clone the repository**:  
   ```bash
   git clone https://github.com/your-username/Bone-Age-Gender-Prediction.git
   cd Bone-Age-Gender-Prediction
2. **Install backend dependencies**;
   ```bash
   pip install -r requirements.txt
3. **Navigate to the React.js app directory and install frontend dependencies**
   ```bash
   cd react-app
   npm install
4. **Install additional Node.js dependencies**
   ```bash
   npm install express
   npm install mongoose
   npm install bcrypt
   npm install validator

5.  **Start the React.js frontend**
    ``` bash
       npm start
6. **Run the Flask backend**
   ```bash
   python app.py

## **Usage**
### **Run the Application**

***Start the Flask server and React.js app as detailed above.***
### **Access the Application**

***Open your browser and navigate to http://localhost:3000 for the homepage.***

### **Upload X-Ray**

***Log in and upload an X-ray image to receive predictions.***

## **Project Structure**
Bone-Age-Gender-Prediction   
├── bone_age_gender_model.pkl   
├──images  
├──   ├──Sign_Up.png  
├──   ├──Homepage.png  
├──   ├──Upload.png  
├──   ├──Output.png  
├── app.py                        
├── requirements.txt              
├── templates                     
├── static                        
├── react-app                    
└── README.md                    

## **Acknowledgments**
1.**Dataset:**
***Bone Age dataset contributors.***

2.**Libraries**
***Flask, React.js, MongoDB, scikit-learn, and more.***





   
