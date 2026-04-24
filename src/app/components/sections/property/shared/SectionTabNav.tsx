import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

export interface SectionTab {
  id: string;
  label: string;
}

interface SectionTabNavProps {
  tabs: SectionTab[];
  activeTab: string;
  onTabChange: (id: string) => void;
  layoutId: string;
}

export default function SectionTabNav({ tabs, activeTab, onTabChange, layoutId }: SectionTabNavProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

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
      container.scrollTo({
        left: Math.max(0, Math.min(targetLeft, maxScrollLeft)),
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
      const nextId = tabs[nextIndex].id;
      onTabChange(nextId);
      buttonRefs.current.get(nextId)?.focus();
    }
  };

  return (
    <div className="w-full relative font-inter animate-fade-blur-in opacity-0">
      {/* Glass Rail Container */}
      <div className="bg-[#ECECE8] border-b border-[rgba(0,0,0,0.06)] flex items-center px-1">
        
        {/* Left Arrow */}
        <button
          onClick={() => scroll('left')}
          aria-label="Scroll left"
          className="flex-shrink-0 flex items-center justify-center rounded-[8px] text-[#3D5048] hover:text-[#2F6F4E] transition-all duration-200 focus-visible:outline-none overflow-hidden"
          style={{
            width: canScrollLeft ? 32 : 0,
            height: 32,
            margin: canScrollLeft ? '0 4px' : 0,
            opacity: canScrollLeft ? 1 : 0,
            pointerEvents: canScrollLeft ? 'auto' : 'none',
          }}
        >
          <ChevronLeftIcon sx={{ fontSize: 20 }} />
        </button>

        <div
          ref={containerRef}
          onScroll={checkScroll}
          role="tablist"
          className="flex-1 flex items-center py-2 overflow-x-auto scrollbar-hide scroll-smooth"
        >
          <div className="flex min-w-max flex-nowrap gap-1 px-1">
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
                  aria-selected={isActive}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => onTabChange(tab.id)}
                  onKeyDown={(e) => handleKeyDown(e, idx)}
                  className="relative flex-none py-1.5 px-4 transition-all duration-[280ms] z-10 outline-none flex items-center justify-center rounded-[8px] focus-visible:ring-2 focus-visible:ring-[rgba(47,111,78,0.35)] group"
                >
                  {isActive && (
                    <motion.div
                      layoutId={layoutId}
                      className="absolute inset-0 rounded-[8px] -z-10 bg-[#ECECE8] shadow-[inset_2px_2px_4px_#CBCBC7,inset_-2px_-2px_4px_#FFFFFF]"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  
                  <span className={`relative z-20 text-[13px] whitespace-nowrap transition-colors duration-200 tracking-tight ${
                    isActive ? 'font-bold text-[#2F6F4E]' : 'font-semibold text-[#5C6B63]'
                  }`}>
                    {tab.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Arrow */}
        <button
          onClick={() => scroll('right')}
          aria-label="Scroll right"
          className="flex-shrink-0 flex items-center justify-center rounded-[8px] text-[#3D5048] hover:text-[#2F6F4E] transition-all duration-200 focus-visible:outline-none overflow-hidden"
          style={{
            width: canScrollRight ? 32 : 0,
            height: 32,
            margin: canScrollRight ? '0 4px' : 0,
            opacity: canScrollRight ? 1 : 0,
            pointerEvents: canScrollRight ? 'auto' : 'none',
          }}
        >
          <ChevronRightIcon sx={{ fontSize: 20 }} />
        </button>
      </div>


    </div>
  );
}