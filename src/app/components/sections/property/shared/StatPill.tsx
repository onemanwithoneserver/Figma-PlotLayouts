import React from 'react';
import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';

interface StatPillProps {
  icon?: string;
  svgIcon?: string;
  label: string;
  value: string;
  valid: boolean;
}

// Framer Motion Variants matching the rest of your app
const itemVariants = {
  hidden: { opacity: 0, filter: 'blur(6px)', y: 15 },
  show: { 
    opacity: 1, 
    filter: 'blur(0px)', 
    y: 0,
    transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] }
  }
};

const StatPill: React.FC<StatPillProps> = ({ icon, svgIcon, label, value, valid }) => {
  return (
    <motion.div 
      variants={itemVariants}
      className="flex-shrink-0 flex flex-col items-center group"
    >
      {/* Main Glass Circle */}
      <div className="relative w-20 h-20 mb-3">
        <div className="absolute inset-0 rounded-full border border-[#1A6B4A]/10 bg-[#D4F5E7]/60 backdrop-blur-md flex items-center justify-center shadow-sm transition-all duration-300 ease-out group-hover:shadow-[0_8px_24px_rgba(26,107,74,0.12)] group-hover:scale-105 group-hover:bg-[#D4F5E7] group-hover:border-[#1A6B4A]/20 overflow-hidden">
          
          {/* Subtle Light Sweep on Hover */}
          <div className="absolute top-0 -left-[100%] w-full h-full bg-gradient-to-r from-transparent via-white/60 to-transparent skew-x-[-20deg] transition-all duration-700 group-hover:left-[100%] pointer-events-none" />

          {svgIcon ? (
            <img 
              src={svgIcon} 
              alt={label} 
              className="w-9 h-9 object-contain transition-transform duration-300 group-hover:scale-110 relative z-10" 
            />
          ) : (
            <span className="text-2xl text-[#1A6B4A] transition-transform duration-300 group-hover:scale-110 relative z-10">
              {icon}
            </span>
          )}
        </div>

        {/* Status Badge - Floating Glass Style */}
        <div 
          className={`absolute bottom-0 right-0 w-7 h-7 rounded-full border-2 border-white flex items-center justify-center transition-all duration-300 shadow-md z-20 ${
            valid 
              ? 'bg-[#1A6B4A] shadow-[0_4px_12px_rgba(26,107,74,0.3)]' 
              : 'bg-[#F5A623] shadow-[0_4px_12px_rgba(245,166,35,0.3)]'
          }`}
        >
          {valid ? (
            <Check className="w-4 h-4 text-white" strokeWidth={3.5} />
          ) : (
            <X className="w-4 h-4 text-[#1A1A2E]" strokeWidth={3.5} /> // Using Text Primary for contrast against the accent yellow
          )}
        </div>
      </div>

      {/* Value Label */}
      <p className="text-[11px] font-medium text-[#4A5568] text-center tracking-[0.06em]">
        {label}
      </p>

      <p className="text-[15px] font-bold text-[#1A1A2E] text-center tracking-tight transition-colors duration-200">
        {value}
      </p>
    </motion.div>
  );
};

export default StatPill;