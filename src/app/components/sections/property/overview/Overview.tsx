import React, { useState } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { motion, AnimatePresence } from 'framer-motion';
import { OverviewItem, overviewData, OVERVIEW_INITIAL_COUNT } from './data';

// Framer Motion Variants
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, filter: 'blur(6px)', y: 10 },
  show: { 
    opacity: 1, 
    filter: 'blur(0px)', 
    y: 0,
    transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] }
  }
};

const OverviewTile: React.FC<{ item: OverviewItem }> = ({ item }) => {
  return (
    <motion.div 
      variants={itemVariants}
      whileHover={{ y: -4 }}
      className="group relative flex min-h-[88px] cursor-pointer flex-col items-center justify-center p-2.5 text-center transition-all duration-300 ease-out bg-white/60 backdrop-blur-md rounded-[8px] border border-[#E2E8F0] shadow-[0_2px_8px_rgba(26,107,74,0.06)] hover:bg-white/85 hover:shadow-[0_4px_12px_rgba(26,107,74,0.12)] overflow-hidden"
    >
      <div className="mb-1.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-[8px] bg-[#D4F5E7]/50 border border-[#1A6B4A]/10 shadow-[0_1px_4px_rgba(26,107,74,0.08)] transition-all duration-300 group-hover:scale-[1.05] group-hover:bg-[#D4F5E7] relative z-10">
        <div className="flex text-[18px] text-[#4A5568] transition-colors duration-300 group-hover:text-[#1A6B4A]">
          {item.icon}
        </div>
      </div>

      <span className="mb-0.5 break-words text-[10.5px] font-medium tracking-[0.02em] text-[#4A5568] transition-colors duration-300 group-hover:text-[#1A1A2E] relative z-10">
        {item.label}
      </span>
      
      <span className="break-words text-[12px] font-bold leading-tight text-[#1A1A2E] relative z-10 tracking-tight">
        {item.value}
      </span>
    </motion.div>
  );
};

const Overview: React.FC = () => {
  const [showAll, setShowAll] = useState(false);
  const displayed = showAll ? overviewData : overviewData.slice(0, OVERVIEW_INITIAL_COUNT);

  return (
    <div className="w-full py-1.5">
      <motion.div 
        layout
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="mb-2.5 grid grid-cols-3 gap-2"
      >
        <AnimatePresence>
          {displayed.map((item) => (
            <OverviewTile key={item.id} item={item} />
          ))}
        </AnimatePresence>
      </motion.div>

      <motion.div 
        layout
        initial={{ opacity: 0, filter: 'blur(6px)', y: 10 }}
        animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
        transition={{ delay: 0.3, duration: 0.4 }}
        className="flex justify-center mt-4"
      >
        <button
          onClick={() => setShowAll(!showAll)}
          className="flex min-h-[40px] items-center justify-center gap-1.5 rounded-[8px] bg-[#1A6B4A] px-6 py-2 shadow-[0_2px_8px_rgba(26,107,74,0.2)] transition-all duration-300 ease-out hover:-translate-y-[1px] hover:shadow-[0_4px_12px_rgba(26,107,74,0.3)] active:scale-[0.98]"
        >
          <span className="text-[13px] font-semibold text-[#FFFFFF] tracking-wide">
            {showAll ? 'show less' : 'view all details'}
          </span>
          
          <span className="flex text-[#FFFFFF] transition-transform duration-300">
            {showAll ? (
              <KeyboardArrowUpIcon sx={{ fontSize: 16 }} />
            ) : (
              <KeyboardArrowDownIcon sx={{ fontSize: 16 }} />
            )}
          </span>
        </button>
      </motion.div>
    </div>
  );
};

export default Overview;