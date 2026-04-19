import React, { useRef, useState, useEffect, useCallback } from 'react';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

interface TabItem {
  id: string;
  label: string;
}

const TABS: TabItem[] = [
  { id: 'overview',      label: 'Overview'    },
  { id: 'project-status', label: 'Status'     },
  { id: 'layout',        label: 'Layout'      },
  { id: 'ask-seller',    label: 'Ask Seller'  },
  { id: 'location',      label: 'Location'    },
  { id: 'amenities',     label: 'Amenities'   },
  { id: 'payment',       label: 'Pricing'     },
  { id: 'gallery',       label: 'Gallery'     },
  { id: 'project-meet',  label: 'Site Visit'  },
];

const HorizontalTabNavigation: React.FC = () => {
  const scrollRef        = useRef<HTMLDivElement>(null);
  const tabRefs          = useRef<Record<string, HTMLButtonElement | null>>({});
  const clickScrolling   = useRef(false);
  const unlockTimer      = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [activeTab, setActiveTab] = useState(TABS[0].id);
  const [visible,   setVisible]   = useState(false);
  const [showLeft,  setShowLeft]  = useState(false);
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

  // Show/hide bar when hero scrolls out of view
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 180);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Sync arrow visibility on mount and resize
  useEffect(() => {
    syncArrows();
    window.addEventListener('resize', syncArrows);
    return () => window.removeEventListener('resize', syncArrows);
  }, [syncArrows]);

  // Center the active tab button
  const centerTab = useCallback((id: string) => {
    const btn       = tabRefs.current[id];
    const container = scrollRef.current;
    if (!btn || !container) return;
    const target = btn.offsetLeft - container.clientWidth / 2 + btn.offsetWidth / 2;
    container.scrollTo({ left: Math.max(0, target), behavior: 'smooth' });
  }, []);

  useEffect(() => { centerTab(activeTab); }, [activeTab, centerTab]);

  // Highlight active tab as sections enter viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (clickScrolling.current) return;
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) setActiveTab(visible[0].target.id);
      },
      { rootMargin: '-56px 0px -50% 0px', threshold: 0 }
    );
    TABS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const handleClick = useCallback((tab: TabItem) => {
    const el = document.getElementById(tab.id);
    if (!el) return;
    setActiveTab(tab.id);
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
    <div
      className={`sticky top-0 z-40 bg-white transition-all duration-300 ${
        visible ? 'opacity-100 translate-y-0 h-auto' : 'opacity-0 -translate-y-2 pointer-events-none h-0 overflow-hidden'
      }`}
      style={{ borderBottom: '1px solid #E0E0E0' }}
    >
      <div className="flex items-center">
        {/* Left arrow */}
        <button
          onClick={() => manualScroll('left')}
          aria-label="Scroll left"
          className="flex-shrink-0 flex items-center justify-center w-8 h-full outline-none"
          style={{
            opacity: showLeft ? 1 : 0,
            pointerEvents: showLeft ? 'auto' : 'none',
            transition: 'opacity 0.2s',
            borderRight: '1px solid #E0E0E0',
          }}
        >
          <ChevronLeftIcon sx={{ fontSize: 20, color: '#757575' }} />
        </button>

        {/* Scrollable tab strip */}
        <div
          ref={scrollRef}
          onScroll={syncArrows}
          className="flex-1 flex items-center overflow-x-auto"
          style={{ scrollbarWidth: 'none' }}
        >
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                ref={(el) => { tabRefs.current[tab.id] = el; }}
                onClick={() => handleClick(tab)}
                className="flex-shrink-0 px-4 py-3 flex flex-col items-center gap-0.5 outline-none"
              >
                <span
                  style={{
                    fontSize: '0.8125rem',
                    fontWeight: isActive ? 700 : 400,
                    color: isActive ? '#1F7A63' : '#757575',
                    whiteSpace: 'nowrap',
                    transition: 'color 0.2s',
                  }}
                >
                  {tab.label}
                </span>
                <div
                  style={{
                    height: 2,
                    width: '100%',
                    borderRadius: 1,
                    backgroundColor: isActive ? '#1F7A63' : 'transparent',
                    transition: 'background-color 0.2s',
                  }}
                />
              </button>
            );
          })}
        </div>

        {/* Right arrow */}
        <button
          onClick={() => manualScroll('right')}
          aria-label="Scroll right"
          className="flex-shrink-0 flex items-center justify-center w-8 h-full outline-none"
          style={{
            opacity: showRight ? 1 : 0,
            pointerEvents: showRight ? 'auto' : 'none',
            transition: 'opacity 0.2s',
            borderLeft: '1px solid #E0E0E0',
          }}
        >
          <ChevronRightIcon sx={{ fontSize: 20, color: '#757575' }} />
        </button>
      </div>
    </div>
  );
};

export default HorizontalTabNavigation;

