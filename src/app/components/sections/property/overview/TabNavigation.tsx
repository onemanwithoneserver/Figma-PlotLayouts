import React from 'react';
import { motion } from 'framer-motion';

interface TabNavigationProps {
  activeTab: 'overview' | 'highlights';
  onTabChange: (tab: 'overview' | 'highlights') => void;
}

const TABS: { id: 'overview' | 'highlights'; label: string }[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'highlights', label: 'Highlights' },
];

const TabNavigation: React.FC<TabNavigationProps> = ({ activeTab, onTabChange }) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, currentIndex: number) => {
    let nextIndex: number | null = null;
    if (e.key === 'ArrowRight') { e.preventDefault(); nextIndex = (currentIndex + 1) % TABS.length; }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); nextIndex = (currentIndex - 1 + TABS.length) % TABS.length; }
    if (nextIndex !== null) {
      onTabChange(TABS[nextIndex].id);
    }
  };

  return (
    <section className="w-full py-1.5">
      <div className="w-fit mx-auto">
        <div role="tablist" className="bg-neutral-900/80 backdrop-blur-sm border border-white/[0.08] rounded-[8px] shadow-[0_4px_20px_rgba(0,0,0,0.18)] flex items-center p-1">
          {TABS.map((tab, idx) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                role="tab"
                aria-selected={isActive ? 'true' : 'false'}
                tabIndex={isActive ? 0 : -1}
                onClick={() => onTabChange(tab.id)}
                onKeyDown={(e) => handleKeyDown(e, idx)}
                className="relative py-1.5 px-5 transition-all duration-200 z-10 outline-none flex items-center justify-center rounded-[6px] focus-visible:ring-2 focus-visible:ring-green-500/50"
                style={{ color: isActive ? '#ffffff' : 'rgba(255,255,255,0.55)' }}
              >
                {isActive && (
                  <motion.div
                    layoutId="overview-active-pill"
                    className="absolute inset-0 rounded-[6px] -z-10"
                    style={{
                      background: 'linear-gradient(135deg, #16A34A, #15803D)',
                      boxShadow: '0 0 12px rgba(22, 163, 74, 0.28)',
                    }}
                    transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
                  />
                )}
                <span className="relative z-20 text-[11px] tracking-widest font-bold whitespace-nowrap ">
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TabNavigation;
