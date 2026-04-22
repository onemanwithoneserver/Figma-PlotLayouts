import React, { useState } from 'react';
import Button from '@mui/material/Button';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { overviewData, OVERVIEW_INITIAL_COUNT } from './data';
import type { OverviewItem } from './data';

const OverviewTile: React.FC<{ item: OverviewItem }> = ({ item }) => (
  <div className="flex flex-col items-center text-center p-2.5 min-h-[84px] justify-center rounded-[var(--radius-md)] bg-[var(--color-bg-white)] border border-[var(--color-border)] shadow-sm transition-all duration-300 hover:shadow-[0_6px_16px_rgba(34,160,80,.12)] hover:border-[var(--color-secondary)] hover:-translate-y-0.5 group cursor-pointer">
    <div
      className="w-6 h-6 mb-1.5 bg-[var(--color-text-muted)] group-hover:bg-[var(--color-secondary)] transition-all duration-300 group-hover:scale-110"
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
      aria-hidden="true"
    />
    <span className="text-[0.6875rem] font-bold text-[var(--color-text-muted)] leading-tight mb-1 transition-colors duration-300 group-hover:text-[var(--color-secondary)] line-clamp-1">
      {item.label}
    </span>
    <span className="text-[0.8125rem] font-bold text-[var(--color-text-primary)] leading-tight line-clamp-1">
      {item.value}
    </span>
  </div>
);

const Overview: React.FC = () => {
  const [showAll, setShowAll] = useState(false);
  const displayed = showAll ? overviewData : overviewData.slice(0, OVERVIEW_INITIAL_COUNT);

  return (
    <div className="p-3 bg-[var(--color-bg-main)] rounded-[var(--radius-lg)] font-outfit animate-fade-in-up">
      <div className="grid grid-cols-3 gap-2 md:gap-2.5 mb-4" role="list" aria-label="Property overview details">
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
          className="glass-cta hover-lift"
          sx={{
            background: 'linear-gradient(135deg, var(--color-primary), var(--color-accent))',
            color: 'var(--color-bg-white)',
            borderRadius: 'var(--radius-md)',
            fontSize: '0.8125rem',
            fontWeight: 700,
            textTransform: 'none',
            fontFamily: "'Outfit', sans-serif",
            px: 2.5,
            py: 0.75,
            boxShadow: 'var(--glass-shadow)',
            border: '1px solid rgba(255,255,255,0.25)',
            backdropFilter: 'blur(12px)',
            '&:hover': {
              background: 'linear-gradient(135deg, var(--color-secondary), var(--color-highlight))',
              boxShadow: 'var(--glass-shadow-hover)'
            },
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