import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { SECTION_TABS } from './data';

const HorizontalTabNavigation: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const clickScrolling = useRef(false);
  const unlockTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [activeTab, setActiveTab] = useState(SECTION_TABS[0].id);
  const [visible, setVisible] = useState(false);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(false);

  const syncArrows = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setShowLeft(el.scrollLeft > 4);
    setShowRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  }, []);

  const manualScroll = useCallback((dir: 'left' | 'right') => {
    scrollRef.current?.scrollBy({ left: dir === 'left' ? -160 : 160, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 180);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    syncArrows();
    window.addEventListener('resize', syncArrows);
    return () => window.removeEventListener('resize', syncArrows);
  }, [syncArrows, activeTab]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (clickScrolling.current) return;
        const visibleSections = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visibleSections.length > 0) setActiveTab(visibleSections[0].target.id);
      },
      { rootMargin: '-56px 0px -50% 0px', threshold: 0 }
    );
    SECTION_TABS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const handleClick = useCallback((tabId: string) => {
    const el = document.getElementById(tabId);
    if (!el) return;
    setActiveTab(tabId);
    clickScrolling.current = true;
    if (unlockTimer.current) clearTimeout(unlockTimer.current);

    const offset = 56;
    const y = el.getBoundingClientRect().top + window.scrollY - offset - 8;
    window.scrollTo({ top: y, behavior: 'smooth' });

    const unlock = () => { clickScrolling.current = false; };
    if ('onscrollend' in window) {
      window.addEventListener('scrollend', unlock, { once: true });
    } else {
      unlockTimer.current = setTimeout(unlock, 1200);
    }
  }, []);

  return (
    <nav
      aria-label="Page sections"
      className={`font-inter sticky top-0 z-40 transition-all duration-300 ease-out ${
        visible 
        ? 'opacity-100 translate-y-0 bg-[rgba(236,236,232,0.82)] backdrop-blur-xl border-b border-white/50 shadow-[0_2px_12px_rgba(47,111,78,0.06)]' 
        : 'opacity-0 -translate-y-[2px] pointer-events-none h-0 overflow-hidden'
      }`}
    >
      <div className="flex items-center max-w-[400px] mx-auto relative p-[2px]">
        <div className={`absolute left-0 top-0 bottom-0 z-10 w-12 pointer-events-none bg-gradient-to-r from-[rgba(236,236,232,0.9)] to-transparent transition-opacity duration-200 ${showLeft ? 'opacity-100' : 'opacity-0'}`} />
        
        <button
          onClick={() => manualScroll('left')}
          className={`relative z-20 flex-shrink-0 flex items-center justify-center w-8 min-h-[48px] outline-none transition-all duration-200 text-[#4B5563] hover:text-[#2F6F4E] disabled:opacity-0 m-[2px] p-[2px]`}
          disabled={!showLeft}
          aria-label="Scroll tabs left"
        >
          <ChevronLeftIcon sx={{ fontSize: 20 }} />
        </button>

        <div
          ref={scrollRef}
          onScroll={syncArrows}
          className="flex-1 flex items-center overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] py-[2px] gap-[2px]"
          role="tablist"
        >
          {SECTION_TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                ref={(el) => { tabRefs.current[tab.id] = el; }}
                onClick={() => handleClick(tab.id)}
                role="tab"
                aria-selected={isActive}
                className="relative flex-shrink-0 flex flex-col items-center justify-center min-h-[48px] min-w-[80px] outline-none group transition-all duration-300 p-[2px] m-[2px]"
              >
                <span className={`text-[14px] font-semibold transition-colors duration-300 whitespace-nowrap tracking-tight p-[2px] relative z-10 ${
                  isActive ? 'text-[#2F6F4E]' : 'text-[#4B5563] group-hover:text-[#111827]'
                }`}>
                  {tab.label}
                </span>
                
                {isActive && (
                  <motion.div 
                    layoutId="activeTabUnderline"
                    className="absolute bottom-[2px] left-[2px] right-[2px] h-[2px] bg-[#2F6F4E] rounded-[4px]"
                  />
                )}
                
                <div className="absolute inset-[2px] bg-[#2F6F4E]/5 rounded-[4px] opacity-0 group-hover:opacity-100 transition-opacity duration-200 -z-10" />
              </button>
            );
          })}
        </div>

        <button
          onClick={() => manualScroll('right')}
          className={`relative z-20 flex-shrink-0 flex items-center justify-center w-8 min-h-[48px] outline-none transition-all duration-200 text-[#4B5563] hover:text-[#2F6F4E] disabled:opacity-0 m-[2px] p-[2px]`}
          disabled={!showRight}
          aria-label="Scroll tabs right"
        >
          <ChevronRightIcon sx={{ fontSize: 20 }} />
        </button>
        
        <div className={`absolute right-0 top-0 bottom-0 z-10 w-12 pointer-events-none bg-gradient-to-l from-[rgba(236,236,232,0.9)] to-transparent transition-opacity duration-200 ${showRight ? 'opacity-100' : 'opacity-0'}`} />
      </div>
    </nav>
  );
};

export default HorizontalTabNavigation;