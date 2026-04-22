import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { TabInfo } from './commuteData';

interface TabNavigationProps {
  tabs: TabInfo[];
  activeTab: string;
  onTabClick: (id: string) => void;
}

export default function TabNavigation({ tabs, activeTab, onTabClick }: TabNavigationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (containerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
      setCanScrollLeft(scrollLeft > 2);
      setCanScrollRight(Math.ceil(scrollLeft + clientWidth) < scrollWidth - 2);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, [tabs]);

  useEffect(() => {
    const activeBtn = buttonRefs.current.get(activeTab);
    const container = containerRef.current;

    if (activeBtn && container) {
      const targetLeft = activeBtn.offsetLeft - (container.clientWidth - activeBtn.offsetWidth) / 2;
      const maxScrollLeft = container.scrollWidth - container.clientWidth;
      const clampedLeft = Math.max(0, Math.min(targetLeft, maxScrollLeft));

      container.scrollTo({
        left: clampedLeft,
        behavior: 'smooth',
      });
    }
  }, [activeTab]);

  const scroll = (direction: 'left' | 'right') => {
    const container = containerRef.current;
    if (!container) return;
    container.scrollBy({
      left: direction === 'left' ? -(container.clientWidth * 0.5) : container.clientWidth * 0.5,
      behavior: 'smooth',
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, currentIndex: number) => {
    let nextIndex: number | null = null;
    if (e.key === 'ArrowRight') { e.preventDefault(); nextIndex = (currentIndex + 1) % tabs.length; }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); nextIndex = (currentIndex - 1 + tabs.length) % tabs.length; }
    if (nextIndex !== null) {
      const nextTabId = tabs[nextIndex].id;
      onTabClick(nextTabId);
      buttonRefs.current.get(nextTabId)?.focus();
    }
  };

  return (
    <div className="w-full relative font-outfit">
      <div className="bg-[#ffffff] border border-[#C8DBCF] rounded-[4px] shadow-sm flex items-center">
        <button
          onClick={() => scroll('left')}
          aria-label="Scroll left"
          className="flex-shrink-0 flex items-center justify-center rounded-[4px] text-[#64786D] hover:text-[#0B1F17] hover:bg-[#EEF4F0] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#15653A]/50 overflow-hidden"
          style={{
            width: canScrollLeft ? 32 : 0,
            height: canScrollLeft ? 32 : 0,
            margin: canScrollLeft ? '0 4px' : 0,
            opacity: canScrollLeft ? 1 : 0,
            pointerEvents: canScrollLeft ? 'auto' : 'none',
            transition: 'width 0.2s, opacity 0.2s',
          }}
        >
          <ChevronLeftIcon sx={{ fontSize: 18 }} />
        </button>

        <div
          ref={containerRef}
          onScroll={checkScroll}
          role="tablist"
          className="flex-1 flex items-center py-1 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] scroll-smooth"
        >
          <div className="flex min-w-max flex-nowrap gap-1 px-1 mx-auto">
            {tabs.map((tab, idx) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  ref={(el) => {
                    if (el) buttonRefs.current.set(tab.id, el);
                    else buttonRefs.current.delete(tab.id);
                  }}
                  role="tab"
                  aria-selected={isActive ? 'true' : 'false'}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => onTabClick(tab.id)}
                  onKeyDown={(e) => handleKeyDown(e, idx)}
                  className="relative flex-none py-1.5 px-3 sm:px-3.5 md:px-4 transition-all duration-200 z-10 outline-none flex items-center justify-center rounded-[4px] focus-visible:ring-2 focus-visible:ring-[#15653A]/50"
                  style={{ color: isActive ? '#ffffff' : '#64786D' }}
                >
                  {isActive && (
                    <motion.div
                      layoutId="commute-active-pill"
                      className="absolute inset-0 rounded-[4px] -z-10"
                      style={{
                        background: 'linear-gradient(135deg, #15653A, #2F7D4E)',
                        boxShadow: '0 0 8px rgba(21,101,58,0.22)',
                      }}
                      transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
                    />
                  )}
                  <span className={`relative z-20 text-[13px] whitespace-nowrap ${isActive ? 'font-bold' : 'font-semibold'}`}>
                    {tab.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <button
          onClick={() => scroll('right')}
          aria-label="Scroll right"
          className="flex-shrink-0 flex items-center justify-center rounded-[4px] text-[#64786D] hover:text-[#0B1F17] hover:bg-[#EEF4F0] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#15653A]/50 overflow-hidden"
          style={{
            width: canScrollRight ? 32 : 0,
            height: canScrollRight ? 32 : 0,
            margin: canScrollRight ? '0 4px' : 0,
            opacity: canScrollRight ? 1 : 0,
            pointerEvents: canScrollRight ? 'auto' : 'none',
            transition: 'width 0.2s, opacity 0.2s',
          }}
        >
          <ChevronRightIcon sx={{ fontSize: 18 }} />
        </button>
      </div>
    </div>
  );
}