import React from 'react';
import { motion } from 'framer-motion';

interface FadeInSectionProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  direction?: 'up' | 'left' | 'none';
}

const FadeInSection: React.FC<FadeInSectionProps> = ({
  children,
  delay = 0,
  className = '',
  direction = 'up',
}) => {
  // Added blur to match the 'fade-blur-in' aesthetic used across the rest of the app
  const variants = {
    up: { 
      hidden: { opacity: 0, y: 16, filter: 'blur(6px)' }, 
      visible: { opacity: 1, y: 0, filter: 'blur(0px)' } 
    },
    left: { 
      hidden: { opacity: 0, x: -16, filter: 'blur(6px)' }, 
      visible: { opacity: 1, x: 0, filter: 'blur(0px)' } 
    },
    none: { 
      hidden: { opacity: 0, filter: 'blur(6px)' }, 
      visible: { opacity: 1, filter: 'blur(0px)' } 
    },
  };

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }} 
      transition={{ 
        duration: 0.5, 
        delay, 
        ease: [0.4, 0, 0.2, 1]
      }}
      variants={variants[direction]}
    >
      {children}
    </motion.div>
  );
};

export default FadeInSection;