
import React from 'react';
import { motion } from 'framer-motion';
import ThemeToggle from './ThemeToggle';

const Header: React.FC = () => {
  return (
    <motion.header 
      className="relative px-6 py-8 mb-8 overflow-hidden"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="cell-blob blob-gradient-1 w-60 h-60 -top-20 -left-20"></div>
        <div className="cell-blob blob-gradient-2 w-40 h-40 top-10 right-20"></div>
        <div className="cell-blob blob-gradient-3 w-30 h-30 bottom-5 left-1/3"></div>
      </div>
      
      <div className="flex justify-end px-6 mb-4">
        <ThemeToggle />
      </div>
      
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.div 
          className="inline-block mb-4"
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        >
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-medical-light via-medical-default to-medical-dark mx-auto"></div>
        </motion.div>
        
        <motion.h1 
          className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-medical-dark via-medical-default to-medical-accent"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Blood Guardian
        </motion.h1>
        
        <motion.p 
          className="mt-3 text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          Advanced blood cell classification powered by machine learning
        </motion.p>
      </div>
    </motion.header>
  );
};

export default Header;
