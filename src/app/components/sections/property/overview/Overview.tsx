import React, { useState } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { OverviewItem, overviewData, OVERVIEW_INITIAL_COUNT } from './data';

const OverviewTile: React.FC<{ item: OverviewItem; index: number }> = ({ item, index }) => {
  // Stagger the entrance animation by 40ms per tile
  const delay = 40 + index * 40;

  return (
    <div 
      className="group relative flex min-h-[110px] cursor-pointer flex-col items-center justify-center rounded-[8px] bg-[rgba(255,255,255,0.65)] p-3 text-center backdrop-blur-[20px] border border-[rgba(255,255,255,0.6)] shadow-[0_4px_12px_rgba(0,0,0,0.04),inset_0_1px_0_rgba(255,255,255,0.8)] transition-all duration-[280ms] ease-[cubic-bezier(0.4,0,0.2,1)] hover:-translate-y-[3px] hover:scale-[1.02] hover:bg-[rgba(255,255,255,0.85)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] overflow-hidden animate-fade-blur-in opacity-0"
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Light shift sweep overlay matching the Hero section */}
      <div className="absolute top-0 -left-[100%] w-[50%] h-full bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.5)] to-transparent skew-x-[-20deg] transition-all duration-[600ms] ease-in-out group-hover:left-[200%] pointer-events-none z-20" />
      
      {/* Icon Wrapper styled like the Hero's verified developer box */}
      <div className="mb-2 flex h-9 w-9 shrink-0 items-center justify-center rounded-[8px] bg-[rgba(255,255,255,0.8)] border border-[rgba(255,255,255,0.6)] shadow-[0_2px_4px_rgba(0,0,0,0.04)] transition-transform duration-[280ms] group-hover:scale-110 relative z-10">
        <div className="flex text-[18px] text-[#4A5560] transition-colors duration-[280ms] group-hover:text-[#2F6F4E]">
          {item.icon}
        </div>
      </div>

      {/* Label styled with  matching the new aesthetic */}
      <span className="mb-1 break-words text-[10px] font-medium tracking-[0.02em] text-[#6B7280] transition-colors duration-[280ms] group-hover:text-[#4A5560] relative z-10 ">
        {item.label}
      </span>
      
      <span className="break-words text-[13px] font-bold leading-tight text-[#1A1F24] relative z-10 tracking-tight">
        {item.value}
      </span>
    </div>
  );
};

const Overview: React.FC = () => {
  const [showAll, setShowAll] = useState(false);
  const displayed = showAll ? overviewData : overviewData.slice(0, OVERVIEW_INITIAL_COUNT);

  return (
    <div className="w-full py-2">
      <div className="mb-6 grid grid-cols-3 gap-3">
        {displayed.map((item, index) => (
          <OverviewTile key={item.id} item={item} index={index} />
        ))}
      </div>

      {/* Button container with a delayed fade-in so it appears after the tiles */}
      <div className="flex justify-center animate-fade-blur-in opacity-0" style={{ animationDelay: '300ms' }}>
        <button
          onClick={() => setShowAll(!showAll)}
          className="flex min-h-[40px] items-center justify-center gap-1.5 rounded-[8px] bg-[#2F6F4E] px-6 py-2 shadow-[0_4px_12px_rgba(47,111,78,0.2)] transition-all duration-[280ms] ease-[cubic-bezier(0.4,0,0.2,1)] hover:-translate-y-[2px] hover:shadow-[0_8px_24px_rgba(47,111,78,0.3)] active:scale-95 group relative overflow-hidden"
        >
          {/* Subtle light sweep for the CTA button */}
          <div className="absolute top-0 -left-[100%] w-[50%] h-full bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.2)] to-transparent skew-x-[-20deg] transition-all duration-[600ms] ease-in-out group-hover:left-[200%] pointer-events-none" />
          
          <span className="text-[13px] font-semibold text-[#FFFFFF] tracking-wide relative z-10 ">
            {showAll ? 'show less' : 'view all details'}
          </span>
          
          <span className="flex text-[#FFFFFF] transition-transform duration-[280ms] group-hover:translate-y-[2px] relative z-10">
            {showAll ? (
              <KeyboardArrowUpIcon sx={{ fontSize: 16 }} />
            ) : (
              <KeyboardArrowDownIcon sx={{ fontSize: 16 }} />
            )}
          </span>
        </button>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fadeBlurIn { 
          from { opacity: 0; filter: blur(6px); transform: translateY(12px); } 
          to { opacity: 1; filter: blur(0px); transform: translateY(0); } 
        }
        .animate-fade-blur-in { animation: fadeBlurIn 0.28s cubic-bezier(0.4, 0, 0.2, 1) forwards; }
      `}} />
    </div>
  );
};

export default Overview;