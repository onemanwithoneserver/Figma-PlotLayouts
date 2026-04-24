import React from 'react';
import { highlightsData } from './data';

const Highlights: React.FC = () => {
  return (
    <ul className="px-3 pt-3 pb-2 flex flex-col gap-2 m-0 list-none w-full" role="list">
      {highlightsData.map((item, index) => {
        const delay = 40 + index * 40;
        
        return (
          <li
            key={item.id}
            className="group relative flex items-stretch gap-2 p-3 rounded-[8px] bg-[rgba(255,255,255,0.62)] backdrop-blur-[8px] border border-[rgba(255,255,255,0.68)] shadow-[0_1px_6px_rgba(31,65,46,0.08)] hover:-translate-y-[1px] hover:bg-[rgba(255,255,255,0.78)] hover:shadow-[0_2px_8px_rgba(31,65,46,0.1)] transition-all duration-[240ms] ease-[cubic-bezier(0.4,0,0.2,1)] cursor-pointer overflow-hidden animate-fade-blur-in opacity-0"
            style={{ animationDelay: `${delay}ms` }}
            role="listitem"
          >
            <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-[#2F6F4E]/35 rounded-l-[8px]" />

            <div className="self-start w-9 h-9 flex-shrink-0 flex items-center justify-center rounded-[8px] bg-[rgba(47,111,78,0.08)] border border-[rgba(47,111,78,0.14)] text-[#2F6F4E] mt-0.5 relative z-10 transition-all duration-[240ms] ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:bg-[rgba(47,111,78,0.12)] group-hover:scale-[1.02]">
              <span className="text-[13px] font-bold tracking-wider">
                {item.id.toString().padStart(2, '0')}
              </span>
            </div>

            <div className="w-px bg-[rgba(20,34,24,0.08)] self-stretch my-1 relative z-10" />

            <div className="flex-1 flex flex-col gap-1 py-0.5 relative z-10">
              <h4 className="text-[14px] font-bold text-[#142218] leading-tight tracking-tight transition-colors duration-[240ms]">
                {item.title}
              </h4>
              <p className="text-[12px] text-[#5a665e] leading-[1.45] font-medium transition-colors duration-[240ms] group-hover:text-[#46524a]">
                {item.description}
              </p>
            </div>
          </li>
        );
      })}

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fadeBlurIn { 
          from { opacity: 0; filter: blur(6px); transform: translateY(12px); } 
          to { opacity: 1; filter: blur(0px); transform: translateY(0); } 
        }
        .animate-fade-blur-in { animation: fadeBlurIn 0.28s cubic-bezier(0.4, 0, 0.2, 1) forwards; }
      `}} />
    </ul>
  );
};

export default Highlights;