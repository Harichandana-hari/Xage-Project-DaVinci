import React, { useState } from 'react';
import { FaFileImage } from "react-icons/fa";

export const ImageUpload = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);

  // Handle when file is selected from file input
  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      setSelectedFile(file);
      setIsUploaded(true);
    }
  };

  // Handle when file is dropped
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

  // Handle drag over event
  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };

  // Handle drag leave event
  const handleDragLeave = () => {
  
    setIsDragging(false);
  };

  const handleBackClick = () => {
    setSelectedImage(null); // Clear the image
    setSelectedFile(null);
    setIsUploaded(false); // Go back to the upload screen
  };

  const handleUploadClick = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('image', selectedFile); // Add the selected image file to the form data

      try {
        const response = await fetch('YOUR_BACKEND_URL/upload', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          // Handle success (e.g., show a message or update UI)
          alert('Image uploaded successfully!');
        } else {
          // Handle error response from the backend
          alert('Failed to upload image');
        }
      } catch (error) {
        // Handle network or other errors
        console.error('Error uploading image:', error);
        alert('Error uploading image');
      }
    }
  };

  return (
    
    <div className="ImageUpload">
    {!isUploaded ? (
      <div className='UploadPage'>
        <div className='welcome-text'>
          <p className='WelcomeText'>
              <h2 >Welcome to BoneXpert Online</h2>
              <h5 >BoneXpert Online provides automated bone age assessment from hand X-rays in your browser</h5>
          </p>
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
      </div>) :
      (
        <div className="UploadedImageView">
          <div className="ImageRect-uploaded">
            <img src={selectedImage} alt="Uploaded" className="uploaded-image" />
          </div>
          <div className="button-container">
            <button onClick={handleBackClick} className="back-button">Back</button>
            <button onClick={handleUploadClick} className="upload-button">Upload</button>
          </div>
        </div>
      )}
      
    </div>
  );
};
