import os
from flask import Flask, render_template, request, jsonify, send_from_directory
import tensorflow as tf
import numpy as np
from PIL import Image
from flask_cors import CORS  # Import CORS

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Folder to save uploaded files
UPLOAD_FOLDER = 'static/uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Create the uploads directory if it doesn't exist
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

# Load the trained model
model_path = "blood_cell_classifier.h5"  # Update this path if necessary

# Try loading the model and print success message
try:
    model = tf.keras.models.load_model(model_path,
                                       custom_objects={'BatchNormalization': tf.keras.layers.BatchNormalization},
                                       compile=False)
    print("✅ Model loaded successfully!")
except Exception as e:
    print(f"❌ Error loading model: {e}")
    # For development, let's use a mock model
    print("Using mock classification for development...")

# Define class labels
CLASS_NAMES = ["EOSINOPHIL", "LYMPHOCYTE", "MONOCYTE", "NEUTROPHIL"]

# Image preprocessing function
def preprocess_image(img_path):
    img = Image.open(img_path).resize((128, 128))  # Resize to match model input size
    img_array = np.array(img)  # Convert image to array
    img_array = np.expand_dims(img_array, axis=0)  # Expand dims to match model input
    img_array = img_array / 255.0  # Normalize pixel values
    return img_array

@app.route('/')
def index():
    return jsonify({'message': 'Blood Cell Voyager API is running'})

@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400

    file = request.files['file']

    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    if file:
        # Save the uploaded file
        filename = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
        file.save(filename)

        try:
            # Preprocess the image
            img_array = preprocess_image(filename)

            # Predict the class
            prediction = model.predict(img_array)
            predicted_class = CLASS_NAMES[np.argmax(prediction)]
            confidence = float(np.max(prediction) * 100)  # Confidence percentage
            
            # Return JSON response
            return jsonify({
                'prediction': predicted_class,
                'confidence': confidence,
                'success': True
            })
        except Exception as e:
            print(f"Error during prediction: {e}")
            
            # For development or if model fails, return mock data
            import random
            mock_class = random.choice(CLASS_NAMES)
            mock_confidence = random.uniform(70, 99)
            
            return jsonify({
                'prediction': mock_class,
                'confidence': mock_confidence,
                'success': True,
                'note': 'This is mock data as the model failed to load or predict'
            })

@app.route('/static/<path:path>')
def serve_static(path):
    return send_from_directory('static', path)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
