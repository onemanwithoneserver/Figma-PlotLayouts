import React, { useState } from 'react';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import Chip from '@mui/material/Chip';
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
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  const close = () => setLightboxIdx(null);
  const prev = () => setLightboxIdx((i) => i === null ? 0 : (i - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length);
  const next = () => setLightboxIdx((i) => i === null ? 0 : (i + 1) % GALLERY_ITEMS.length);

  const imgCount = GALLERY_ITEMS.filter((m) => m.type === 'image').length;
  const vidCount = GALLERY_ITEMS.filter((m) => m.type === 'video').length;

  return (
    <>
      <Card elevation={0}>
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-2.5">
          <Typography sx={{ fontSize: '0.9375rem', fontWeight: 700, color: '#1A1A1A' }}>
            Gallery
          </Typography>
          <div className="flex items-center gap-1.5">
            <Chip
              icon={<ImageOutlinedIcon sx={{ fontSize: 13, color: '#1F7A63 !important' }} />}
              label={`${imgCount} Photos`}
              size="small"
              sx={{ backgroundColor: '#E8F5E9', color: '#1F7A63', fontWeight: 600, fontSize: '0.6875rem', borderRadius: '4px', '& .MuiChip-icon': { color: '#1F7A63' } }}
            />
            <Chip
              icon={<VideocamOutlinedIcon sx={{ fontSize: 13, color: '#666666 !important' }} />}
              label={`${vidCount} Videos`}
              size="small"
              sx={{ backgroundColor: '#F5F5F5', color: '#666666', fontWeight: 600, fontSize: '0.6875rem', borderRadius: '4px', '& .MuiChip-icon': { color: '#666666' } }}
            />
          </div>
        </div>
        <Divider />

        {/* Grid */}
        <div className="p-3">
          <div className="grid grid-cols-2 gap-2">
            {GALLERY_ITEMS.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => setLightboxIdx(idx)}
                className="relative rounded-[4px] overflow-hidden group focus:outline-none"
                style={{ aspectRatio: idx % 5 === 0 ? '1/1' : '4/3' }}
                aria-label={`Open ${item.label}`}
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-200" />

                {item.type === 'video' && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-9 h-9 rounded-full bg-[#1F7A63] flex items-center justify-center">
                      <PlayCircleOutlineIcon sx={{ fontSize: 22, color: '#FFFFFF' }} />
                    </div>
                  </div>
                )}

                <div className="absolute bottom-1.5 left-1.5">
                  <span className="text-[0.625rem] font-600 text-white bg-black/55 px-1.5 py-0.5 rounded-[3px]">
                    {item.label}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* Lightbox */}
      <Dialog
        open={lightboxIdx !== null}
        onClose={close}
        maxWidth="sm"
        fullWidth
        PaperProps={{ sx: { bgcolor: '#000000', m: 1, overflow: 'visible' } }}
      >
        {lightboxIdx !== null && (
          <div className="relative">
            <img
              src={GALLERY_ITEMS[lightboxIdx].src}
              alt={GALLERY_ITEMS[lightboxIdx].alt}
              className="w-full"
            />

            {/* Close */}
            <IconButton
              onClick={close}
              size="small"
              sx={{ position: 'absolute', top: 8, right: 8, bgcolor: 'rgba(0,0,0,0.6)', color: '#FFFFFF', '&:hover': { bgcolor: 'rgba(0,0,0,0.85)' } }}
            >
              <CloseIcon sx={{ fontSize: 18 }} />
            </IconButton>

            {/* Prev / Next */}
            <IconButton
              onClick={prev}
              size="small"
              sx={{ position: 'absolute', left: 8, top: '50%', transform: 'translateY(-50%)', bgcolor: 'rgba(255,255,255,0.15)', color: '#FFFFFF', '&:hover': { bgcolor: 'rgba(255,255,255,0.25)' } }}
            >
              <NavigateBeforeIcon />
            </IconButton>
            <IconButton
              onClick={next}
              size="small"
              sx={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', bgcolor: 'rgba(255,255,255,0.15)', color: '#FFFFFF', '&:hover': { bgcolor: 'rgba(255,255,255,0.25)' } }}
            >
              <NavigateNextIcon />
            </IconButton>

            {/* Counter */}
            <div className="absolute bottom-8 left-0 right-0 flex justify-center">
              <span className="text-white/80 text-[0.6875rem] bg-black/50 px-2 py-0.5 rounded-[3px]">
                {lightboxIdx + 1} / {GALLERY_ITEMS.length}
              </span>
            </div>
          </div>
        )}
      </Dialog>
    </>
  );
};

export default GallerySection;