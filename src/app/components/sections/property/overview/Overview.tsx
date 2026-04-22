import React, { useState } from 'react';
import Button from '@mui/material/Button';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { overviewData, OVERVIEW_INITIAL_COUNT } from './data';
import type { OverviewItem } from './data';

const OverviewTile: React.FC<{ item: OverviewItem }> = ({ item }) => (
  <div className="flex flex-col items-center text-center p-2 rounded-[var(--radius-md)] bg-white border border-[var(--border-subtle)] shadow-sm hover:shadow-[0_4px_16px_var(--primary-alpha-8)] hover:border-[var(--accent-border)] transition-all duration-300 transform hover:-translate-y-0.5">
    <div className="w-8 h-8 flex items-center justify-center bg-[var(--accent-soft)] rounded-[var(--radius-md)] mb-1.5">
      <img
        src={item.icon}
        alt=""
        className="w-4 h-4 object-contain"
        aria-hidden="true"
      />
    </div>
    <span className="text-[0.625rem] font-semibold text-[var(--text-muted)] tracking-[0.02em] leading-[1.2] mb-0.5">
      {item.label}
    </span>
    <span className="text-[0.75rem] font-bold text-[var(--text-primary)] leading-[1.2]">
      {item.value}
    </span>
  </div>
);

const Overview: React.FC = () => {
  const [showAll, setShowAll] = useState(false);
  const displayed = showAll ? overviewData : overviewData.slice(0, OVERVIEW_INITIAL_COUNT);

  return (
    <div className="p-3 bg-[var(--bg-section-light)] rounded-[var(--radius-lg)]">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-3" role="list" aria-label="Property overview details">
        {displayed.map((item) => (
          <OverviewTile key={item.id} item={item} />
        ))}
      </div>

      <div className="flex justify-center">
        <Button
          variant="contained"
          size="small"
          onClick={() => setShowAll(!showAll)}
          endIcon={showAll ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          sx={{
            background: 'var(--gradient-accent)',
            color: 'var(--background-color)',
            borderRadius: 'var(--radius-md)',
            fontSize: '0.8125rem',
            fontWeight: 700,
            textTransform: 'none',
            px: 2,
            py: 0.5,
            boxShadow: '0 2px 12px var(--primary-alpha-18)',
            '&:hover': { background: 'var(--gradient-accent)', filter: 'brightness(0.95)' },
          }}
          aria-expanded={showAll}
        >
          {showAll ? 'Show less' : 'See all details'}
        </Button>
      </div>
    </div>
  );
};

export default Overview;