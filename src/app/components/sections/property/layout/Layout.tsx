import React, { useState } from 'react';
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
  const maxVisibleThumbs = 3;
  const hasExtraImages = layoutImages.length > maxVisibleThumbs;
  const hiddenImageCount = Math.max(layoutImages.length - (maxVisibleThumbs - 1), 0);
  const visibleThumbs = hasExtraImages
    ? layoutImages.slice(0, maxVisibleThumbs)
    : layoutImages;

  const prev = () => setImgIdx((i) => (i - 1 + layoutImages.length) % layoutImages.length);
  const next = () => setImgIdx((i) => (i + 1) % layoutImages.length);

  return (
    <>
      {/* Image Viewer */}
      <div className="relative w-full bg-[var(--bg-section-light)]" style={{ aspectRatio: '4/3' }}>
        <img
          src={layoutImages[imgIdx].src}
          alt={layoutImages[imgIdx].label}
          className="w-full h-full object-cover"
          loading="lazy"
        />

        {/* Prev / Next */}
        {layoutImages.length > 1 && (
          <>
            <IconButton
              onClick={prev}
              size="small"
              aria-label="Previous image"
              sx={{ position: 'absolute', left: 8, top: '50%', transform: 'translateY(-50%)', bgcolor: 'var(--overlay-white-90)', '&:hover': { bgcolor: 'var(--background-color)' }, borderRadius: 'var(--radius-sm)' }}
            >
              <NavigateBeforeIcon sx={{ fontSize: 18, color: 'var(--text-primary)' }} />
            </IconButton>
            <IconButton
              onClick={next}
              size="small"
              aria-label="Next image"
              sx={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', bgcolor: 'var(--overlay-white-90)', '&:hover': { bgcolor: 'var(--background-color)' }, borderRadius: 'var(--radius-sm)' }}
            >
              <NavigateNextIcon sx={{ fontSize: 18, color: 'var(--text-primary)' }} />
            </IconButton>
          </>
        )}

        {/* Image label + fullscreen */}
        <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-3 py-2 bg-[var(--overlay-dark-45)]">
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
              aria-label="View fullscreen"
              sx={{ color: 'var(--overlay-white-85)', p: 0.25 }}
            >
              <ZoomOutMapIcon sx={{ fontSize: 16 }} />
            </IconButton>
          </div>
        </div>
      </div>

      {/* Thumbnail strip */}
      <div className="flex gap-1.5 px-3 py-2 border-b border-[var(--border-subtle)]">
        {visibleThumbs.map((img, i) => {
          const isOverflowThumb = hasExtraImages && i === maxVisibleThumbs - 1;
          const isActive = isOverflowThumb ? imgIdx >= maxVisibleThumbs - 1 : i === imgIdx;

          return (
          <button
            key={i}
            onClick={() => setImgIdx(i)}
            className="w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 rounded-[var(--radius-sm)] overflow-hidden border-2 transition-all"
            style={{ borderColor: isActive ? 'var(--accent-primary)' : 'var(--border-default)' }}
            aria-label={img.label}
            aria-current={isActive ? 'true' : undefined}
          >
            <div className="relative w-full h-full">
              <img src={img.src} alt={img.label} className="w-full h-full object-cover" loading="lazy" />
              {isOverflowThumb && (
                <span className="absolute inset-0 bg-black/45 flex items-center justify-center text-white text-[16px] font-bold">
                  +{hiddenImageCount}
                </span>
              )}
            </div>
          </button>
          );
        })}
      </div>

      {/* Plot availability */}
      <div className="px-3 py-3">
        <p className="text-[13px] font-bold text-[var(--text-primary)] mb-2">Plot Availability</p>
        <div className="flex flex-col">
          {plotSizes.map((plot, i, arr) => (
            <div key={plot.size}>
              <div className="flex items-center justify-between py-2.5">
                <div>
                  <p className="text-[13px] font-semibold text-[var(--text-primary)]">{plot.size} Plot</p>
                  <p className="text-[11px] font-medium text-[var(--text-muted)] mt-0.5">
                    Rs. {plot.pricePerSqYd.toLocaleString('en-IN')}/Sq.Yd
                  </p>
                </div>
                <p className="text-[15px] font-bold text-[var(--accent-primary)]">
                  Rs. {((plot.pricePerSqYd * plot.sqYd) / 100000).toFixed(1)}L
                </p>
              </div>
              {i < arr.length - 1 && <div className="h-px bg-[var(--border-subtle)]" />}
            </div>
          ))}
        </div>

        <button
          className="mt-3 w-full py-2.5 rounded-[var(--radius-md)] text-white text-[14px] font-bold transition-all duration-300 hover:shadow-[0_4px_16px_var(--primary-alpha-25)] active:scale-[0.98]"
          style={{ background: 'var(--gradient-accent)' }}
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
        PaperProps={{ sx: { bgcolor: 'var(--text-black)', m: 1 } }}
        aria-label="Layout image fullscreen view"
      >
        <div className="relative">
          <img
            src={layoutImages[imgIdx].src}
            alt={layoutImages[imgIdx].label}
            className="w-full"
          />
          <IconButton
            onClick={() => setLightboxOpen(false)}
            sx={{ position: 'absolute', top: 8, right: 8, bgcolor: 'var(--overlay-dark-60)', color: 'var(--background-color)', '&:hover': { bgcolor: 'var(--overlay-dark-80)' } }}
            size="small"
            aria-label="Close fullscreen"
          >
            <CloseIcon sx={{ fontSize: 18 }} />
          </IconButton>
          <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-3">
            <IconButton onClick={prev} sx={{ bgcolor: 'var(--overlay-white-15)', color: 'var(--background-color)' }} size="small" aria-label="Previous">
              <NavigateBeforeIcon />
            </IconButton>
            <IconButton onClick={next} sx={{ bgcolor: 'var(--overlay-white-15)', color: 'var(--background-color)' }} size="small" aria-label="Next">
              <NavigateNextIcon />
            </IconButton>
          </div>
        </div>
      </Dialog>

      <AskSeller initialQuestions={layoutAskSellerQuestions} />
    </>
  );
};

export default Layout;