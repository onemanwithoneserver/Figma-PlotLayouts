import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import CloseIcon from '@mui/icons-material/Close';
import ZoomOutMapIcon from '@mui/icons-material/ZoomOutMap';
import AskSeller from '../shared/AskSeller';
import { layoutImages, plotSizes, layoutAskSellerQuestions } from './plotData';

const Layout: React.FC = () => {
  const [imgIdx, setImgIdx] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const prev = () => setImgIdx((i) => (i - 1 + layoutImages.length) % layoutImages.length);
  const next = () => setImgIdx((i) => (i + 1) % layoutImages.length);

  // Generate an infinite looping array of thumbnails (Full Circle)
  const getCircularThumbs = () => {
    const total = layoutImages.length;
    // Show 5 items at a time (or total if less than 5)
    const visibleCount = Math.min(5, total);
    const thumbs = [];

    for (let i = 0; i < visibleCount; i++) {
      // Offset to keep the active item perfectly centered
      let offset = i - Math.floor(visibleCount / 2);
      let index = (imgIdx + offset + total) % total;
      thumbs.push({
        ...layoutImages[index],
        originalIndex: index,
        isCenter: offset === 0
      });
    }
    return thumbs;
  };

  const circularThumbs = getCircularThumbs();

  return (
    <div className="font-outfit">
      {/* Main Image Viewer */}
      <div className="relative w-full bg-[var(--color-bg-main)] overflow-hidden" style={{ aspectRatio: '4/3' }}>
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.img
            key={imgIdx}
            src={layoutImages[imgIdx].src}
            alt={layoutImages[imgIdx].label}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
          />
        </AnimatePresence>

        {layoutImages.length > 1 && (
          <>
            <IconButton
              onClick={prev}
              size="small"
              aria-label="Previous image"
              sx={{ position: 'absolute', left: 8, top: '50%', transform: 'translateY(-50%)', bgcolor: 'rgba(255,255,255,0.9)', '&:hover': { bgcolor: 'var(--color-bg-white)' }, borderRadius: 'var(--radius-sm)', zIndex: 10 }}
            >
              <NavigateBeforeIcon sx={{ fontSize: 18, color: 'var(--color-text-primary)' }} />
            </IconButton>
            <IconButton
              onClick={next}
              size="small"
              aria-label="Next image"
              sx={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', bgcolor: 'rgba(255,255,255,0.9)', '&:hover': { bgcolor: 'var(--color-bg-white)' }, borderRadius: 'var(--radius-sm)', zIndex: 10 }}
            >
              <NavigateNextIcon sx={{ fontSize: 18, color: 'var(--color-text-primary)' }} />
            </IconButton>
          </>
        )}

        <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-3 py-2 bg-gradient-to-t from-[rgba(10,26,16,0.8)] to-transparent z-10">
          <span className="text-[12px] font-bold text-white drop-shadow-md">
            {layoutImages[imgIdx].label}
          </span>
          <div className="flex items-center gap-2">
            <span className="text-white/90 text-[11px] font-bold drop-shadow-md">
              {imgIdx + 1} / {layoutImages.length}
            </span>
            <IconButton
              onClick={() => setLightboxOpen(true)}
              size="small"
              aria-label="View fullscreen"
              sx={{ color: 'var(--color-bg-white)', p: 0.5, bgcolor: 'rgba(255,255,255,0.15)', '&:hover': { bgcolor: 'rgba(255,255,255,0.3)' } }}
            >
              <ZoomOutMapIcon sx={{ fontSize: 16 }} />
            </IconButton>
          </div>
        </div>
      </div>

      {/* Infinite Looping Thumbnail Strip */}
      <div className="flex justify-center items-center gap-2 px-3 py-3 bg-[var(--color-bg-soft)] border-b border-[var(--color-border)] overflow-hidden">
        <AnimatePresence mode="popLayout">
          {circularThumbs.map((thumb) => (
            <motion.button
              layout
              key={`${thumb.originalIndex}-${thumb.isCenter ? 'center' : 'side'}`}
              onClick={() => setImgIdx(thumb.originalIndex)}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: thumb.isCenter ? 1 : 0.6,
                scale: thumb.isCenter ? 1.1 : 0.9,
                filter: thumb.isCenter ? 'brightness(1)' : 'brightness(0.7)'
              }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              className={`relative flex-shrink-0 rounded-[var(--radius-sm)] overflow-hidden transition-all duration-300 focus:outline-none ${thumb.isCenter
                  ? 'w-[72px] h-[72px] shadow-[0_4px_12px_var(--color-glow)] z-10 border-2 border-[var(--color-accent)]'
                  : 'w-[56px] h-[56px] border border-transparent hover:opacity-90 hover:scale-95'
                }`}
              aria-label={thumb.label}
              aria-current={thumb.isCenter ? 'true' : undefined}
            >
              <img
                src={thumb.src}
                alt={thumb.label}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              {/* Highlight Overlay for Active Thumbnail */}
              {thumb.isCenter && (
                <motion.div
                  layoutId="active-thumb-highlight"
                  className="absolute inset-0 border-2 border-[var(--color-bg-white)] rounded-[var(--radius-sm)] pointer-events-none"
                />
              )}
            </motion.button>
          ))}
        </AnimatePresence>
      </div>

      {/* Plot Availability Section */}
      <div className="px-3 py-4">
        <p className="text-[13px] font-extrabold text-[var(--color-text-primary)] mb-2.5 uppercase tracking-wide">
          Plot Availability
        </p>
        <div className="flex flex-col bg-[var(--color-bg-white)] border border-[var(--color-border)] rounded-[var(--radius-md)] shadow-sm">
          {plotSizes.map((plot, i, arr) => (
            <div key={plot.size} className="hover:bg-[var(--color-bg-soft)] transition-colors rounded-[var(--radius-md)]">
              <div className="flex items-center justify-between px-3 py-3 cursor-pointer">
                <div>
                  <p className="text-[13px] font-bold text-[var(--color-text-primary)]">{plot.size} Plot</p>
                  <p className="text-[11px] font-semibold text-[var(--color-text-muted)] mt-0.5">
                    Rs. {plot.pricePerSqYd.toLocaleString('en-IN')}/Sq.Yd
                  </p>
                </div>
                <p className="text-[15px] font-extrabold text-[var(--color-accent)] drop-shadow-sm">
                  Rs. {((plot.pricePerSqYd * plot.sqYd) / 100000).toFixed(1)}L
                </p>
              </div>
              {i < arr.length - 1 && <div className="h-px bg-[var(--color-border)] mx-3" />}
            </div>
          ))}
        </div>

        <button
          className="mt-4 w-full py-3 rounded-[var(--radius-md)] text-white text-[14px] font-bold transition-all duration-300 hover-lift glass-cta shadow-[0_4px_16px_var(--color-glow)]"
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
        PaperProps={{ sx: { bgcolor: '#000000', m: 1, borderRadius: 'var(--radius-md)' } }}
        aria-label="Layout image fullscreen view"
      >
        <div className="relative flex items-center justify-center min-h-[50vh]">
          <img
            src={layoutImages[imgIdx].src}
            alt={layoutImages[imgIdx].label}
            className="w-full object-contain max-h-[85vh]"
          />
          <IconButton
            onClick={() => setLightboxOpen(false)}
            sx={{ position: 'absolute', top: 12, right: 12, bgcolor: 'rgba(10,26,16,0.6)', color: 'var(--color-bg-white)', '&:hover': { bgcolor: 'rgba(10,26,16,0.8)' }, backdropFilter: 'blur(4px)' }}
            size="small"
            aria-label="Close fullscreen"
          >
            <CloseIcon sx={{ fontSize: 20 }} />
          </IconButton>
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-4">
            <IconButton onClick={prev} sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'var(--color-bg-white)', backdropFilter: 'blur(8px)', '&:hover': { bgcolor: 'rgba(255,255,255,0.3)' } }} aria-label="Previous">
              <NavigateBeforeIcon fontSize="large" />
            </IconButton>
            <IconButton onClick={next} sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'var(--color-bg-white)', backdropFilter: 'blur(8px)', '&:hover': { bgcolor: 'rgba(255,255,255,0.3)' } }} aria-label="Next">
              <NavigateNextIcon fontSize="large" />
            </IconButton>
          </div>
        </div>
      </Dialog>

      <AskSeller initialQuestions={layoutAskSellerQuestions} className="pb-6" />
    </div>
  );
};

export default Layout;