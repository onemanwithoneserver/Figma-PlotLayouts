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
            className="flex items-stretch gap-3 p-3 rounded-[8px] bg-[#ECECE8] shadow-[3px_3px_6px_#CBCBC7,-3px_-3px_6px_#FFFFFF] active:shadow-[inset_2px_2px_4px_#CBCBC7,inset_-2px_-2px_4px_#FFFFFF] transition-shadow duration-200 animate-fade-blur-in opacity-0"
            style={{ animationDelay: `${delay}ms` }}
            role="listitem"
          >
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#2F6F4E] to-transparent opacity-80 rounded-l-[8px]" />

            <div className="self-start w-9 h-9 flex-shrink-0 flex items-center justify-center rounded-[8px] bg-[#ECECE8] shadow-[2px_2px_4px_#CBCBC7,-2px_-2px_4px_#FFFFFF] text-[#2F6F4E] mt-0.5">
              <span className="text-[13px] font-bold tracking-wider">
                {item.id.toString().padStart(2, '0')}
              </span>
            </div>

            <div className="w-px bg-gradient-to-b from-[rgba(0,0,0,0.08)] to-transparent self-stretch my-1" />

            <div className="flex-1 flex flex-col gap-1 py-0.5">
              <h4 className="text-[14px] font-bold text-[#1A2B22] leading-tight tracking-tight">
                {item.title}
              </h4>
              <p className="text-[12px] text-[#5C6B63] leading-[1.5] font-medium">
                {item.description}
              </p>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default Highlights;