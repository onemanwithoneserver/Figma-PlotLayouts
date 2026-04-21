import React, { useState, useMemo } from 'react';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import VideocamOutlinedIcon from '@mui/icons-material/VideocamOutlined';

interface MediaItem {
  id: string;
  type: 'image' | 'video';
  src: string;
  alt: string;
  label: string;
}

const GALLERY_ITEMS: MediaItem[] = [
  { id: 'g1', type: 'image', src: 'https://images.unsplash.com/photo-1500076656116-558758c991c1?w=600&h=400&fit=crop', alt: 'Project entrance', label: 'Entrance' },
  { id: 'g2', type: 'image', src: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&h=400&fit=crop', alt: 'Aerial layout view', label: 'Aerial View' },
  { id: 'g3', type: 'video', src: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&h=400&fit=crop', alt: 'Clubhouse walkthrough', label: 'Clubhouse' },
  { id: 'g4', type: 'image', src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop', alt: 'Internal roads', label: 'Roads' },
  { id: 'g5', type: 'image', src: 'https://images.unsplash.com/photo-1563207153-f403bf289096?w=600&h=400&fit=crop', alt: 'Plot boundary', label: 'Plot View' },
  { id: 'g6', type: 'video', src: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600&h=400&fit=crop', alt: 'Site progress', label: 'Progress' },
];

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
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&display=swap');
          .font-outfit { font-family: 'Outfit', sans-serif; }
          .hide-scrollbar::-webkit-scrollbar { display: none; }
          .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        `}
      </style>

      <div className="font-outfit border border-[#EAEAEA] rounded-[8px] overflow-hidden bg-white max-w-full">
        <div className="px-3 pt-3 flex items-end justify-between border-b border-[#EAEAEA] gap-3">
          <h2 className="text-[1.0625rem] font-bold text-[#1A1A1A] leading-[1.2] mb-1.5 min-w-max">
            Media Gallery
          </h2>
          
          <div className="flex gap-4 overflow-x-auto hide-scrollbar">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              const Icon = tab.icon;
              
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(isActive ? 'all' : tab.id);
                    setLightboxIdx(null);
                  }}
                  className={`relative flex items-center gap-1.5 pb-2 text-[0.875rem] font-semibold transition-colors whitespace-nowrap focus:outline-none ${
                    isActive ? 'text-[#1F7A63]' : 'text-[#666666] hover:text-[#1F7A63]'
                  }`}
                >
                  <Icon sx={{ fontSize: 16 }} />
                  {tab.label}
                  {isActive && (
                    <span className="absolute bottom-[-1px] left-0 right-0 h-[2.5px] bg-[#1F7A63] rounded-t-[4px]" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <div className="p-3 bg-[#FAFAFA]">
          <div className="grid grid-cols-2 gap-2.5">
            {displayedItems.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => setLightboxIdx(idx)}
                className="relative rounded-[8px] overflow-hidden group focus:outline-none aspect-[4/3] bg-gray-200 block w-full"
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0 opacity-80" />

                {item.type === 'video' && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full bg-white/25 backdrop-blur-sm border border-white/30 flex items-center justify-center shadow-sm">
                      <PlayCircleOutlineIcon sx={{ fontSize: 24, color: '#FFFFFF' }} />
                    </div>
                  </div>
                )}

                <div className="absolute bottom-2 left-2 right-2 flex items-center gap-1.5">
                  {item.type === 'image' ? (
                    <ImageOutlinedIcon sx={{ fontSize: 14, color: '#FFFFFF' }} />
                  ) : (
                    <VideocamOutlinedIcon sx={{ fontSize: 14, color: '#FFFFFF' }} />
                  )}
                  <span className="text-[0.75rem] font-bold text-white truncate drop-shadow-md tracking-wide">
                    {item.label}
                  </span>
                </div>
              </button>
            ))}
            
            {displayedItems.length === 0 && (
              <div className="col-span-full py-8 text-center text-[#666666] text-sm font-medium">
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
      >
        {lightboxIdx !== null && (
          <div className="relative flex flex-col items-center justify-center font-outfit">
            <img
              src={displayedItems[lightboxIdx].src}
              alt={displayedItems[lightboxIdx].alt}
              className="w-full max-h-[85vh] object-contain rounded-[8px]"
            />

            <IconButton
              onClick={close}
              size="small"
              sx={{ position: 'absolute', top: -14, right: -14, bgcolor: '#FFFFFF', color: '#000000', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', '&:hover': { bgcolor: '#F5F5F5' }, zIndex: 10 }}
            >
              <CloseIcon sx={{ fontSize: 18 }} />
            </IconButton>

            {displayedItems.length > 1 && (
              <>
                <IconButton
                  onClick={prev}
                  size="small"
                  sx={{ position: 'absolute', left: -16, top: '50%', transform: 'translateY(-50%)', bgcolor: '#FFFFFF', color: '#000000', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', '&:hover': { bgcolor: '#F5F5F5' } }}
                >
                  <NavigateBeforeIcon sx={{ fontSize: 22 }} />
                </IconButton>
                <IconButton
                  onClick={next}
                  size="small"
                  sx={{ position: 'absolute', right: -16, top: '50%', transform: 'translateY(-50%)', bgcolor: '#FFFFFF', color: '#000000', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', '&:hover': { bgcolor: '#F5F5F5' } }}
                >
                  <NavigateNextIcon sx={{ fontSize: 22 }} />
                </IconButton>
              </>
            )}

            <div className="absolute -bottom-10 left-0 right-0 flex justify-between items-center px-2">
              <span className="text-[#FFFFFF] text-[0.875rem] font-bold drop-shadow-md tracking-wide">
                {displayedItems[lightboxIdx].label}
              </span>
              <span className="text-white text-[0.75rem] font-bold bg-black/60 px-2.5 py-1 rounded-[4px] backdrop-blur-md">
                {lightboxIdx + 1} / {displayedItems.length}
              </span>
            </div>
          </div>
        )}
      </Dialog>
    </>
  );
};

export default GallerySection;