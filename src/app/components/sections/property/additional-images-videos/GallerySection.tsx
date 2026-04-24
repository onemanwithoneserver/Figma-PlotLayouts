import React, { useState, useMemo } from 'react';
import Dialog from '@mui/material/Dialog';
import CloseIcon from '@mui/icons-material/Close';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import VideocamOutlinedIcon from '@mui/icons-material/VideocamOutlined';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import { GALLERY_ITEMS, galleryAskSellerQuestions } from './data';
import AskSeller from '../shared/AskSeller';

const GallerySection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('all');
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  const displayedItems = useMemo(() => {
    return GALLERY_ITEMS.filter((item) => activeTab === 'all' || item.type === activeTab);
  }, [activeTab]);

  const close = () => setLightboxIdx(null);
  const prev = () => setLightboxIdx((i) => (i === null ? 0 : (i - 1 + displayedItems.length) % displayedItems.length));
  const next = () => setLightboxIdx((i) => (i === null ? 0 : (i + 1) % displayedItems.length));

  const allCount = GALLERY_ITEMS.length;
  const imgCount = GALLERY_ITEMS.filter((m) => m.type === 'image').length;
  const vidCount = GALLERY_ITEMS.filter((m) => m.type === 'video').length;

  const tabs = [
    { id: 'all', label: `All (${allCount})`, icon: GridViewOutlinedIcon },
    { id: 'image', label: `Images (${imgCount})`, icon: ImageOutlinedIcon },
    { id: 'video', label: `Videos (${vidCount})`, icon: VideocamOutlinedIcon },
  ] as const;

  return (
    <div className="w-full flex flex-col bg-transparent">
      <div 
        className="flex gap-[4px] overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] border-b-[1px] border-black/5  p-[2px] mb-[4px]" 
        role="tablist"
      >
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;

          return (
            <button
              key={tab.id}
              role="tab"
              onClick={() => {
                setActiveTab(tab.id);
                setLightboxIdx(null);
              }}
              className={`relative flex items-center justify-center gap-[4px] min-h-[44px] px-[4px] w-full text-[14px] font-bold transition-all duration-300 whitespace-nowrap outline-none rounded active:scale-[0.98] ${
                isActive 
                  ? 'text-[#2F6F4E] glass-elevated border-[1px] shadow-[0_1px_4px_rgba(31,65,46,0.08)]' 
                  : 'text-[#4f5b53] bg-transparent border-[1px] border-transparent'
              }`}
            >
              <Icon sx={{ fontSize: 18 }} />
              <span className="mt-[1px]">{tab.label}</span>
              {isActive && (
                <span className="absolute bottom-[2px] left-[4px] right-[4px] h-[2px] rounded-[4px] bg-[#2F6F4E] opacity-80" />
              )}
            </button>
          );
        })}
      </div>

      <div role="tabpanel" className="p-[2px]">
        <div className="grid grid-cols-2 gap-[4px]">
          {displayedItems.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => setLightboxIdx(idx)}
              className="glass-elevated group relative rounded-lg overflow-hidden aspect-square transition-all duration-300 active:scale-[0.98] outline-none w-full animate-[fadeIn_0.3s_ease-out_forwards] opacity-0"
              style={{ animationDelay: `${idx * 30}ms` }}
              aria-label={`View ${item.label}`}
            >
              <div className="relative w-full h-full bg-[#F3F4F6] rounded-lg overflow-hidden">
                <img
                  src={item.src}
                  alt={item.alt}
                  className="w-full h-full  object-cover transition-transform duration-500 ease-out group-active:scale-[1.02]"
                  loading="lazy"
                />
                
                {item.type === 'video' && (
                  <div className="absolute inset-0 flex items-center justify-center z-10 bg-white/8 backdrop-blur-[2px]">
                    <div className="w-[44px] h-[44px] rounded bg-white/88 backdrop-blur-[8px] border-[1px] border-white/72 flex items-center justify-center shadow-[0_1px_6px_rgba(31,65,46,0.12)]">
                      <PlayCircleOutlineIcon sx={{ fontSize: 24, color: '#2F6F4E' }} />
                    </div>
                  </div>
                )}

                <div className="absolute w-fit bottom-[0px] right-[0px] z-10 flex items-center gap-[4px] bg-white/82 backdrop-blur-[8px] border border-white/68 px-[4px] py-[4px] rounded-none rounded-tl rounded-br-none shadow-[0_1px_4px_rgba(31,65,46,0.08)]">
                  {item.type === 'image' ? (
                    <ImageOutlinedIcon sx={{ fontSize: 14, color: '#2F6F4E' }} />
                  ) : (
                    <VideocamOutlinedIcon sx={{ fontSize: 14, color: '#2F6F4E' }} />
                  )}
                  <span className="text-[12px] font-bold text-[#142218] truncate mt-[1px]">
                    {item.label}
                  </span>
                </div>
              </div>
            </button>
          ))}

          {displayedItems.length === 0 && (
            <div className="glass-elevated col-span-full min-h-[160px] flex flex-col items-center justify-center gap-[8px] text-[#4f5b53] text-[14px] font-semibold page-enter">
              <div className="w-[56px] h-[56px] rounded-[8px] bg-[linear-gradient(145deg,rgba(34,197,94,0.12),rgba(134,239,172,0.16))] flex items-center justify-center animate-[fadeInUp_0.3s_ease-in-out_forwards]">
                <svg viewBox="0 0 24 24" className="w-[28px] h-[28px] text-[#2F6F4E]" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <circle cx="8.5" cy="10" r="1.6" />
                  <path d="M21 15l-4.4-4.4a1 1 0 00-1.4 0L10 16l-1.7-1.7a1 1 0 00-1.4 0L3 18" />
                </svg>
              </div>
              <div className="text-center">
                <p className="text-[14px] font-semibold text-[#142218]">No media available</p>
                <p className="text-[12px] font-medium text-[#5a665e]">Try another filter to explore photos and videos.</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <Dialog
        open={lightboxIdx !== null}
        onClose={close}
        maxWidth="md"
        fullWidth
        PaperProps={{ 
          sx: { 
            bgcolor: 'transparent', 
            boxShadow: 'none', 
            m: '4px', 
            p: 0, 
            overflow: 'hidden', 
            borderRadius: '8px',
            border: '1px solid rgba(255,255,255,0.65)',
            backdropFilter: 'blur(10px)'
          } 
        }}
      >
        {lightboxIdx !== null && (
          <div className="relative flex flex-col items-center justify-center w-full bg-white/82 h-full min-h-[60vh]">
            
            <div className="absolute top-[4px] right-[4px] z-30">
              <button
                onClick={close}
                aria-label="Close gallery lightbox"
                title="Close"
                className="w-[44px] h-[44px] flex items-center justify-center bg-white/88 backdrop-blur-[8px] border-[1px] border-white/72 rounded-[4px] shadow-[0_1px_4px_rgba(31,65,46,0.12)] text-[#142218] transition-all duration-200 active:scale-[0.95] outline-none"
              >
                <CloseIcon sx={{ fontSize: 20 }} />
              </button>
            </div>

            <div className="relative w-full h-full flex items-center justify-center p-[4px]">
              <img
                src={displayedItems[lightboxIdx].src}
                alt={displayedItems[lightboxIdx].alt}
                className="w-full max-h-[70vh] object-contain rounded-[4px]"
              />
            </div>

            {displayedItems.length > 1 && (
              <div className="absolute bottom-[48px] left-[4px] right-[4px] flex justify-between z-20 pointer-events-none">
                <button
                  onClick={prev}
                  aria-label="Previous media"
                  title="Previous"
                  className="pointer-events-auto w-[44px] h-[44px] flex items-center justify-center bg-white/88 backdrop-blur-[8px] border-[1px] border-white/72 rounded-[4px] shadow-[0_1px_4px_rgba(31,65,46,0.12)] text-[#142218] transition-all duration-200 active:scale-[0.95] outline-none"
                >
                  <NavigateBeforeIcon sx={{ fontSize: 24 }} />
                </button>
                <button
                  onClick={next}
                  aria-label="Next media"
                  title="Next"
                  className="pointer-events-auto w-[44px] h-[44px] flex items-center justify-center bg-white/88 backdrop-blur-[8px] border-[1px] border-white/72 rounded-[4px] shadow-[0_1px_4px_rgba(31,65,46,0.12)] text-[#142218] transition-all duration-200 active:scale-[0.95] outline-none"
                >
                  <NavigateNextIcon sx={{ fontSize: 24 }} />
                </button>
              </div>
            )}

            <div className="absolute bottom-[4px] left-[4px] right-[4px] flex justify-between items-center z-20">
              <span className="text-[#142218] text-[12px] font-bold bg-white/88 backdrop-blur-[8px] border-[1px] border-white/72 px-[4px] py-[2px] min-h-[32px] flex items-center rounded-[4px] shadow-[0_1px_4px_rgba(31,65,46,0.1)] truncate max-w-[70%]">
                {displayedItems[lightboxIdx].label}
              </span>
              <span className="text-[#142218] text-[12px] font-bold bg-white/88 backdrop-blur-[8px] border-[1px] border-white/72 px-[4px] py-[2px] min-h-[32px] flex items-center rounded-[4px] shadow-[0_1px_4px_rgba(31,65,46,0.1)] shrink-0">
                {lightboxIdx + 1} / {displayedItems.length}
              </span>
            </div>
          </div>
        )}
      </Dialog>

      <div className="pt-2">
        <AskSeller initialQuestions={galleryAskSellerQuestions} headingIconName="ask-seller" />
      </div>
    </div>
  );
};

export default GallerySection;