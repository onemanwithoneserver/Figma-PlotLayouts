import React from 'react';
import { highlightsData } from './data';

const Highlights: React.FC = () => {
  return (
    <ul className="px-3 pt-3 pb-2 flex flex-col gap-2.5 m-0 list-none font-outfit" role="list">
      {highlightsData.map((item, i) => (
        <li
          key={item.id}
          className="flex items-start gap-3 p-3 bg-[var(--color-bg-soft)] rounded-[var(--radius-md)] border border-[var(--color-bg-mid)] border-l-[3px] border-l-[var(--color-secondary)] hover:bg-[var(--color-secondary)] hover:border-[var(--color-secondary)] hover:translate-x-1 transition-all duration-300 group cursor-pointer"
          role="listitem"
        >
          {/* Number indicator */}
          <div className="w-[22px] h-[22px] flex-shrink-0 flex items-center justify-center rounded-[6px] bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] text-white shadow-sm mt-0.5">
            <span className="text-[10px] font-extrabold group-hover:scale-110 transition-transform duration-300">
              {item.id.toString().padStart(2, '0')}
            </span>
          </div>

          {/* Content */}
          <div className="flex-1 flex flex-col gap-0.5">
            <h4 className="text-[12.5px] font-bold text-[var(--color-text-primary)] leading-tight group-hover:text-white transition-colors duration-200">
              {item.title}
            </h4>
            <p className="text-[11px] text-[var(--color-text-muted)] leading-[1.45] font-medium group-hover:text-white/90 transition-colors duration-200">
              {item.description}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default Highlights;