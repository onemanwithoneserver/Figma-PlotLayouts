import React from 'react';
import { highlightsData } from './data';

const Highlights: React.FC = () => {
  return (
    <ul className="px-3 pt-3 pb-2 flex flex-col gap-3 m-0 list-none w-full" role="list">
      {highlightsData.map((item, index) => {
        const delay = 40 + index * 40;
        
        return (
          <li
            key={item.id}
            className="group relative flex items-stretch gap-3 p-3 rounded-[8px] bg-[rgba(255,255,255,0.65)] backdrop-blur-[20px] border border-[rgba(255,255,255,0.6)] shadow-[0_4px_12px_rgba(0,0,0,0.04),inset_0_1px_0_rgba(255,255,255,0.8)] hover:-translate-y-[3px] hover:scale-[1.01] hover:bg-[rgba(255,255,255,0.85)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition-all duration-[280ms] ease-[cubic-bezier(0.4,0,0.2,1)] cursor-pointer overflow-hidden animate-fade-blur-in opacity-0"
            style={{ animationDelay: `${delay}ms` }}
            role="listitem"
          >
            <div className="absolute top-0 -left-[100%] w-[50%] h-full bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.5)] to-transparent skew-x-[-20deg] transition-all duration-[600ms] ease-in-out group-hover:left-[200%] pointer-events-none z-20" />
            
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#2F6F4E] to-transparent opacity-80 rounded-l-[8px]" />

            <div className="self-start w-9 h-9 flex-shrink-0 flex items-center justify-center rounded-[8px] bg-[rgba(47,111,78,0.08)] border border-[rgba(47,111,78,0.15)] text-[#2F6F4E] mt-0.5 relative z-10 transition-all duration-[280ms] ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:bg-[rgba(47,111,78,0.15)] group-hover:scale-105">
              <span className="text-[13px] font-bold tracking-wider">
                {item.id.toString().padStart(2, '0')}
              </span>
            </div>

            <div className="w-px bg-gradient-to-b from-[rgba(0,0,0,0.08)] to-transparent self-stretch my-1 relative z-10" />

            <div className="flex-1 flex flex-col gap-1 py-0.5 relative z-10">
              <h4 className="text-[14px] font-bold text-[#1A1F24] leading-tight tracking-tight transition-colors duration-[280ms]">
                {item.title}
              </h4>
              <p className="text-[12px] text-[#6B7280] leading-[1.5] font-medium transition-colors duration-[280ms] group-hover:text-[#4A5560]">
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