import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import IconButton from '@mui/material/IconButton';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import HeadingIcon from '../shared/HeadingIcon';
import { APPROVALS, CONSTRUCTION_STEPS, PROGRESS_PCT } from './data';

type DotStatus = 'done' | 'active' | 'upcoming';

function Dot({ status }: { status: DotStatus }) {
  const base = 'w-[18px] h-[18px] rounded-full border-[2px] flex items-center justify-center flex-shrink-0 relative z-10 transition-all duration-300';
  
  if (status === 'done')
    return (
      <div className={`${base} bg-[#1A6B4A] border-white shadow-[0_2px_8px_rgba(26,107,74,0.2)]`}>
        <div className="w-[6px] h-[6px] rounded-full bg-white" />
      </div>
    );
  if (status === 'active')
    return (
      <div className={`${base} bg-white border-[#1A6B4A] shadow-[0_0_12px_rgba(26,107,74,0.3)] animate-pulse`}>
        <div className="w-[6px] h-[6px] rounded-full bg-[#1A6B4A]" />
      </div>
    );
  return (
    <div className={`${base} bg-white border-[#E2E8F0]`}>
      <div className="w-[6px] h-[6px] rounded-full bg-[#E2E8F0]" />
    </div>
  );
}

const ProjectTimeline: React.FC = () => {
  const [progressOpen, setProgressOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(1);
  const [zoomSrc, setZoomSrc] = useState<string | null>(null);
  const [imageIndex, setImageIndex] = useState(0);

  const scrollRef = useRef<HTMLDivElement>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);

  useEffect(() => { setImageIndex(0); }, [activeStep]);

  const syncArrows = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 2);
    setCanRight(Math.ceil(el.scrollLeft) < el.scrollWidth - el.clientWidth - 2);
  };

  useEffect(() => {
    if (!progressOpen) return;
    const el = scrollRef.current;
    if (!el) return;
    
    syncArrows();
    const timeout = setTimeout(syncArrows, 50); 

    el.addEventListener('scroll', syncArrows, { passive: true });
    window.addEventListener('resize', syncArrows);
    
    return () => {
      clearTimeout(timeout);
      el.removeEventListener('scroll', syncArrows);
      window.removeEventListener('resize', syncArrows);
    };
  }, [progressOpen]);

  const shift = (dir: 'left' | 'right') => {
    scrollRef.current?.scrollBy({ left: dir === 'left' ? -200 : 200, behavior: 'smooth' });
  };

  const arrowBtnStyles = {
    color: '#1A6B4A',
    backgroundColor: 'rgba(255,255,255,0.85)',
    backdropFilter: 'blur(4px)',
    boxShadow: '0 2px 8px rgba(26,107,74,0.15)',
    transition: 'all 0.2s ease-in-out',
    padding: '6px',
    '&:hover': {
      backgroundColor: '#ffffff',
      boxShadow: '0 4px 12px rgba(26,107,74,0.3)',
      transform: 'scale(1.05)',
    }
  };

  const currentImages = CONSTRUCTION_STEPS[activeStep]?.images || [];

  return (
    <section className="w-full font-inter bg-[#F5F7FA] p-4">
      {/* Dynamic Header */}
      <div className="flex items-center gap-2.5 px-4 pt-2 mb-1">
        <div className="w-8 h-8 rounded-[8px] bg-[#D4F5E7] border border-[#1A6B4A]/20 flex items-center justify-center">
          <HeadingIcon name="project-status" className="w-4 h-4 text-[#1A6B4A]" />
        </div>
        <h3 className="text-[15px] font-bold text-[#1A1A2E] tracking-tight">Project Progress</h3>
      </div>

      <div className="px-2 py-2 animate-fade-blur-in opacity-0" style={{ animationDelay: '40ms' }}>
        <div className="rounded-[8px] bg-[rgba(255,255,255,0.65)] backdrop-blur-[20px] border border-[rgba(255,255,255,0.6)] shadow-[0_8px_24px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.8)] px-4 py-4 overflow-hidden relative">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[13px] font-semibold text-[#4A5568]">Overall Completion</span>
            <span className="inline-flex items-center rounded-[8px] bg-[#D4F5E7] text-[#1A6B4A] px-2.5 py-1 text-[11px] font-bold">
              {PROGRESS_PCT}%
            </span>
          </div>

          <div className="relative h-[10px] w-full rounded-full bg-[rgba(0,0,0,0.05)] overflow-hidden mb-3">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${PROGRESS_PCT}%` }}
              transition={{ duration: 1.5, ease: [0.4, 0, 0.2, 1] }}
              className="h-full rounded-full bg-[#1A6B4A]"
            />
          </div>

          <div className="flex items-center justify-between text-[11px] tracking-wider font-bold">
            <span className="text-[#4A5568]">Execution Phase</span>
            <span className="text-[#1A6B4A]">on schedule</span>
          </div>
        </div>
      </div>

      <div className="px-5 py-2">
        <div className="relative ml-2 pl-7 border-l-[1.5px] border-[#E2E8F0] space-y-8 pb-4">
          
          <div className="relative animate-fade-blur-in opacity-0" style={{ animationDelay: '100ms' }}>
            <div className="absolute -left-[37px] top-1/2 -translate-y-1/2"><Dot status="done" /></div>
            <p className="text-[14px] font-bold text-[#1A1A2E] tracking-tight">Under development</p>
          </div>

          <div className="relative flex flex-col gap-4 animate-fade-blur-in opacity-0" style={{ animationDelay: '150ms' }}>
            <div className="absolute -left-[37px] top-2.5"><Dot status="done" /></div>
            <p className="text-[14px] font-bold text-[#1A1A2E] tracking-tight">Final LP received</p>
            <div className="flex flex-col gap-2">
              {APPROVALS.map((doc) => (
                <div key={doc.id} className="group flex items-center justify-between bg-white border border-[#E2E8F0] rounded-[8px] px-3 py-2.5 transition-colors cursor-pointer shadow-sm hover:shadow-md">
                   <div className="flex items-center gap-3 text-[#1A1A2E]">
                      <div className="w-8 h-8 rounded-[6px] bg-white border border-[#E2E8F0] flex items-center justify-center text-[#1A6B4A] group-hover:border-[#1A6B4A]/20 transition-colors">
                         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                      </div>
                      <span className="text-[12px] font-bold">{doc.name}</span>
                   </div>
                   <div className="flex items-center gap-3">
                     <span className="text-[10px] font-bold text-[#4A5568]">{doc.date}</span>
                     <div className="w-6 h-6 rounded-full flex items-center justify-center text-[#4A5568] bg-transparent group-hover:bg-[#1A6B4A]/10 group-hover:text-[#1A6B4A] transition-all">
                       <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                       </svg>
                     </div>
                   </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative animate-fade-blur-in opacity-0" style={{ animationDelay: '200ms' }}>
            <div className="absolute -left-[37px] top-4 -translate-y-1/2"><Dot status="active" /></div>
            <div className="flex items-center justify-between mb-4">
              <p className="text-[14px] font-bold text-[#1A1A2E] tracking-tight">Development phase</p>
              
              <button
                onClick={() => setProgressOpen((v) => !v)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-[8px] border border-[#1A6B4A]/30 bg-white/70 backdrop-blur-sm text-[#1A6B4A] text-[11px] font-bold shadow-sm transition-colors hover:bg-[#1A6B4A]/5"
              >
                <svg 
                  className={`w-3.5 h-3.5 transition-transform duration-300 ${progressOpen ? 'rotate-180' : ''}`} 
                  fill="none" viewBox="0 0 24 24" stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                </svg>
                {progressOpen ? 'Close' : 'View Updates'}
              </button>
            </div>

            <AnimatePresence>
              {progressOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="relative mt-2">
                    <div className="relative flex items-center mb-6">
                      
                      <div className={`absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-[rgba(255,255,255,0.95)] via-[rgba(255,255,255,0.75)] to-transparent z-20 flex items-center transition-opacity duration-300 pointer-events-none ${canLeft ? 'opacity-100' : 'opacity-0'}`}>
                        <div className="pointer-events-auto ml-1">
                          <IconButton
                            size="small"
                            onClick={() => shift('left')}
                            tabIndex={canLeft ? 0 : -1}
                            aria-label="Scroll timeline left"
                            sx={arrowBtnStyles}
                          >
                            <ArrowBackIosIcon sx={{ fontSize: 13, ml: '4px' }} />
                          </IconButton>
                        </div>
                      </div>
                      
                      <div ref={scrollRef} onScroll={syncArrows} className="flex-1 overflow-x-auto scrollbar-hide px-4 py-2">
                        <div className="flex min-w-max items-center relative px-2 h-10">
                          <div className="absolute top-1/2 -translate-y-1/2 left-4 right-4 h-[2px] bg-[#E2E8F0]" />
                          
                          <motion.div 
                            className="absolute top-1/2 -translate-y-1/2 left-4 h-[2px] bg-[#1A6B4A]"
                            animate={{ width: `calc(${(activeStep / (CONSTRUCTION_STEPS.length - 1)) * 100}% - 8px)` }}
                            transition={{ duration: 0.5 }}
                          />

                          {CONSTRUCTION_STEPS.map((item, idx) => (
                            <div key={item.id} className="relative flex flex-col items-center min-w-[80px]">
                              <span className={`text-[10px] font-bold mb-6 transition-colors ${idx === activeStep ? 'text-[#1A6B4A]' : 'text-[#4A5568]'}`}>
                                {item.date}
                              </span>
                              <button
                                onClick={() => setActiveStep(idx)}
                                className={`w-3 h-3 rounded-full border-2 transition-all relative z-10 ${idx <= activeStep ? 'bg-[#1A6B4A] border-[#1A6B4A]' : 'bg-white border-[#E2E8F0]'} ${idx === activeStep ? 'scale-125 ring-4 ring-[#1A6B4A]/10' : ''}`}
                              />
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className={`absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[rgba(255,255,255,0.95)] via-[rgba(255,255,255,0.75)] to-transparent z-20 flex items-center justify-end transition-opacity duration-300 pointer-events-none ${canRight ? 'opacity-100' : 'opacity-0'}`}>
                        <div className="pointer-events-auto mr-1">
                          <IconButton
                            size="small"
                            onClick={() => shift('right')}
                            tabIndex={canRight ? 0 : -1}
                            aria-label="Scroll timeline right"
                            sx={arrowBtnStyles}
                          >
                            <ArrowForwardIosIcon sx={{ fontSize: 13 }} />
                          </IconButton>
                        </div>
                      </div>
                    </div>

                    <motion.div key={activeStep} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white rounded-[8px] p-3 border border-[#E2E8F0] shadow-inner">
                      <p className="text-[12px] font-bold text-[#1A1A2E] mb-3">{CONSTRUCTION_STEPS[activeStep].title}</p>
                      {currentImages.length > 0 ? (
                        <div className="relative aspect-video rounded-[8px] overflow-hidden bg-white shadow group">
                          <img src={currentImages[imageIndex]} alt="Progress" onClick={() => setZoomSrc(currentImages[imageIndex])} className="w-full h-full object-cover cursor-zoom-in transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                          {currentImages.length > 1 && (
                            <div className="absolute bottom-2 right-2 flex gap-1.5">
                                <IconButton size="small" onClick={(e) => { e.stopPropagation(); if(imageIndex > 0) setImageIndex(i => i - 1); }} sx={arrowBtnStyles} disabled={imageIndex === 0}>
                                  <ChevronLeftIcon sx={{ fontSize: 16 }} />
                                </IconButton>
                                <IconButton size="small" onClick={(e) => { e.stopPropagation(); if(imageIndex < currentImages.length - 1) setImageIndex(i => i + 1); }} sx={arrowBtnStyles} disabled={imageIndex === currentImages.length - 1}>
                                  <ChevronRightIcon sx={{ fontSize: 16 }} />
                                </IconButton>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="py-10 text-center border border-dashed border-[#E2E8F0] rounded-[8px]">
                          <p className="text-[11px] font-bold text-[#4A5568]">Photo update soon</p>
                        </div>
                      )}
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="relative animate-fade-blur-in opacity-0" style={{ animationDelay: '250ms' }}>
            <div className="absolute -left-[37px] top-1/2 -translate-y-1/2"><Dot status="upcoming" /></div>
            <p className="text-[14px] font-bold text-[#4A5568] tracking-tight">Ready for registration</p>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {zoomSrc && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setZoomSrc(null)} className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4">
            <motion.img initial={{ scale: 0.9 }} animate={{ scale: 1 }} src={zoomSrc} className="max-w-full max-h-[85vh] rounded-[8px]" />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ProjectTimeline;