import React from 'react';
import { highlightsData } from './data';

const Highlights: React.FC = () => {
  return (
    <ul className="px-4 pt-4 pb-2 flex flex-col gap-3 m-0 list-none" role="list">
      {highlightsData.map((item, i) => (
        <li
          key={item.id}
          className="glass-card flex items-stretch rounded-[8px] overflow-hidden hover:shadow-[0_6px_24px_rgba(31,122,92,0.12)] transition-all duration-300 group"
          role="listitem"
        >
          {/* Number indicator with accent gradient border */}
          <div className="w-12 flex-shrink-0 flex items-center justify-center bg-[var(--bg-section-light)] border-r border-[var(--border-subtle)] border-l-[3px] border-l-[var(--accent-primary)]">
            <span className="text-[1rem] font-bold text-[var(--accent-primary)] group-hover:scale-110 transition-transform duration-300">
              {item.id}
            </span>
          </div>

          {/* Content */}
          <div className="flex-1 px-4 py-3 flex flex-col justify-center gap-1">
            <h4 className="text-[0.875rem] font-bold text-[var(--text-primary)] leading-tight">
              {item.title}
            </h4>
            <p className="text-[0.75rem] text-[var(--text-secondary)] leading-[1.5]">
              {item.description}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default Highlights;