
import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <motion.footer
      className="py-8 text-center text-gray-500 mt-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.5 }}
    >
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-center md:justify-between">
          <div>
            <p className="text-sm">
              © {new Date().getFullYear()} Blood Guardian Classifier
            </p>
          </div>
          
          <div className="mt-4 md:mt-0">
            <p className="text-sm flex items-center justify-center">
              Made with <Heart className="w-4 h-4 mx-1 text-medical-accent" /> for medical research
            </p>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
