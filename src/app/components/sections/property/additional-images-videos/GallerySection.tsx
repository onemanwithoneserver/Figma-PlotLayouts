import React, { useState, useMemo } from 'react';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import VideocamOutlinedIcon from '@mui/icons-material/VideocamOutlined';
import AskSeller from '../shared/AskSeller';
import HeadingIcon from '../shared/HeadingIcon';
import { GALLERY_ITEMS, galleryAskSellerQuestions } from './data';

const GallerySection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'image' | 'video'>('all');
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  const displayedItems = useMemo(() => {
    return GALLERY_ITEMS.filter((item) => activeTab === 'all' || item.type === activeTab);
  }, [activeTab]);

  const close = () => setLightboxIdx(null);
  const prev = () => setLightboxIdx((i) => (i === null ? 0 : (i - 1 + displayedItems.length) % displayedItems.length));
  const next = () => setLightboxIdx((i) => (i === null ? 0 : (i + 1) % displayedItems.length));

  const imgCount = GALLERY_ITEMS.filter((m) => m.type === 'image').length;
  const vidCount = GALLERY_ITEMS.filter((m) => m.type === 'video').length;

  const tabs = [
    { id: 'image', label: `Images (${imgCount})`, icon: ImageOutlinedIcon },
    { id: 'video', label: `Videos (${vidCount})`, icon: VideocamOutlinedIcon },
  ] as const;

  return (
    <>
      <div className="w-full rounded-[8px] bg-[rgba(255,255,255,0.65)] backdrop-blur-[20px] border border-[rgba(255,255,255,0.6)] shadow-[0_4px_12px_rgba(0,0,0,0.04),inset_0_1px_0_rgba(255,255,255,0.8)] overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 border-b border-[rgba(255,255,255,0.4)]">
          <div className="flex items-center gap-2 min-w-max">
            <HeadingIcon name="gallery" />
            <h2 className="text-[16px] font-bold text-[#1A1F24] tracking-tight min-w-max">
              Media Gallery
            </h2>
          </div>

          <div className="flex gap-4 overflow-x-auto scrollbar-hide" role="tablist" aria-label="Media type filter">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              const Icon = tab.icon;

              return (
                <button
                  key={tab.id}
                  role="tab"
                  onClick={() => {
                    setActiveTab(isActive ? 'all' : tab.id);
                    setLightboxIdx(null);
                  }}
                  className={`relative flex items-center gap-1.5 py-1.5 px-1 text-[13px] font-semibold transition-all duration-[280ms] whitespace-nowrap focus:outline-none ${
                    isActive ? 'text-[#2F6F4E]' : 'text-[#6B7280] hover:text-[#4A5560]'
                  }`}
                >
                  <Icon sx={{ fontSize: 16 }} />
                  {tab.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] rounded-t-[8px] bg-gradient-to-r from-[#2F6F4E] to-[#4A90E2]" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <div className="p-3" role="tabpanel">
          <div className="grid grid-cols-2 gap-3">
            {displayedItems.map((item, idx) => {
              const delay = 40 + idx * 40;
              return (
                <button
                  key={item.id}
                  onClick={() => setLightboxIdx(idx)}
                  className="group relative rounded-[8px] overflow-hidden aspect-[4/3] bg-[rgba(255,255,255,0.4)] border border-[rgba(255,255,255,0.6)] shadow-sm hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] transition-all duration-[280ms] ease-[cubic-bezier(0.4,0,0.2,1)] hover:-translate-y-[3px] hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2F6F4E] block w-full animate-fade-blur-in opacity-0"
                  style={{ animationDelay: `${delay}ms` }}
                  aria-label={`View ${item.label} ${item.type}`}
                >
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="w-full h-full object-cover transition-transform duration-[600ms] ease-out group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-80" />

                  {/* Light shift sweep overlay */}
                  <div className="absolute top-0 -left-[100%] w-[50%] h-full bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.3)] to-transparent skew-x-[-20deg] transition-all duration-[600ms] ease-in-out group-hover:left-[200%] pointer-events-none z-10" />

                  {item.type === 'video' && (
                    <div className="absolute inset-0 flex items-center justify-center z-10">
                      <div className="w-10 h-10 rounded-[8px] bg-[rgba(255,255,255,0.25)] backdrop-blur-[8px] border border-[rgba(255,255,255,0.4)] flex items-center justify-center shadow-[0_4px_12px_rgba(0,0,0,0.1)] transition-transform duration-[280ms] group-hover:scale-110">
                        <PlayCircleOutlineIcon sx={{ fontSize: 24, color: '#FFFFFF' }} />
                      </div>
                    </div>
                  )}

                  <div className="absolute bottom-2 left-2 right-2 flex items-center gap-1.5 z-10">
                    {item.type === 'image' ? (
                      <ImageOutlinedIcon sx={{ fontSize: 14, color: '#FFFFFF' }} />
                    ) : (
                      <VideocamOutlinedIcon sx={{ fontSize: 14, color: '#FFFFFF' }} />
                    )}
                    <span className="text-[11px] font-semibold text-[#FFFFFF] truncate drop-shadow-md tracking-wide">
                      {item.label}
                    </span>
                  </div>
                </button>
              );
            })}

            {displayedItems.length === 0 && (
              <div className="col-span-full py-8 text-center text-[#6B7280] text-[13px] font-medium bg-[rgba(255,255,255,0.4)] rounded-[8px] border border-[rgba(255,255,255,0.6)]">
                No media found.
              </div>
            )}
          </div>
        </div>
      </div>

      <Dialog
        open={lightboxIdx !== null}
        onClose={close}
        maxWidth="md"
        fullWidth
        PaperProps={{ sx: { bgcolor: 'transparent', boxShadow: 'none', m: 1, overflow: 'visible' } }}
        aria-label="Media gallery lightbox"
      >
        {lightboxIdx !== null && (
          <div className="relative flex flex-col items-center justify-center w-full">
            <img
              src={displayedItems[lightboxIdx].src}
              alt={displayedItems[lightboxIdx].alt}
              className="w-full max-h-[85vh] object-contain rounded-[8px] shadow-[0_16px_40px_rgba(0,0,0,0.4)]"
            />

            <IconButton
              onClick={close}
              size="small"
              aria-label="Close lightbox"
              sx={{ 
                position: 'absolute', top: -14, right: -14, zIndex: 10,
                bgcolor: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(12px)',
                color: '#1A1F24', border: '1px solid rgba(255,255,255,0.6)',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                '&:hover': { bgcolor: '#FFFFFF', transform: 'scale(1.05)' },
                transition: 'all 0.2s ease-out'
              }}
            >
              <CloseIcon sx={{ fontSize: 18 }} />
            </IconButton>

            {displayedItems.length > 1 && (
              <>
                <IconButton 
                  onClick={prev} 
                  size="small" 
                  aria-label="Previous" 
                  sx={{ 
                    position: 'absolute', left: -16, top: '50%', transform: 'translateY(-50%)',
                    bgcolor: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(12px)',
                    color: '#1A1F24', border: '1px solid rgba(255,255,255,0.6)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                    '&:hover': { bgcolor: '#FFFFFF', transform: 'translateY(-50%) scale(1.05)' },
                    transition: 'all 0.2s ease-out'
                  }}
                >
                  <NavigateBeforeIcon sx={{ fontSize: 22 }} />
                </IconButton>
                
                <IconButton 
                  onClick={next} 
                  size="small" 
                  aria-label="Next" 
                  sx={{ 
                    position: 'absolute', right: -16, top: '50%', transform: 'translateY(-50%)',
                    bgcolor: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(12px)',
                    color: '#1A1F24', border: '1px solid rgba(255,255,255,0.6)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                    '&:hover': { bgcolor: '#FFFFFF', transform: 'translateY(-50%) scale(1.05)' },
                    transition: 'all 0.2s ease-out'
                  }}
                >
                  <NavigateNextIcon sx={{ fontSize: 22 }} />
                </IconButton>
              </>
            )}

            <div className="absolute -bottom-12 left-0 right-0 flex justify-between items-center px-2">
              <span className="text-[#FFFFFF] text-[14px] font-semibold drop-shadow-md tracking-wide">
                {displayedItems[lightboxIdx].label}
              </span>
              <span className="text-[#FFFFFF] text-[12px] font-bold bg-[rgba(0,0,0,0.5)] border border-[rgba(255,255,255,0.2)] px-3 py-1 rounded-[8px] backdrop-blur-[8px]">
                {lightboxIdx + 1} / {displayedItems.length}
              </span>
            </div>
          </div>
        )}
      </Dialog>

      <div className="mt-4 pb-28">
        <AskSeller initialQuestions={galleryAskSellerQuestions} />
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fadeBlurIn { 
          from { opacity: 0; filter: blur(6px); transform: translateY(12px); } 
          to { opacity: 1; filter: blur(0px); transform: translateY(0); } 
        }
        .animate-fade-blur-in { animation: fadeBlurIn 0.28s cubic-bezier(0.4, 0, 0.2, 1) forwards; }
      `}} />
    </>
  );
};

export default GallerySection;