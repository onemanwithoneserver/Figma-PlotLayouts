import React, { useRef, useState, useEffect, useCallback } from 'react';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

interface TabItem {
  id: string;
  label: string;
}

const TABS: TabItem[] = [
  { id: 'overview',       label: 'Overview'    },
  { id: 'highlights',     label: 'Highlights'  },
  { id: 'project-status', label: 'Status'      },
  { id: 'layout',         label: 'Layout'      },
  { id: 'ask-seller',     label: 'Ask Seller'  },
  { id: 'location',       label: 'Location'    },
  { id: 'amenities',      label: 'Amenities'   },
  { id: 'payment',        label: 'Pricing'     },
  { id: 'gallery',        label: 'Gallery'     },
  { id: 'project-meet',   label: 'Site Visit'  },
];

const HorizontalTabNavigation: React.FC = () => {
  const scrollRef        = useRef<HTMLDivElement>(null);
  const tabRefs          = useRef<Record<string, HTMLButtonElement | null>>({});
  const clickScrolling   = useRef(false);
  const unlockTimer      = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [activeTab, setActiveTab] = useState(TABS[0].id);
  const [visible,   setVisible]   = useState(false);
  const [showLeft,   setShowLeft]  = useState(false);
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
    TABS.forEach(({ id }) => {
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

  const filteredTabs = TABS.filter(tab => tab.id !== activeTab);

  return (
    <div
      className={`sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-200 transition-all duration-300 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none h-0 overflow-hidden'
      }`}
    >
      <div className="flex items-center">
        <button
          onClick={() => manualScroll('left')}
          className="flex-shrink-0 flex items-center justify-center w-10 min-h-[48px] outline-none transition-all duration-200 hover:bg-neutral-100 disabled:opacity-0"
          disabled={!showLeft}
          style={{ borderRight: '1px solid #f0f0f0', color: '#737373' }}
        >
          <ChevronLeftIcon sx={{ fontSize: 20 }} />
        </button>

        <div
          ref={scrollRef}
          onScroll={syncArrows}
          className="flex-1 flex items-center overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          {filteredTabs.map((tab) => (
            <button
              key={tab.id}
              ref={(el) => { tabRefs.current[tab.id] = el; }}
              onClick={() => handleClick(tab.id)}
              className="flex-shrink-0 px-5 py-3 outline-none hover:bg-neutral-50 transition-colors duration-200"
            >
              <span
                style={{
                  fontSize: '0.8125rem',
                  fontWeight: 500,
                  color: '#525252',
                  whiteSpace: 'nowrap',
                }}
              >
                {tab.label}
              </span>
            </button>
          ))}
        </div>

        <button
          onClick={() => manualScroll('right')}
          className="flex-shrink-0 flex items-center justify-center w-10 min-h-[48px] outline-none transition-all duration-200 hover:bg-neutral-100 disabled:opacity-0"
          disabled={!showRight}
          style={{ borderLeft: '1px solid #f0f0f0', color: '#737373' }}
        >
          <ChevronRightIcon sx={{ fontSize: 20 }} />
        </button>
      </div>
    </div>
  );
};

export default HorizontalTabNavigation;