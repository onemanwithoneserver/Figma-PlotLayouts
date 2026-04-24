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

  const getCircularThumbs = () => {
    const total = layoutImages.length;
    const visibleCount = Math.min(3, total);
    const thumbs = [];

    for (let i = 0; i < visibleCount; i++) {
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
    <div className="w-full">
      <div 
        className="relative w-full rounded-[8px] overflow-hidden bg-[rgba(255,255,255,0.62)] border border-[rgba(255,255,255,0.68)] shadow-[0_1px_6px_rgba(31,65,46,0.08)] animate-fade-blur-in opacity-0"
        style={{ aspectRatio: '4/3', animationDelay: '40ms' }}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.img
            key={imgIdx}
            src={layoutImages[imgIdx].src}
            alt={layoutImages[imgIdx].label}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
          />
        </AnimatePresence>

        <div className="absolute top-3 right-3 z-20">
          <div className="bg-[rgba(255,255,255,0.82)] backdrop-blur-[8px] text-[#142218] text-[11px] font-bold px-3 py-1.5 rounded-[8px] shadow-[0_1px_4px_rgba(31,65,46,0.08)] border border-[rgba(255,255,255,0.68)]">
            {imgIdx + 1} / {layoutImages.length}
          </div>
        </div>

        {layoutImages.length > 1 && (
          <>
            <IconButton
              onClick={prev}
              size="small"
              aria-label="Previous image"
              sx={{ 
                position: 'absolute', left: 8, top: '50%', transform: 'translateY(-50%)', 
                bgcolor: 'rgba(255,255,255,0.82)', backdropFilter: 'blur(8px)', color: '#142218', 
                border: '1px solid rgba(255,255,255,0.68)', borderRadius: '8px', p: 0.5, zIndex: 10, 
                boxShadow: '0 1px 6px rgba(31,65,46,0.1)', transition: 'all 0.24s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': { bgcolor: '#FFFFFF', transform: 'translateY(-50%) scale(1.03)', boxShadow: '0 2px 8px rgba(31,65,46,0.12)' } 
              }}
            >
              <NavigateBeforeIcon sx={{ fontSize: 20 }} />
            </IconButton>
            <IconButton
              onClick={next}
              size="small"
              aria-label="Next image"
              sx={{ 
                position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', 
                bgcolor: 'rgba(255,255,255,0.82)', backdropFilter: 'blur(8px)', color: '#142218', 
                border: '1px solid rgba(255,255,255,0.68)', borderRadius: '8px', p: 0.5, zIndex: 10, 
                boxShadow: '0 1px 6px rgba(31,65,46,0.1)', transition: 'all 0.24s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': { bgcolor: '#FFFFFF', transform: 'translateY(-50%) scale(1.03)', boxShadow: '0 2px 8px rgba(31,65,46,0.12)' } 
              }}
            >
              <NavigateNextIcon sx={{ fontSize: 20 }} />
            </IconButton>
          </>
        )}

        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[rgba(20,34,24,0.45)] to-transparent z-10 pointer-events-none" />

        <div className="absolute bottom-3 left-0 right-0 flex items-end justify-between px-3 z-20 pointer-events-none">
          <div className="w-8" />

          <div className="pointer-events-auto flex justify-center items-center gap-2">
            <AnimatePresence mode="popLayout">
              {circularThumbs.map((thumb) => (
                <motion.button
                  layout
                  key={`${thumb.originalIndex}-${thumb.isCenter ? 'center' : 'side'}`}
                  onClick={() => setImgIdx(thumb.originalIndex)}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{
                    opacity: thumb.isCenter ? 1 : 0.6,
                    scale: thumb.isCenter ? 1.03 : 0.92,
                  }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                  className={`relative flex-shrink-0 rounded-[8px] overflow-hidden transition-all duration-[280ms] focus:outline-none ${
                    thumb.isCenter
                      ? 'w-[48px] h-[48px] border-[1px] border-[#2F6F4E] z-10 shadow-[0_2px_8px_rgba(31,65,46,0.22)] bg-white p-[2px]'
                      : 'w-[40px] h-[40px] border border-[rgba(255,255,255,0.68)] hover:opacity-100 hover:scale-100'
                  }`}
                  aria-label={thumb.label}
                  aria-current={thumb.isCenter ? 'true' : undefined}
                >
                  <img
                    src={thumb.src}
                    alt={thumb.label}
                    className="w-full h-full object-cover rounded-[6px]"
                    loading="lazy"
                  />
                </motion.button>
              ))}
            </AnimatePresence>
          </div>

          <div className="pointer-events-auto flex items-center pb-1">
            <IconButton
              onClick={() => setLightboxOpen(true)}
              size="small"
              aria-label="View fullscreen"
              sx={{ 
                color: '#142218', p: 0.75, bgcolor: 'rgba(255,255,255,0.82)', backdropFilter: 'blur(8px)', 
                borderRadius: '8px', border: '1px solid rgba(255,255,255,0.68)', boxShadow: '0 1px 6px rgba(31,65,46,0.1)',
                transition: 'all 0.24s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': { bgcolor: '#FFFFFF', transform: 'scale(1.03)' } 
              }}
            >
              <ZoomOutMapIcon sx={{ fontSize: 16 }} />
            </IconButton>
          </div>
        </div>
      </div>

      <div className="px-2 pt-2">
        <h3 className="text-[14px] font-bold text-[#1A1F24] mb-3 tracking-tight animate-fade-blur-in opacity-0" style={{ animationDelay: '80ms' }}>
          Plot Availability
        </h3>
        
        <div 
          className="flex flex-col bg-[rgba(255,255,255,0.62)] backdrop-blur-[8px] rounded-[8px] border border-[rgba(255,255,255,0.68)] shadow-[0_1px_6px_rgba(31,65,46,0.08)] overflow-hidden animate-fade-blur-in opacity-0"
          style={{ animationDelay: '120ms' }}
        >
          {plotSizes.map((plot, i, arr) => (
            <div key={plot.size} className="group transition-colors duration-[240ms] ease-[cubic-bezier(0.4,0,0.2,1)] hover:bg-[rgba(255,255,255,0.74)] relative">
              <div className="flex items-center justify-between px-4 py-3.5 cursor-pointer relative z-20">
                <div>
                  <p className="text-[13px] font-bold text-[#142218] transition-colors duration-[240ms]">{plot.size} Plot</p>
                  <p className="text-[11px] font-medium text-[#5a665e] mt-0.5 transition-colors duration-[240ms] group-hover:text-[#46524a]">
                    ₹{plot.pricePerSqYd.toLocaleString('en-IN')} / Sq.Yd
                  </p>
                </div>
                <p className="text-[15px] font-bold text-[#2F6F4E] tracking-tight transition-transform duration-[240ms] group-hover:scale-[1.02]">
                  ₹{((plot.pricePerSqYd * plot.sqYd) / 100000).toFixed(1)}L
                </p>
              </div>
              {i < arr.length - 1 && (
                <div className="h-[1px] bg-gradient-to-r from-transparent via-[rgba(0,0,0,0.06)] to-transparent w-full" />
              )}
            </div>
          ))}
        </div>
      </div>

      <Dialog
        open={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{ 
          sx: { 
            bgcolor: 'transparent', 
            boxShadow: 'none', 
            m: 1, 
            overflow: 'visible' 
          } 
        }}
        aria-label="Layout image fullscreen view"
      >
        <div className="relative flex flex-col items-center justify-center w-full">
          <img
            src={layoutImages[imgIdx].src}
            alt={layoutImages[imgIdx].label}
            className="w-full max-h-[85vh] object-contain rounded-[8px] shadow-[0_16px_40px_rgba(0,0,0,0.4)]"
          />
          
          <IconButton
            onClick={() => setLightboxOpen(false)}
            size="small"
            aria-label="Close fullscreen"
            sx={{ 
              position: 'absolute', top: -14, right: -14, zIndex: 10,
              bgcolor: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(12px)',
              color: '#1A1F24', border: '1px solid rgba(255,255,255,0.6)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              '&:hover': { bgcolor: '#FFFFFF', transform: 'scale(1.05)' },
              transition: 'all 0.28s ease-out'
            }}
          >
            <CloseIcon sx={{ fontSize: 18 }} />
          </IconButton>

          <IconButton 
            onClick={prev} 
            sx={{ 
              position: 'absolute', left: -16, top: '50%', transform: 'translateY(-50%)',
              bgcolor: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(12px)',
              color: '#1A1F24', border: '1px solid rgba(255,255,255,0.6)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              '&:hover': { bgcolor: '#FFFFFF', transform: 'translateY(-50%) scale(1.05)' },
              transition: 'all 0.28s ease-out'
            }} 
            aria-label="Previous"
          >
            <NavigateBeforeIcon fontSize="medium" />
          </IconButton>
          <IconButton 
            onClick={next} 
            sx={{ 
              position: 'absolute', right: -16, top: '50%', transform: 'translateY(-50%)',
              bgcolor: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(12px)',
              color: '#1A1F24', border: '1px solid rgba(255,255,255,0.6)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              '&:hover': { bgcolor: '#FFFFFF', transform: 'translateY(-50%) scale(1.05)' },
              transition: 'all 0.28s ease-out'
            }} 
            aria-label="Next"
          >
            <NavigateNextIcon fontSize="medium" />
          </IconButton>

          <div className="absolute -bottom-12 left-0 right-0 flex justify-between items-center px-2">
            <span className="text-[#FFFFFF] text-[14px] font-semibold drop-shadow-md tracking-wide">
              {layoutImages[imgIdx].label}
            </span>
            <span className="text-[#FFFFFF] text-[12px] font-bold bg-[rgba(0,0,0,0.5)] border border-[rgba(255,255,255,0.2)] px-3 py-1 rounded-[8px] backdrop-blur-[8px]">
              {imgIdx + 1} / {layoutImages.length}
            </span>
          </div>
        </div>
      </Dialog>

      <div className="mt-4 pb-2">
        <AskSeller initialQuestions={layoutAskSellerQuestions} />
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fadeBlurIn { 
          from { opacity: 0; filter: blur(6px); transform: translateY(12px); } 
          to { opacity: 1; filter: blur(0px); transform: translateY(0); } 
        }
        .animate-fade-blur-in { animation: fadeBlurIn 0.28s cubic-bezier(0.4, 0, 0.2, 1) forwards; }
      `}} />
    </div>
  );
};

export default Layout;