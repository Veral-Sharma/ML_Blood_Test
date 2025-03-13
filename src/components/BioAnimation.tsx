
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const BioAnimation: React.FC = () => {
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; size: number; delay: number; color: string }[]>([]);

  useEffect(() => {
    // Create random cell particles
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 3 + Math.random() * 10,
      delay: Math.random() * 5,
      color: [
        'rgba(139, 92, 246, 0.3)',
        'rgba(217, 70, 239, 0.3)',
        'rgba(14, 165, 233, 0.3)',
        'rgba(236, 72, 153, 0.3)'
      ][Math.floor(Math.random() * 4)]
    }));
    
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none z-[-1]">
      <motion.div
        className="dna-strand left-[10%] top-[20%]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 2 }}
      >
        <svg width="100" height="200" viewBox="0 0 100 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M50 0V200" stroke="url(#dna-gradient)" strokeWidth="2" strokeDasharray="10 10" />
          <path d="M30 20C30 20 70 20 70 20" stroke="url(#dna-gradient)" strokeWidth="2" />
          <path d="M20 40C20 40 80 40 80 40" stroke="url(#dna-gradient)" strokeWidth="2" />
          <path d="M30 60C30 60 70 60 70 60" stroke="url(#dna-gradient)" strokeWidth="2" />
          <path d="M20 80C20 80 80 80 80 80" stroke="url(#dna-gradient)" strokeWidth="2" />
          <path d="M30 100C30 100 70 100 70 100" stroke="url(#dna-gradient)" strokeWidth="2" />
          <path d="M20 120C20 120 80 120 80 120" stroke="url(#dna-gradient)" strokeWidth="2" />
          <path d="M30 140C30 140 70 140 70 140" stroke="url(#dna-gradient)" strokeWidth="2" />
          <path d="M20 160C20 160 80 160 80 160" stroke="url(#dna-gradient)" strokeWidth="2" />
          <path d="M30 180C30 180 70 180 70 180" stroke="url(#dna-gradient)" strokeWidth="2" />
          <defs>
            <linearGradient id="dna-gradient" x1="0" y1="0" x2="0" y2="200" gradientUnits="userSpaceOnUse">
              <stop stopColor="#8B5CF6" />
              <stop offset="0.5" stopColor="#D946EF" />
              <stop offset="1" stopColor="#0EA5E9" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>
      
      <motion.div
        className="dna-strand right-[15%] top-[30%]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 2, delay: 0.5 }}
      >
        <svg width="100" height="200" viewBox="0 0 100 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M50 0V200" stroke="url(#dna-gradient2)" strokeWidth="2" strokeDasharray="10 10" />
          <path d="M30 20C30 20 70 20 70 20" stroke="url(#dna-gradient2)" strokeWidth="2" />
          <path d="M20 40C20 40 80 40 80 40" stroke="url(#dna-gradient2)" strokeWidth="2" />
          <path d="M30 60C30 60 70 60 70 60" stroke="url(#dna-gradient2)" strokeWidth="2" />
          <path d="M20 80C20 80 80 80 80 80" stroke="url(#dna-gradient2)" strokeWidth="2" />
          <path d="M30 100C30 100 70 100 70 100" stroke="url(#dna-gradient2)" strokeWidth="2" />
          <path d="M20 120C20 120 80 120 80 120" stroke="url(#dna-gradient2)" strokeWidth="2" />
          <path d="M30 140C30 140 70 140 70 140" stroke="url(#dna-gradient2)" strokeWidth="2" />
          <path d="M20 160C20 160 80 160 80 160" stroke="url(#dna-gradient2)" strokeWidth="2" />
          <path d="M30 180C30 180 70 180 70 180" stroke="url(#dna-gradient2)" strokeWidth="2" />
          <defs>
            <linearGradient id="dna-gradient2" x1="0" y1="0" x2="0" y2="200" gradientUnits="userSpaceOnUse">
              <stop stopColor="#D946EF" />
              <stop offset="0.5" stopColor="#0EA5E9" />
              <stop offset="1" stopColor="#8B5CF6" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>
      
      {particles.map(particle => (
        <motion.div
          key={particle.id}
          className="cell-particle"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color
          }}
          animate={{
            y: [0, -20, 0],
            x: [0, 10, 0, -10, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 8,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
};

export default BioAnimation;
