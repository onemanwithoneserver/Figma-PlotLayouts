import React, { useState } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { overviewData, OVERVIEW_INITIAL_COUNT } from './data';
import type { OverviewItem } from './data';

const OverviewTile: React.FC<{ item: OverviewItem }> = ({ item }) => {
  return (
    <div className="group flex min-h-[70px] cursor-pointer flex-col items-center justify-center rounded-[7px] border border-[#C8DBCF] bg-[#EEF4F0] px-1 py-1.5 text-center transition-all duration-300 hover:-translate-y-[2px] hover:border-[#15653A] hover:bg-[#15653A] hover:shadow-[0_6px_16px_rgba(21,101,58,0.18)]">
      <div
        className="mb-0.5 h-[18px] w-[18px] bg-[#2F7D4E] transition-colors duration-300 group-hover:bg-white"
        style={{
          WebkitMaskImage: `url(${item.icon})`,
          WebkitMaskSize: 'contain',
          WebkitMaskRepeat: 'no-repeat',
          WebkitMaskPosition: 'center',
          maskImage: `url(${item.icon})`,
          maskSize: 'contain',
          maskRepeat: 'no-repeat',
          maskPosition: 'center',
        }}
      />
      <span className="mb-0.5 line-clamp-1 text-[0.5rem] font-semibold tracking-[0.04em] text-[#64786D] transition-colors duration-300 group-hover:text-white">
        {item.label}
      </span>
      <span className="line-clamp-2 text-[0.65rem] font-bold leading-tight text-[#0B1F17] transition-colors duration-300 group-hover:text-white">
        {item.value}
      </span>
    </div>
  );
};

const Overview: React.FC = () => {
  const [showAll, setShowAll] = useState(false);
  const displayed = showAll ? overviewData : overviewData.slice(0, OVERVIEW_INITIAL_COUNT);

  return (
    <div className="bg-[#ffffff] px-2 py-2 font-outfit">
      <div className="mb-2 grid grid-cols-3 gap-1" aria-label="Property overview details">
        {displayed.map((item) => (
          <OverviewTile key={item.id} item={item} />
        ))}
      </div>

      <div className="flex justify-center">
        <button
          onClick={() => setShowAll(!showAll)}
          aria-expanded={showAll}
          className="flex min-h-[28px] items-center justify-center gap-0.5 rounded-[4px] bg-gradient-to-br from-[#15653A] to-[#2F7D4E] px-3 py-1 text-[0.65rem] font-bold text-white shadow-[0_4px_14px_rgba(21,101,58,0.18)] transition-all duration-300 hover:to-[#49A36B] hover:shadow-[0_6px_18px_rgba(21,101,58,0.18)]"
        >
          {showAll ? 'Show less' : 'See all details'}
          {showAll ? (
            <KeyboardArrowUpIcon fontSize="inherit" />
          ) : (
            <KeyboardArrowDownIcon fontSize="inherit" />
          )}
        </button>
      </div>
    </div>
  );
};

export default Overview;