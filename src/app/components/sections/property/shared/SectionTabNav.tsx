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
  /** Unique Framer Motion layoutId — use a different value per section to scope the pill animation */
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

  // Keep active tab centred in the scroll container
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
    <div className="w-full px-3 py-2.5">
      <div className="flex items-center">

        {/* Left arrow — fades out when not scrollable */}
        <button
          onClick={() => scroll('left')}
          aria-label="Scroll left"
          className="flex-shrink-0 flex items-center justify-center w-8 h-8 mx-1 rounded-[4px] text-[#666666] hover:text-[#1A1A1A] hover:bg-[#F0F0F0] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500/50"
          style={{ opacity: canScrollLeft ? 1 : 0, pointerEvents: canScrollLeft ? 'auto' : 'none' }}
        >
          <ChevronLeftIcon sx={{ fontSize: 18 }} />
        </button>

        {/* Scrollable tab strip — no visible scrollbar */}
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
                  onClick={() => onTabChange(tab.id)}
                  onKeyDown={(e) => handleKeyDown(e, idx)}
                  className="relative flex-none py-1.5 px-3 sm:px-3.5 md:px-4 transition-all duration-200 z-10 outline-none flex items-center justify-center rounded-[4px] focus-visible:ring-2 focus-visible:ring-green-500/50 hover:text-[#1A1A1A]"
                  style={{ color: isActive ? '#ffffff' : '#666666' }}
                >
                  {isActive && (
                    <motion.div
                      layoutId={layoutId}
                      className="absolute inset-0 rounded-[4px] -z-10"
                      style={{
                        background: 'linear-gradient(135deg, #16A34A, #15803D)',
                        boxShadow: '0 0 12px rgba(22, 163, 74, 0.28)',
                      }}
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className={`relative z-20 text-[11px] tracking-widest whitespace-nowrap ${isActive ? 'font-bold' : 'font-semibold'}`}>
                    {tab.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right arrow — fades out when not scrollable */}
        <button
          onClick={() => scroll('right')}
          aria-label="Scroll right"
          className="flex-shrink-0 flex items-center justify-center w-8 h-8 mx-1 rounded-[4px] text-[#666666] hover:text-[#1A1A1A] hover:bg-[#F0F0F0] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500/50"
          style={{ opacity: canScrollRight ? 1 : 0, pointerEvents: canScrollRight ? 'auto' : 'none' }}
        >
          <ChevronRightIcon sx={{ fontSize: 18 }} />
        </button>

      </div>
    </div>
  );
}
