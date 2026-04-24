import React, { useState } from 'react';
import { motion } from 'framer-motion';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { OverviewItem, overviewData, OVERVIEW_INITIAL_COUNT } from './data';

const OverviewTile: React.FC<{ item: OverviewItem; index: number }> = ({ item, index }) => {
  // Stagger the entrance animation by 40ms per tile
  const delay = 40 + index * 40;

  return (
    <motion.div 
      className="group flex min-h-[100px] cursor-pointer flex-col items-center justify-center rounded-[8px] bg-[#ECECE8] p-3 text-center shadow-[3px_3px_6px_#CBCBC7,-3px_-3px_6px_#FFFFFF] active:shadow-[inset_2px_2px_4px_#CBCBC7,inset_-2px_-2px_4px_#FFFFFF] transition-shadow duration-200 animate-fade-blur-in opacity-0"
      style={{ animationDelay: `${delay}ms`, transformPerspective: 600 }}
      whileTap={{ scale: 0.95, rotateX: 6 }}
      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
    >
      <div className="mb-2 flex h-9 w-9 shrink-0 items-center justify-center rounded-[8px] ">
        <div className="flex text-[18px] text-[#5C6B63]">
          {item.icon}
        </div>
      </div>

      <span className="mb-1 break-words text-[11px] font-semibold tracking-[0.02em] text-[#5C6B63]">
        {item.label}
      </span>
      
      <span className="break-words text-[13px] font-bold leading-tight text-[#1A2B22] tracking-tight">
        {item.value}
      </span>
    </motion.div>
  );
};

const Overview: React.FC = () => {
  const [showAll, setShowAll] = useState(false);
  const displayed = showAll ? overviewData : overviewData.slice(0, OVERVIEW_INITIAL_COUNT);

  return (
    <div className="w-full py-2">
      <div className="mb-4 grid grid-cols-3 gap-3">
        {displayed.map((item, index) => (
          <OverviewTile key={item.id} item={item} index={index} />
        ))}
      </div>

      {/* Button container with a delayed fade-in so it appears after the tiles */}
      <div className="flex justify-center animate-fade-blur-in opacity-0" style={{ animationDelay: '300ms' }}>
        <button
          onClick={() => setShowAll(!showAll)}
          className="neu-btn-green flex min-h-[44px] items-center justify-center gap-1.5 px-6 py-2.5 group relative overflow-hidden"
        >
          <span className="text-[13px] font-semibold text-[#FFFFFF] tracking-wide">
            {showAll ? 'show less' : 'view all details'}
          </span>
          <span className="flex text-[#FFFFFF]">
            {showAll ? (
              <KeyboardArrowUpIcon sx={{ fontSize: 16 }} />
            ) : (
              <KeyboardArrowDownIcon sx={{ fontSize: 16 }} />
            )}
          </span>
        </button>
      </div>


    </div>
  );
};

export default Overview;