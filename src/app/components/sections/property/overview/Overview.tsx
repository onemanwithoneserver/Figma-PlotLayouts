import React, { useState } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { motion } from 'framer-motion';
import { OverviewItem, overviewData, OVERVIEW_INITIAL_COUNT } from './data';

const OverviewTile: React.FC<{ item: OverviewItem; index: number }> = ({ item, index }) => {
  const delay = 40 + index * 40;

  return (
    <motion.div 
      whileHover={{ y: -4 }}
      className="glass group relative flex min-h-[88px] cursor-pointer flex-col items-center justify-center p-2.5 text-center transition-all duration-[240ms] ease-[cubic-bezier(0.4,0,0.2,1)] hover:bg-[rgba(255,255,255,0.78)] hover:shadow-[0_4px_12px_rgba(31,65,46,0.12)] overflow-hidden animate-fade-blur-in opacity-0"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="mb-1.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-[8px] bg-[rgba(47,111,78,0.08)] border border-[rgba(47,111,78,0.14)] shadow-[0_1px_4px_rgba(31,65,46,0.08)] transition-transform duration-[240ms] group-hover:scale-[1.03] relative z-10">
        <div className="flex text-[18px] text-[#4f5b53] transition-colors duration-[240ms] group-hover:text-[#2F6F4E]">
          {item.icon}
        </div>
      </div>

      <span className="mb-0.5 break-words text-[10.5px] font-medium tracking-[0.02em] text-[#4A5568] transition-colors duration-[240ms] group-hover:text-[#2f3a34] relative z-10">
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
      <div className="mb-2.5 grid grid-cols-3 gap-2">
        {displayed.map((item, index) => (
          <OverviewTile key={item.id} item={item} index={index} />
        ))}
      </div>

      <div className="flex justify-center animate-fade-blur-in opacity-0" style={{ animationDelay: '300ms' }}>
        <button
          onClick={() => setShowAll(!showAll)}
          className="flex min-h-[40px] items-center justify-center gap-1.5 rounded-[8px] bg-[#2F6F4E] px-6 py-2 shadow-[0_2px_8px_rgba(31,65,46,0.2)] transition-all duration-[240ms] ease-[cubic-bezier(0.4,0,0.2,1)] hover:-translate-y-[1px] hover:shadow-[0_3px_10px_rgba(31,65,46,0.24)] active:scale-[0.98]"
        >
          <span className="text-[13px] font-semibold text-[#FFFFFF] tracking-wide">
            {showAll ? 'show less' : 'view all details'}
          </span>
          
          <span className="flex text-[#FFFFFF] transition-transform duration-[240ms]">
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