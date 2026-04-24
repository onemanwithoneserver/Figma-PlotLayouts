import React from 'react';
import { motion } from 'framer-motion';
import { highlightsData } from './data';

const Highlights: React.FC = () => {
  // Framer Motion variants for clean, staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.05 } // 50ms delay between each item
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, filter: 'blur(6px)', y: 15 },
    show: { 
      opacity: 1, 
      filter: 'blur(0px)', 
      y: 0,
      transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] }
    }
  };

  return (
    <motion.ul 
      className="px-3 pt-3 pb-2 flex flex-col gap-3 m-0 list-none w-full" 
      role="list"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {highlightsData.map((item) => (
        <motion.li
          key={item.id}
          variants={itemVariants}
          tabIndex={0} // Makes the item focusable for keyboard navigation
          className="group relative flex items-stretch gap-3 p-3 rounded-xl bg-white/60 backdrop-blur-md border border-white/70 shadow-[0_2px_8px_rgba(26,107,74,0.06)] hover:-translate-y-1 hover:bg-white/80 hover:shadow-[0_6px_16px_rgba(26,107,74,0.1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A6B4A]/50 transition-all duration-300 ease-out cursor-pointer overflow-hidden"
          role="listitem"
        >
          {/* Accent Left Border */}
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#1A6B4A]/30 rounded-l-xl transition-colors duration-300 group-hover:bg-[#1A6B4A]/60" />

          {/* Number Badge */}
          <div className="self-start w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-lg bg-[#D4F5E7]/50 border border-[#1A6B4A]/10 text-[#1A6B4A] mt-0.5 relative z-10 transition-transform duration-300 ease-out group-hover:bg-[#D4F5E7] group-hover:scale-105">
            <span className="text-[14px] font-bold tracking-wider">
              {item.id.toString().padStart(2, '0')}
            </span>
          </div>

          {/* Vertical Divider */}
          <div className="w-px bg-[#E2E8F0] self-stretch my-1 relative z-10 transition-colors duration-300 group-hover:bg-[#1A6B4A]/20" />

          {/* Text Content */}
          <div className="flex-1 flex flex-col gap-1 py-0.5 relative z-10">
            <h4 className="text-[15px] font-bold text-[#1A1A2E] leading-tight tracking-tight transition-colors duration-300">
              {item.title}
            </h4>
            <p className="text-[13px] text-[#4A5568] leading-relaxed font-medium transition-colors duration-300 group-hover:text-[#1A1A2E]">
              {item.description}
            </p>
          </div>
        </motion.li>
      ))}
    </motion.ul>
  );
};

export default Highlights;