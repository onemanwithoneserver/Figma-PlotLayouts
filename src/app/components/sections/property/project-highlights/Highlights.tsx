import React from 'react';
import { highlightsData } from './data';

const Highlights: React.FC = () => {
  return (
    <ul className="px-3 pt-3 pb-2 flex flex-col gap-2.5 m-0 list-none font-outfit" role="list">
      {highlightsData.map((item, i) => (
        <li
          key={item.id}
          className="flex items-stretch gap-2.5 p-3 bg-[#EEF4F0] rounded-[8px] border border-[#C8DBCF] border-l-[3px] border-l-[#15653A] hover:bg-[#15653A] hover:border-[#15653A] hover:translate-x-1 transition-all duration-300 group cursor-pointer"
          role="listitem"
        >
          {/* Number indicator */}
          <div className="self-start w-[24px] h-[24px] flex-shrink-0 flex items-center justify-center rounded-[6px] bg-gradient-to-br from-[#15653A] to-[#2F7D4E] text-white shadow-sm mt-0.5">
            <span className="text-[11px] font-extrabold group-hover:scale-110 transition-transform duration-300">
              {item.id.toString().padStart(2, '0')}
            </span>
          </div>

          {/* Vertical Divider Line */}
          <div className="w-px bg-[#C8DBCF] group-hover:bg-white/20 transition-colors duration-300 self-stretch my-0.5" />

          {/* Content */}
          <div className="flex-1 flex flex-col gap-0.5 py-0.5">
            <h4 className="text-[13px] font-bold text-[#0B1F17] leading-tight group-hover:text-white transition-colors duration-200">
              {item.title}
            </h4>
            <p className="text-[11px] text-[#64786D] leading-[1.45] font-medium group-hover:text-white/90 transition-colors duration-200">
              {item.description}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default Highlights;