
import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from './ThemeProvider';
import { Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <motion.div
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.05 }}
    >
      <Button 
        variant="outline" 
        size="icon" 
        onClick={toggleTheme}
        className="rounded-full h-10 w-10 bg-background/50 backdrop-blur-sm border border-border hover:bg-background/80"
      >
        <motion.div
          initial={{ rotate: 0 }}
          animate={{ rotate: theme === 'dark' ? 180 : 0 }}
          transition={{ duration: 0.5 }}
        >
          {theme === 'dark' ? (
            <Sun className="h-[1.2rem] w-[1.2rem] text-yellow-500" />
          ) : (
            <Moon className="h-[1.2rem] w-[1.2rem] text-medical-default" />
          )}
        </motion.div>
      </Button>
    </motion.div>
  );
};

export default ThemeToggle;
