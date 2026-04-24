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
      {/* Glass Carousel Container */}
      <div 
        className="relative w-full rounded-[8px] overflow-hidden bg-[rgba(255,255,255,0.4)] border border-[rgba(255,255,255,0.6)] shadow-[0_8px_24px_rgba(0,0,0,0.08)] animate-fade-blur-in opacity-0"
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

        {/* Index Pill */}
        <div className="absolute top-3 right-3 z-20">
          <div className="bg-[rgba(255,255,255,0.85)] backdrop-blur-[12px] text-[#1A1F24] text-[11px] font-bold px-3 py-1.5 rounded-[8px] shadow-[0_2px_8px_rgba(0,0,0,0.1)] border border-[rgba(255,255,255,0.6)]">
            {imgIdx + 1} / {layoutImages.length}
          </div>
        </div>

        {/* Navigation Arrows */}
        {layoutImages.length > 1 && (
          <>
            <IconButton
              onClick={prev}
              size="small"
              aria-label="Previous image"
              sx={{ 
                position: 'absolute', left: 8, top: '50%', transform: 'translateY(-50%)', 
                bgcolor: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(12px)', color: '#1A1F24', 
                border: '1px solid rgba(255,255,255,0.6)', borderRadius: '8px', p: 0.5, zIndex: 10, 
                boxShadow: '0 4px 12px rgba(0,0,0,0.08)', transition: 'all 0.28s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': { bgcolor: '#FFFFFF', transform: 'translateY(-50%) scale(1.05)', boxShadow: '0 8px 24px rgba(0,0,0,0.12)' } 
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
                bgcolor: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(12px)', color: '#1A1F24', 
                border: '1px solid rgba(255,255,255,0.6)', borderRadius: '8px', p: 0.5, zIndex: 10, 
                boxShadow: '0 4px 12px rgba(0,0,0,0.08)', transition: 'all 0.28s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': { bgcolor: '#FFFFFF', transform: 'translateY(-50%) scale(1.05)', boxShadow: '0 8px 24px rgba(0,0,0,0.12)' } 
              }}
            >
              <NavigateNextIcon sx={{ fontSize: 20 }} />
            </IconButton>
          </>
        )}

        {/* Bottom Fade for Thumbs Visibility */}
        <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-[rgba(0,0,0,0.6)] to-transparent z-10 pointer-events-none" />

        {/* Thumbs & Fullscreen */}
        <div className="absolute bottom-3 left-0 right-0 flex items-end justify-between px-3 z-20 pointer-events-none">
          <div className="w-8" /> {/* Spacer */}

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
                    scale: thumb.isCenter ? 1.05 : 0.9,
                  }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                  className={`relative flex-shrink-0 rounded-[8px] overflow-hidden transition-all duration-[280ms] focus:outline-none ${
                    thumb.isCenter
                      ? 'w-[48px] h-[48px] border-[2px] border-[#2F6F4E] z-10 shadow-[0_4px_12px_rgba(0,0,0,0.3)] bg-white p-[2px]'
                      : 'w-[40px] h-[40px] border border-[rgba(255,255,255,0.6)] hover:opacity-100 hover:scale-100'
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
                color: '#1A1F24', p: 0.75, bgcolor: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(12px)', 
                borderRadius: '8px', border: '1px solid rgba(255,255,255,0.6)', boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                transition: 'all 0.28s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': { bgcolor: '#FFFFFF', transform: 'scale(1.05)' } 
              }}
            >
              <ZoomOutMapIcon sx={{ fontSize: 16 }} />
            </IconButton>
          </div>
        </div>
      </div>

      <div className="px-2 py-4">
        <h3 className="text-[14px] font-bold text-[#1A1F24] mb-3 tracking-tight animate-fade-blur-in opacity-0" style={{ animationDelay: '80ms' }}>
          Plot Availability
        </h3>
        
        {/* Glass List Container */}
        <div 
          className="flex flex-col bg-[rgba(255,255,255,0.65)] backdrop-blur-[20px] rounded-[8px] border border-[rgba(255,255,255,0.6)] shadow-[0_4px_12px_rgba(0,0,0,0.04),inset_0_1px_0_rgba(255,255,255,0.8)] overflow-hidden animate-fade-blur-in opacity-0"
          style={{ animationDelay: '120ms' }}
        >
          {plotSizes.map((plot, i, arr) => (
            <div key={plot.size} className="group transition-colors duration-[280ms] ease-[cubic-bezier(0.4,0,0.2,1)] hover:bg-[rgba(255,255,255,0.85)] relative">
              {/* Light Sweep Effect on Hover */}
              <div className="absolute top-0 -left-[100%] w-[50%] h-full bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.4)] to-transparent skew-x-[-20deg] transition-all duration-[600ms] ease-in-out group-hover:left-[200%] pointer-events-none z-10" />

              <div className="flex items-center justify-between px-4 py-3.5 cursor-pointer relative z-20">
                <div>
                  <p className="text-[13px] font-bold text-[#1A1F24] transition-colors duration-[280ms]">{plot.size} Plot</p>
                  <p className="text-[11px] font-medium text-[#6B7280] mt-0.5 transition-colors duration-[280ms] group-hover:text-[#4A5560]">
                    ₹{plot.pricePerSqYd.toLocaleString('en-IN')} / Sq.Yd
                  </p>
                </div>
                <p className="text-[15px] font-bold text-[#2F6F4E] tracking-tight transition-transform duration-[280ms] group-hover:scale-105">
                  ₹{((plot.pricePerSqYd * plot.sqYd) / 100000).toFixed(1)}L
                </p>
              </div>
              {i < arr.length - 1 && (
                <div className="h-[1px] bg-gradient-to-r from-transparent via-[rgba(0,0,0,0.06)] to-transparent w-full" />
              )}
            </div>
          ))}
        </div>

        {/* CTA Button using Highlight Color */}
        <div className="animate-fade-blur-in opacity-0" style={{ animationDelay: '160ms' }}>
        </div>
      </div>

      {/* Lightbox Dialog */}
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

      <div className="mt-4 pb-6">
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