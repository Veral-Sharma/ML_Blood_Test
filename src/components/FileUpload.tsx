
import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useDropzone } from 'react-dropzone';
import { Upload, FileImage, FilePlus2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import LoadingSpinner from './LoadingSpinner';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  isProcessing: boolean;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileSelect, isProcessing }) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragActive, setIsDragActive] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      const reader = new FileReader();
      
      reader.onloadend = () => {
        setPreview(reader.result as string);
        onFileSelect(file);
      };
      
      reader.readAsDataURL(file);
    }
  }, [onFileSelect]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp']
    },
    maxFiles: 1,
    onDragEnter: () => setIsDragActive(true),
    onDragLeave: () => setIsDragActive(false),
    onDropAccepted: () => setIsDragActive(false),
    onDropRejected: () => setIsDragActive(false)
  });

  const resetUpload = () => {
    setPreview(null);
  };

  return (
    <motion.div
      className="w-full max-w-2xl mx-auto my-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.5 }}
    >
      <div className={`upload-area ${isDragActive ? 'drag-active' : ''}`}>
        {isProcessing ? (
          <div className="flex flex-col items-center justify-center py-12">
            <LoadingSpinner size="lg" />
            <p className="mt-6 text-lg font-medium text-gray-700">Processing blood cell image...</p>
          </div>
        ) : preview ? (
          <div className="flex flex-col items-center">
            <motion.div
              className="relative w-full max-w-md rounded-lg overflow-hidden shadow-lg mb-4"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <img 
                src={preview} 
                alt="Selected blood cell" 
                className="w-full h-auto object-contain"
              />
            </motion.div>
            
            <div className="flex gap-4">
              <Button 
                variant="outline" 
                onClick={resetUpload}
                className="btn-secondary"
              >
                <FilePlus2 className="w-4 h-4 mr-2" />
                Choose Another Image
              </Button>
              
              <Button 
                onClick={() => {/* Submit will be handled by the parent component */}}
                className="btn-primary"
              >
                <Upload className="w-4 h-4 mr-2" />
                Classify Cell
              </Button>
            </div>
          </div>
        ) : (
          <div {...getRootProps()} className="cursor-pointer">
            <input {...getInputProps()} />
            <div className="flex flex-col items-center justify-center py-12">
              <div className="bg-medical-light p-4 rounded-full mb-4">
                <FileImage className="w-12 h-12 text-medical-default" />
              </div>
              <p className="text-lg font-medium text-gray-700">Drag and drop a blood cell image</p>
              <p className="text-sm text-gray-500 mt-1">or click to select a file</p>
              <p className="text-xs text-gray-400 mt-6">Supported formats: JPG, PNG, GIF</p>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default FileUpload;
