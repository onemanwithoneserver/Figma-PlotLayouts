import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

interface TabInfo {
  id: string;
  label: string;
}

interface TabNavigationProps {
  tabs: TabInfo[];
  activeTab: string;
  onTabClick: (id: string) => void;
}

export default function TabNavigation({ tabs, activeTab, onTabClick }: TabNavigationProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // Check scroll position to show/hide arrows
  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 2);
      setCanScrollRight(Math.ceil(scrollLeft + clientWidth) < scrollWidth - 2);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, [tabs]);

  // Keep active tab near the middle when possible
  useEffect(() => {
    const activeBtn = buttonRefs.current.get(activeTab);
    const container = scrollContainerRef.current;

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
    scrollContainerRef.current?.scrollBy({
      left: direction === 'left' ? -200 : 200,
      behavior: 'smooth',
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, currentIndex: number) => {
    let nextIndex: number | null = null;
    if (e.key === 'ArrowRight') { e.preventDefault(); nextIndex = (currentIndex + 1) % tabs.length; }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); nextIndex = (currentIndex - 1 + tabs.length) % tabs.length; }
    if (nextIndex !== null) {
      const nextId = tabs[nextIndex].id;
      onTabClick(nextId);
      buttonRefs.current.get(nextId)?.focus();
    }
  };

  return (
    <div className="w-full relative">
      <div className="bg-neutral-900/80 backdrop-blur-sm border border-white/[0.08] rounded-[8px] shadow-[0_4px_20px_rgba(0,0,0,0.18)] flex items-center">
        {/* Left arrow */}
        <button
          onClick={() => scroll('left')}
          aria-label="Scroll left"
          className="flex-shrink-0 flex items-center justify-center w-8 h-8 mx-1 rounded-[6px] text-white/50 hover:text-white hover:bg-white/[0.08] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500/50"
          style={{ opacity: canScrollLeft ? 1 : 0, pointerEvents: canScrollLeft ? 'auto' : 'none' }}
        >
          <ChevronLeftIcon sx={{ fontSize: 18 }} />
        </button>

        {/* Scrollable strip */}
        <div
          ref={scrollContainerRef}
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
                  className="relative flex-none py-1.5 px-3 sm:px-3.5 md:px-4 transition-all duration-200 z-10 outline-none flex items-center justify-center rounded-[6px] focus-visible:ring-2 focus-visible:ring-green-500/50"
                  style={{ color: isActive ? '#ffffff' : 'rgba(255,255,255,0.55)' }}
                >
                  {isActive && (
                    <motion.div
                      layoutId="spec-active-pill"
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

        {/* Right arrow */}
        <button
          onClick={() => scroll('right')}
          aria-label="Scroll right"
          className="flex-shrink-0 flex items-center justify-center w-8 h-8 mx-1 rounded-[6px] text-white/50 hover:text-white hover:bg-white/[0.08] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500/50"
          style={{ opacity: canScrollRight ? 1 : 0, pointerEvents: canScrollRight ? 'auto' : 'none' }}
        >
          <ChevronRightIcon sx={{ fontSize: 18 }} />
        </button>
      </div>
    </div>
  );
}