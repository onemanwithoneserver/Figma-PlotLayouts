import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import CloseIcon from '@mui/icons-material/Close';
import ZoomOutMapIcon from '@mui/icons-material/ZoomOutMap';
import AskSeller from '../shared/AskSeller';

const layoutImages = [
  {
    src: 'https://images.unsplash.com/photo-1563207153-f403bf289096?w=800&h=500&fit=crop',
    label: 'Master Layout Plan',
  },
  {
    src: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=500&fit=crop',
    label: 'Phase 1 Plot Grid',
  },
  {
    src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=500&fit=crop',
    label: 'Internal Road Network',
  },
];

const plotSizes = [
  { size: '100 Sq.Yd', sqYd: 100, pricePerSqYd: 18000 },
  { size: '150 Sq.Yd', sqYd: 150, pricePerSqYd: 17500 },
  { size: '200 Sq.Yd', sqYd: 200, pricePerSqYd: 16800 },
  { size: '240 Sq.Yd', sqYd: 240, pricePerSqYd: 16000 },
];



const Layout: React.FC = () => {
  const [imgIdx, setImgIdx] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const prev = () => setImgIdx((i) => (i - 1 + layoutImages.length) % layoutImages.length);
  const next = () => setImgIdx((i) => (i + 1) % layoutImages.length);

  return (
    <>
      {/* Image Viewer */}
      <div className="relative w-full bg-[#F5F5F5]" style={{ aspectRatio: '4/3' }}>
        <img
          src={layoutImages[imgIdx].src}
          alt={layoutImages[imgIdx].label}
          className="w-full h-full object-cover"
        />

        {/* Prev / Next */}
        {layoutImages.length > 1 && (
          <>
            <IconButton
              onClick={prev}
              size="small"
              sx={{ position: 'absolute', left: 8, top: '50%', transform: 'translateY(-50%)', bgcolor: 'rgba(255,255,255,0.9)', '&:hover': { bgcolor: '#FFFFFF' } }}
            >
              <NavigateBeforeIcon sx={{ fontSize: 18, color: '#1A1A1A' }} />
            </IconButton>
            <IconButton
              onClick={next}
              size="small"
              sx={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', bgcolor: 'rgba(255,255,255,0.9)', '&:hover': { bgcolor: '#FFFFFF' } }}
            >
              <NavigateNextIcon sx={{ fontSize: 18, color: '#1A1A1A' }} />
            </IconButton>
          </>
        )}

        {/* Image label + fullscreen */}
        <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-3 py-2 bg-[rgba(0,0,0,0.45)]">
          <span className="text-[12px] font-semibold text-white">
            {layoutImages[imgIdx].label}
          </span>
          <div className="flex items-center gap-2">
            <span className="text-white/70 text-[10px]">
              {imgIdx + 1} / {layoutImages.length}
            </span>
            <IconButton
              onClick={() => setLightboxOpen(true)}
              size="small"
              sx={{ color: 'rgba(255,255,255,0.85)', p: 0.25 }}
            >
              <ZoomOutMapIcon sx={{ fontSize: 16 }} />
            </IconButton>
          </div>
        </div>
      </div>

      {/* Thumbnail strip */}
      <div className="flex gap-1.5 px-3 py-2 border-b border-neutral-200">
        {layoutImages.map((img, i) => (
          <button
            key={i}
            onClick={() => setImgIdx(i)}
            className="flex-1 rounded-[3px] overflow-hidden border-2 transition-all"
            style={{ borderColor: i === imgIdx ? '#1F7A63' : '#E0E0E0' }}
          >
            <img src={img.src} alt={img.label} className="w-full h-9 object-cover" />
          </button>
        ))}
      </div>

      {/* Plot availability */}
      <div className="px-3 py-3">
        <p className="text-[13px] font-bold text-[#1A1A1A] mb-2">Plot Availability</p>
        <div className="flex flex-col">
          {plotSizes.map((plot, i, arr) => (
            <div key={plot.size}>
              <div className="flex items-center justify-between py-2.5">
                <div>
                  <p className="text-[13px] font-semibold text-[#1A1A1A]">{plot.size} Plot</p>
                  <p className="text-[11px] font-medium text-neutral-500 mt-0.5">
                    Rs. {plot.pricePerSqYd.toLocaleString('en-IN')}/Sq.Yd
                  </p>
                </div>
                <p className="text-[15px] font-bold text-[#1F7A63]">
                  Rs. {((plot.pricePerSqYd * plot.sqYd) / 100000).toFixed(1)}L
                </p>
              </div>
              {i < arr.length - 1 && <div className="h-px bg-neutral-200" />}
            </div>
          ))}
        </div>

        <button
          className="mt-3 w-full py-2.5 rounded-[4px] bg-[#1F7A63] hover:bg-[#145a47] text-white text-[14px] font-bold transition-colors"
        >
          Check Plot Availability
        </button>
      </div>

      {/* Lightbox */}
      <Dialog
        open={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{ sx: { bgcolor: '#000000', m: 1 } }}
      >
        <div className="relative">
          <img
            src={layoutImages[imgIdx].src}
            alt={layoutImages[imgIdx].label}
            className="w-full"
          />
          <IconButton
            onClick={() => setLightboxOpen(false)}
            sx={{ position: 'absolute', top: 8, right: 8, bgcolor: 'rgba(0,0,0,0.6)', color: '#FFFFFF', '&:hover': { bgcolor: 'rgba(0,0,0,0.8)' } }}
            size="small"
          >
            <CloseIcon sx={{ fontSize: 18 }} />
          </IconButton>
          <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-3">
            <IconButton onClick={prev} sx={{ bgcolor: 'rgba(255,255,255,0.15)', color: '#FFFFFF' }} size="small">
              <NavigateBeforeIcon />
            </IconButton>
            <IconButton onClick={next} sx={{ bgcolor: 'rgba(255,255,255,0.15)', color: '#FFFFFF' }} size="small">
              <NavigateNextIcon />
            </IconButton>
          </div>
        </div>
      </Dialog>

      <AskSeller
        initialQuestions={[
          'What is the exact plot demarcation process after booking?',
          'Is the layout HMDA / DTCP approved?',
          'Are corner plots available at the quoted price?',
          'What is the estimated registration timeline?',
          'Is the road-facing plot available in 100 Sq.Yd size?',
        ]}
      />
    </>
  );
};

export default Layout;