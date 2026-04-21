import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

interface BHKTabNavProps {
  tabs: string[];
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function BHKTabNav({ tabs, activeTab, onTabChange }: BHKTabNavProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = () => {
    const container = scrollContainerRef.current;
    if (container) {
      const { scrollLeft, scrollWidth, clientWidth } = container;
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
    const container = scrollContainerRef.current;
    const activeBtn = buttonRefs.current.get(activeTab);
    if (activeBtn && container) {
      const targetLeft = activeBtn.offsetLeft - (container.clientWidth - activeBtn.offsetWidth) / 2;
      container.scrollTo({
        left: Math.max(0, Math.min(targetLeft, container.scrollWidth - container.clientWidth)),
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
      const nextTab = tabs[nextIndex];
      onTabChange(nextTab);
      buttonRefs.current.get(nextTab)?.focus();
    }
  };

  return (
    <div className="w-fit max-w-full mb-4 mx-auto my-3 relative">
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
          className="flex items-center py-1 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] scroll-smooth"
        >
          <div className="flex gap-1 px-1 w-max">
            {tabs.map((tab, idx) => {
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  ref={(el) => {
                    if (el) buttonRefs.current.set(tab, el);
                    else buttonRefs.current.delete(tab);
                  }}
                  role="tab"
                  aria-selected={isActive ? 'true' : 'false'}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => onTabChange(tab)}
                  onKeyDown={(e) => handleKeyDown(e, idx)}
                  className="relative w-auto shrink-0 min-w-max py-1.5 px-3 transition-all duration-200 z-10 outline-none flex items-center justify-center rounded-[6px] focus-visible:ring-2 focus-visible:ring-green-500/50"
                  style={{ color: isActive ? '#ffffff' : 'rgba(255,255,255,0.55)' }}
                >
                  {isActive && (
                    <motion.div
                      layoutId="bhk-active-pill"
                      className="absolute inset-0 rounded-[6px] -z-10"
                      style={{
                        background: 'linear-gradient(135deg, #16A34A, #15803D)',
                        boxShadow: '0 0 12px rgba(22, 163, 74, 0.28)',
                      }}
                      transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
                    />
                  )}
                  <span className="relative z-20 text-[11px] tracking-widest font-bold whitespace-nowrap ">
                    {tab}
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