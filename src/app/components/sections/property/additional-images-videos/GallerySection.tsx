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
      <div className="font-outfit border border-[var(--border-subtle)] rounded-[2px] overflow-hidden bg-white max-w-full">
        {/* Header with filter tabs */}
        <div className="px-3 pt-3 flex items-end justify-between border-b border-[var(--border-subtle)] gap-3">
          <h2 className="text-[1.0625rem] font-bold text-[var(--text-primary)] leading-[1.2] mb-1.5 min-w-max">
            Media Gallery
          </h2>
          
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
                  className={`compact-touch relative flex items-center gap-1.5 pb-2 text-[0.875rem] font-semibold transition-colors whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)]/40 ${
                    isActive ? 'text-[var(--accent-primary)]' : 'text-[var(--text-muted)] hover:text-[var(--accent-primary)]'
                  }`}
                >
                  <Icon sx={{ fontSize: 16 }} />
                  {tab.label}
                  {isActive && (
                    <span className="absolute bottom-[-1px] left-0 right-0 h-[2.5px] rounded-t-[var(--radius-sm)]" style={{ background: 'var(--gradient-accent)' }} />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Grid */}
        <div className="p-3 bg-[var(--bg-section-light)]" role="tabpanel">
          <div className="grid grid-cols-2 gap-2.5">
            {displayedItems.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => setLightboxIdx(idx)}
                className="compact-touch relative rounded-[var(--radius-md)] overflow-hidden group focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)] aspect-[4/3] bg-[var(--border-default)] block w-full"
                aria-label={`View ${item.label} ${item.type}`}
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0 opacity-80" />

                {item.type === 'video' && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-10 h-10 rounded-[var(--radius-md)] bg-white/25 backdrop-blur-sm border border-white/30 flex items-center justify-center shadow-sm">
                      <PlayCircleOutlineIcon sx={{ fontSize: 24, color: 'var(--background-color)' }} />
                    </div>
                  </div>
                )}

                <div className="absolute bottom-2 left-2 right-2 flex items-center gap-1.5">
                  {item.type === 'image' ? (
                    <ImageOutlinedIcon sx={{ fontSize: 14, color: 'var(--background-color)' }} />
                  ) : (
                    <VideocamOutlinedIcon sx={{ fontSize: 14, color: 'var(--background-color)' }} />
                  )}
                  <span className="text-[0.75rem] font-bold text-white truncate drop-shadow-md tracking-wide">
                    {item.label}
                  </span>
                </div>
              </button>
            ))}
            
            {displayedItems.length === 0 && (
              <div className="col-span-full py-8 text-center text-[var(--text-muted)] text-sm font-medium">
                No media found.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Lightbox Dialog */}
      <Dialog
        open={lightboxIdx !== null}
        onClose={close}
        maxWidth="md"
        fullWidth
        PaperProps={{ sx: { bgcolor: 'transparent', boxShadow: 'none', m: 1, overflow: 'visible' } }}
        aria-label="Media gallery lightbox"
      >
        {lightboxIdx !== null && (
          <div className="relative flex flex-col items-center justify-center font-outfit">
            <img
              src={displayedItems[lightboxIdx].src}
              alt={displayedItems[lightboxIdx].alt}
              className="w-full max-h-[85vh] object-contain rounded-[var(--radius-md)]"
            />

            <IconButton
              onClick={close}
              size="small"
              aria-label="Close lightbox"
              sx={{ position: 'absolute', top: -14, right: -14, bgcolor: 'var(--background-color)', color: 'var(--text-black)', boxShadow: '0 4px 6px -1px var(--overlay-dark-20)', '&:hover': { bgcolor: 'var(--bg-muted)' }, zIndex: 10 }}
            >
              <CloseIcon sx={{ fontSize: 18 }} />
            </IconButton>

            {displayedItems.length > 1 && (
              <>
                <IconButton onClick={prev} size="small" aria-label="Previous" sx={{ position: 'absolute', left: -16, top: '50%', transform: 'translateY(-50%)', bgcolor: 'var(--background-color)', color: 'var(--text-black)', boxShadow: '0 4px 6px -1px var(--overlay-dark-20)', '&:hover': { bgcolor: 'var(--bg-muted)' } }}>
                  <NavigateBeforeIcon sx={{ fontSize: 22 }} />
                </IconButton>
                <IconButton onClick={next} size="small" aria-label="Next" sx={{ position: 'absolute', right: -16, top: '50%', transform: 'translateY(-50%)', bgcolor: 'var(--background-color)', color: 'var(--text-black)', boxShadow: '0 4px 6px -1px var(--overlay-dark-20)', '&:hover': { bgcolor: 'var(--bg-muted)' } }}>
                  <NavigateNextIcon sx={{ fontSize: 22 }} />
                </IconButton>
              </>
            )}

            <div className="absolute -bottom-10 left-0 right-0 flex justify-between items-center px-2">
              <span className="text-[var(--background-color)] text-[0.875rem] font-bold drop-shadow-md tracking-wide">
                {displayedItems[lightboxIdx].label}
              </span>
              <span className="text-white text-[0.75rem] font-bold bg-black/60 px-2.5 py-1 rounded-[var(--radius-sm)] backdrop-blur-md">
                {lightboxIdx + 1} / {displayedItems.length}
              </span>
            </div>
          </div>
        )}
      </Dialog>

      <AskSeller initialQuestions={galleryAskSellerQuestions} className="pb-28" />
    </>
  );
};

export default GallerySection;