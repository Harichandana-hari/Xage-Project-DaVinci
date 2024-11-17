import React, { useState } from 'react';
import { FaFileImage } from "react-icons/fa";

export const ImageTest = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);
  const [predictionResult, setPredictionResult] = useState(null); // State for prediction results

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      setSelectedFile(file);
      setIsUploaded(true);
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);
    const file = event.dataTransfer.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      setSelectedFile(file);
      setIsUploaded(true);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleBackClick = () => {
    setSelectedImage(null);
    setSelectedFile(null);
    setIsUploaded(false);
    setPredictionResult(null); // Clear prediction result when going back
  };

  const handleUploadClick = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('image', selectedFile); // Add the selected image file to the form data

      try {
        const response = await fetch('https://xage-flask-backend.onrender.com/predict', { // Replace with your backend URL
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          const result = await response.json();
          console.log('Prediction result:', result);
          setPredictionResult(result); // Store the prediction result to display it
        } else {
          alert('Failed to get prediction');
        }
      } catch (error) {
        console.error('Error getting prediction:', error);
        alert('Error getting prediction');
      }
    }
  };

  return (
    <div className="ImageUpload">
      {!isUploaded ? (
        <div className="UploadPage">
          <div className="WelcomeText">
            <h2>Welcome to Xage!</h2>
            <h5>Xage Online provides automated bone age assessment from hand X-rays.</h5>
          </div>

          <div
            className={`ImageRect ${isDragging ? 'dragging' : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div className="ImageIcon">
              <FaFileImage size={80} />
            </div>

            {selectedImage ? (
              <img src={selectedImage} alt="Uploaded" className="uploaded-image" />
            ) : (
              <div className="InstrText">
                Click or drag an image to this area
              </div>
            )}

            <input
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="file-input"
            />
          </div>
        </div>
      ) : (
        <div className="UploadedImageView">
          <div className="ImageRect-uploaded">
            <img src={selectedImage} alt="Uploaded" className="uploaded-image" />
          </div>

          <div className="button-container">
            <button onClick={handleBackClick} className="back-button">Back</button>
            <button onClick={handleUploadClick} className="upload-button">Upload</button>
          </div>

          {predictionResult && (
            <div className="prediction-results">
              <h3>Prediction Results</h3>
              <p>Predicted Bone Age: {(Number(predictionResult.predicted_bone_age)/12).toFixed(2)} years</p>
              <p>Predicted Gender: {predictionResult.predicted_gender}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
