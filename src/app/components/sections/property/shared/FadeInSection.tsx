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
  const variants = {
    up: { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } },
    left: { hidden: { opacity: 0, x: -16 }, visible: { opacity: 1, x: 0 } },
    none: { hidden: { opacity: 0 }, visible: { opacity: 1 } },
  };

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.45, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      variants={variants[direction]}
    >
      {children}
    </motion.div>
  );
};

export default FadeInSection;
