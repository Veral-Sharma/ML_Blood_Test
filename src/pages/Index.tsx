
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import Header from '@/components/Header';
import FileUpload from '@/components/FileUpload';
import ResultCard from '@/components/ResultCard';
import BloodCellInfo from '@/components/BloodCellInfo';
import Footer from '@/components/Footer';
import BioAnimation from '@/components/BioAnimation';
import { ClassificationResult } from '@/types';

// Server URL - change this to match your Flask server address
const API_URL = 'http://localhost:5000';

const classifyImage = async (file: File): Promise<ClassificationResult> => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await fetch(`${API_URL}/predict`, {
      method: 'POST',
      body: formData,
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    const text = await response.text();
    
    // Check if response is JSON
    try {
      const data = JSON.parse(text);
      
      // Create image URL from the uploaded file
      const imageSrc = URL.createObjectURL(file);
      
      return {
        prediction: data.prediction,
        confidence: data.confidence,
        imageSrc: imageSrc
      };
    } catch (error) {
      // If the response is not JSON, it's likely the HTML template response
      // Extract prediction and confidence from HTML
      const predictionMatch = text.match(/Prediction: ([A-Z]+)<\/h2>/);
      const confidenceMatch = text.match(/Confidence: ([0-9.]+)%<\/p>/);
      
      if (predictionMatch && confidenceMatch) {
        const prediction = predictionMatch[1];
        const confidence = parseFloat(confidenceMatch[1]);
        const imageSrc = URL.createObjectURL(file);
        
        return {
          prediction,
          confidence,
          imageSrc
        };
      } else {
        throw new Error('Could not parse server response');
      }
    }
  } catch (error) {
    console.error('Error classifying image:', error);
    throw error;
  }
};

// Fallback mock function in case the server is not available
const mockClassify = async (file: File): Promise<ClassificationResult> => {
  console.warn('Using mock classification - connect to Flask server for real predictions');
  return new Promise((resolve) => {
    // Simulate API delay
    setTimeout(() => {
      // Create a mock prediction
      const cellTypes = ['EOSINOPHIL', 'LYMPHOCYTE', 'MONOCYTE', 'NEUTROPHIL'];
      const randomIndex = Math.floor(Math.random() * cellTypes.length);
      const randomConfidence = 70 + Math.random() * 29; // 70-99% confidence
      
      // Create a URL for the uploaded image
      const imageSrc = URL.createObjectURL(file);
      
      resolve({
        prediction: cellTypes[randomIndex],
        confidence: randomConfidence,
        imageSrc: imageSrc
      });
    }, 1500);
  });
};

const Index: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [result, setResult] = useState<ClassificationResult>({
    prediction: null,
    confidence: null,
    imageSrc: null
  });

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    processImage(file);
  };

  const processImage = async (file: File) => {
    try {
      setIsProcessing(true);
      setResult({ prediction: null, confidence: null, imageSrc: null });
      
      // Try to use the real API, fall back to mock if it fails
      try {
        const classificationResult = await classifyImage(file);
        setResult(classificationResult);
        toast.success(`Classified as ${classificationResult.prediction}`);
      } catch (error) {
        console.error('Error connecting to Flask server:', error);
        toast.error('Could not connect to classification server, using mock data');
        
        // Fall back to mock for demonstration
        const mockResult = await mockClassify(file);
        setResult(mockResult);
        toast.info(`Mock classification: ${mockResult.prediction}`);
      }
    } catch (error) {
      console.error('Error processing image:', error);
      toast.error('Failed to process the image. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <BioAnimation />
      <Header />
      
      <main className="flex-grow container mx-auto px-4">
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
              Upload a blood cell image for instant classification
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Our machine learning model will identify the type of blood cell and provide confidence levels
            </p>
          </div>
          
          <FileUpload 
            onFileSelect={handleFileSelect}
            isProcessing={isProcessing}
          />
          
          {result.prediction && (
            <ResultCard result={result} />
          )}
          
          <BloodCellInfo />
        </motion.div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
