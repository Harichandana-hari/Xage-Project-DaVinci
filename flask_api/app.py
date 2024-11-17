from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import pickle
from skimage.io import imread
from skimage.transform import resize
import os

app = Flask(__name__)
CORS(app, resources={r"/predict": {"origins": "https://xage-homepage-react.onrender.com/"}})
 # Correct way to enable CORS

# Load the trained model
with open('bone_age_gender_model.pkl', 'rb') as f:
    clf = pickle.load(f)

IMG_SIZE = (128, 128)

def preprocess_image(filepath):
    """Preprocesses the image for model input."""
    img = imread(filepath, as_gray=True)      # Load image and convert to grayscale
    img_resized = resize(img, IMG_SIZE)       # Resize to (128, 128)
    img_flattened = img_resized.flatten()     # Flatten the image
    return img_flattened

@app.route('/')
def index():
    return "Welcome to the Bone Age Prediction API!"

@app.route('/predict', methods=['OPTIONS', 'POST'])
def predict():
    if request.method == 'OPTIONS':
        return '', 200 
    # Ensure an image is provided in the request
    if 'image' not in request.files:
        return jsonify({"error": "No image file provided"}), 400

    file = request.files['image']
    filepath = 'temp_image.jpg'
    file.save(filepath)  # Save image temporarily

    try:
        # Preprocess the image and reshape for model input
        X_image = preprocess_image(filepath).reshape(1, -1)
        
        # Assuming gender input is always required, you should add logic here
        # to handle gender input. If not provided, you can set a default.
        gender = request.form.get('gender', 1)  # Default to male (1) if not provided
        X_gender = np.array([[int(gender)]])  # Convert gender to the right format
        
        # Combine image features with gender features
        X_test = np.hstack([X_image, X_gender])  # Ensure correct shape

        # Make prediction using the model
        prediction = clf.predict(X_test)

        # Extract bone age and gender from the model's prediction
        predicted_bone_age = prediction[0][0]  # Bone age
        predicted_gender = int(round(prediction[0][1]))  # Gender as binary

        # Remove temporary file
        os.remove(filepath)

        # Return prediction results
        return jsonify({
            "predicted_bone_age": predicted_bone_age,
            "predicted_gender": "Male" if predicted_gender == 1 else "Female"
        })

    except Exception as e:
        print(f"Error occurred: {e}")  # Print error to console for debugging
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':  # Corrected from '_main_' to '__main__'
    app.run(debug=False)
