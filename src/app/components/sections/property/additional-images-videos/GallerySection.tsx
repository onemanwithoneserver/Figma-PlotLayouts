import React, { useState, useMemo } from 'react';
import Dialog from '@mui/material/Dialog';
import CloseIcon from '@mui/icons-material/Close';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import VideocamOutlinedIcon from '@mui/icons-material/VideocamOutlined';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import AskSeller from '../shared/AskSeller';
import { GALLERY_ITEMS, galleryAskSellerQuestions } from './data';

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
    <div className="w-full flex flex-col bg-[#F9FAFB]/50">
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
              className={`relative flex items-center justify-center gap-[4px] min-h-[44px] px-[4px] w-full text-[14px] font-bold transition-all duration-300 whitespace-nowrap outline-none rounded-[4px] active:scale-[0.98] ${
                isActive 
                  ? 'text-[#2F6F4E] bg-white/80 backdrop-blur-md border-[1px] border-white/60 shadow-[0_2px_8px_rgba(0,0,0,0.04)]' 
                  : 'text-[#4B5563] bg-transparent border-[1px] border-transparent'
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
              className="group relative rounded-[4px] overflow-hidden aspect-square bg-white/70 backdrop-blur-lg border-[1px] border-white/60 shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-all duration-300 active:scale-[0.98] outline-none w-full animate-[fadeIn_0.3s_ease-out_forwards] opacity-0"
              style={{ animationDelay: `${idx * 30}ms` }}
              aria-label={`View ${item.label}`}
            >
              <div className="relative w-full h-full bg-[#F3F4F6] rounded-[4px] overflow-hidden">
                <img
                  src={item.src}
                  alt={item.alt}
                  className="w-full h-full  object-cover transition-transform duration-500 ease-out group-active:scale-[1.02]"
                  loading="lazy"
                />
                
                {item.type === 'video' && (
                  <div className="absolute inset-0 flex items-center justify-center z-10 bg-white/10 backdrop-blur-[2px]">
                    <div className="w-[44px] h-[44px] rounded-[4px] bg-white/90 backdrop-blur-xl border-[1px] border-white/80 flex items-center justify-center shadow-[0_4px_12px_rgba(0,0,0,0.08)]">
                      <PlayCircleOutlineIcon sx={{ fontSize: 24, color: '#2F6F4E' }} />
                    </div>
                  </div>
                )}

                <div className="absolute w-fit bottom-[0px] right-[0px] z-10 flex items-center gap-[4px] bg-white/80 backdrop-blur-xl border border-white/60 px-[4px] py-[4px] rounded-none rounded-tl-[4px] shadow-sm">
                  {item.type === 'image' ? (
                    <ImageOutlinedIcon sx={{ fontSize: 14, color: '#2F6F4E' }} />
                  ) : (
                    <VideocamOutlinedIcon sx={{ fontSize: 14, color: '#2F6F4E' }} />
                  )}
                  <span className="text-[12px] font-bold text-[#111827] truncate mt-[1px]">
                    {item.label}
                  </span>
                </div>
              </div>
            </button>
          ))}

          {displayedItems.length === 0 && (
            <div className="col-span-full min-h-[120px] flex items-center justify-center text-[#4B5563] text-[14px] font-semibold bg-white/70 backdrop-blur-lg rounded-[4px] border-[1px] border-white/60 shadow-sm">
              No media found.
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
            border: '1px solid rgba(255,255,255,0.4)',
            backdropFilter: 'blur(16px)'
          } 
        }}
      >
        {lightboxIdx !== null && (
          <div className="relative flex flex-col items-center justify-center w-full bg-white/80 h-full min-h-[60vh]">
            
            <div className="absolute top-[4px] right-[4px] z-30">
              <button
                onClick={close}
                className="w-[44px] h-[44px] flex items-center justify-center bg-white/90 backdrop-blur-xl border-[1px] border-white/80 rounded-[4px] shadow-sm text-[#111827] transition-all duration-200 active:scale-[0.95] outline-none"
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
                  className="pointer-events-auto w-[44px] h-[44px] flex items-center justify-center bg-white/90 backdrop-blur-xl border-[1px] border-white/80 rounded-[4px] shadow-sm text-[#111827] transition-all duration-200 active:scale-[0.95] outline-none"
                >
                  <NavigateBeforeIcon sx={{ fontSize: 24 }} />
                </button>
                <button
                  onClick={next}
                  className="pointer-events-auto w-[44px] h-[44px] flex items-center justify-center bg-white/90 backdrop-blur-xl border-[1px] border-white/80 rounded-[4px] shadow-sm text-[#111827] transition-all duration-200 active:scale-[0.95] outline-none"
                >
                  <NavigateNextIcon sx={{ fontSize: 24 }} />
                </button>
              </div>
            )}

            <div className="absolute bottom-[4px] left-[4px] right-[4px] flex justify-between items-center z-20">
              <span className="text-[#111827] text-[12px] font-bold bg-white/90 backdrop-blur-xl border-[1px] border-white/80 px-[4px] py-[2px] min-h-[32px] flex items-center rounded-[4px] shadow-sm truncate max-w-[70%]">
                {displayedItems[lightboxIdx].label}
              </span>
              <span className="text-[#111827] text-[12px] font-bold bg-white/90 backdrop-blur-xl border-[1px] border-white/80 px-[4px] py-[2px] min-h-[32px] flex items-center rounded-[4px] shadow-sm shrink-0">
                {lightboxIdx + 1} / {displayedItems.length}
              </span>
            </div>
          </div>
        )}
      </Dialog>

      <div className="mt-[4px] mb-[4px] p-[2px]">
        <AskSeller initialQuestions={galleryAskSellerQuestions} />
      </div>
    </div>
  );
};

export default GallerySection;