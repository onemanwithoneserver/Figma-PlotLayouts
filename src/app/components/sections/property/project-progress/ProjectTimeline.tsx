import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import IconButton from '@mui/material/IconButton';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { APPROVALS, CONSTRUCTION_STEPS, PROGRESS_PCT } from './data';

type DotStatus = 'done' | 'active' | 'upcoming';

function Dot({ status }: { status: DotStatus }) {
  const base = 'w-[18px] h-[18px] rounded-full border-[2px] flex items-center justify-center flex-shrink-0 relative z-10 transition-all duration-300';
  
  if (status === 'done')
    return (
      <div className={`${base} bg-[#2F6F4E] border-white shadow-[0_2px_8px_rgba(47,111,78,0.2)]`}>
        <div className="w-[6px] h-[6px] rounded-full bg-white" />
      </div>
    );
  if (status === 'active')
    return (
      <div className={`${base} bg-white border-[#2F6F4E] shadow-[0_0_12px_rgba(47,111,78,0.3)] animate-pulse`}>
        <div className="w-[6px] h-[6px] rounded-full bg-[#2F6F4E]" />
      </div>
    );
  return (
    <div className={`${base} bg-white border-[rgba(0,0,0,0.1)]`}>
      <div className="w-[6px] h-[6px] rounded-full bg-[rgba(0,0,0,0.1)]" />
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

  const currentImages = CONSTRUCTION_STEPS[activeStep]?.images || [];

  const arrowBtnStyles = {
    color: '#2F6F4E',
    backgroundColor: 'rgba(255,255,255,0.85)',
    backdropFilter: 'blur(4px)',
    boxShadow: '0 2px 8px rgba(47,111,78,0.15)',
    transition: 'all 0.2s ease-in-out',
    padding: '6px',
    '&:hover': {
      backgroundColor: '#ffffff',
      boxShadow: '0 4px 12px rgba(47,111,78,0.3)',
      transform: 'scale(1.05)',
    },
    '&:focus-visible': {
      outline: '2px solid #2F6F4E',
      outlineOffset: '2px',
    }
  };

  return (
    <section className="w-full font-inter">
      <div className="px-3 py-4 animate-fade-blur-in opacity-0" style={{ animationDelay: '40ms' }}>
        <div className="rounded-[8px] bg-[rgba(255,255,255,0.65)] backdrop-blur-[20px] border border-[rgba(255,255,255,0.6)] shadow-[0_8px_24px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.8)] px-4 py-4 overflow-hidden relative">
           <div className="absolute top-0 -left-[100%] w-[50%] h-full bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.3)] to-transparent skew-x-[-20deg] transition-all duration-[800ms] ease-in-out group-hover:left-[200%] pointer-events-none" />

          <div className="flex items-center justify-between mb-4">
            <span className="text-[14px] font-bold text-[#1A1F24] tracking-tight">Timeline Progress</span>
            <span className="inline-flex items-center rounded-[8px] bg-[rgba(47,111,78,0.1)] border border-[rgba(47,111,78,0.15)] px-3 py-1 text-[12px] font-bold text-[#2F6F4E]">
              {PROGRESS_PCT}% Complete
            </span>
          </div>

          <div className="relative h-[10px] w-full rounded-full bg-[rgba(0,0,0,0.05)] overflow-hidden mb-3 shadow-inner">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${PROGRESS_PCT}%` }}
              transition={{ duration: 1.5, ease: [0.4, 0, 0.2, 1] }}
              className="h-full rounded-full relative"
              style={{ background: 'linear-gradient(90deg, #2F6F4E, #4A90E2)' }}
            >
                <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.15)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.15)_50%,rgba(255,255,255,0.15)_75%,transparent_75%,transparent)] bg-[length:20px_20px] animate-[progress-stripe_2s_linear_infinite]" />
            </motion.div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-[12px] font-semibold text-[#4A5560]">Execution Phase</span>
            <span className="text-[12px] font-bold text-[#2F6F4E] ">on schedule</span>
          </div>
        </div>
      </div>

      <div className="px-5 py-2">
        <div className="relative ml-2 pl-7 border-l-[1.5px] border-[rgba(0,0,0,0.1)] space-y-8 pb-4">
          
          <div className="relative animate-fade-blur-in opacity-0" style={{ animationDelay: '100ms' }}>
            <div className="absolute -left-[37px] top-1/2 -translate-y-1/2"><Dot status="done" /></div>
            <p className="text-[14px] font-bold text-[#1A1F24] tracking-tight">Under development</p>
          </div>

          <div className="relative flex flex-col gap-4 animate-fade-blur-in opacity-0" style={{ animationDelay: '150ms' }}>
            <div className="absolute -left-[37px] top-2.5"><Dot status="done" /></div>
            <p className="text-[14px] font-bold text-[#1A1F24] tracking-tight">Final LP received</p>

            <div className="flex flex-col gap-2.5">
              {APPROVALS.map((doc) => (
                <div key={doc.id} className="group flex items-center justify-between bg-[rgba(255,255,255,0.65)] backdrop-blur-[12px] border border-[rgba(255,255,255,0.6)] rounded-[8px] px-3.5 py-3 shadow-sm hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)] hover:bg-[rgba(255,255,255,0.85)] transition-all duration-[280ms]">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-[8px] bg-white border border-[rgba(0,0,0,0.06)] flex items-center justify-center flex-shrink-0 text-[#2F6F4E] group-hover:scale-110 transition-transform">
                       <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                    </div>
                    <div>
                      <p className="text-[13px] font-bold text-[#1A1F24] leading-none mb-1 tracking-tight">{doc.name}</p>
                      <p className="text-[11px] font-medium text-[#6B7280]">{doc.date}</p>
                    </div>
                  </div>
                  <button className="w-8 h-8 rounded-full flex items-center justify-center text-[#6B7280] hover:bg-[rgba(47,111,78,0.1)] hover:text-[#2F6F4E] transition-all">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="relative animate-fade-blur-in opacity-0" style={{ animationDelay: '200ms' }}>
            <div className="absolute -left-[37px] top-4 -translate-y-1/2"><Dot status="active" /></div>
            <div className="flex items-center justify-between mb-4">
              <p className="text-[14px] font-bold text-[#1A1F24] tracking-tight">Development phase</p>
              <button
                onClick={() => setProgressOpen((v) => !v)}
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-[8px] border border-[rgba(47,111,78,0.3)] bg-white text-[#2F6F4E] text-[12px] font-bold hover:bg-[#2F6F4E] hover:text-white transition-all shadow-sm active:scale-95"
              >
                <svg className={`w-3.5 h-3.5 transition-transform duration-300 ${progressOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                  transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                  className="overflow-hidden"
                >
                  <div className="relative mt-2">
                    
                    <div className="relative flex items-center group mb-4">
                      
                      <div className={`absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-white via-white/80 to-transparent z-20 flex items-center transition-all duration-300 pointer-events-none ${canLeft ? 'opacity-100' : 'opacity-0'}`}>
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

                      <div ref={scrollRef} className="flex-1 overflow-x-auto pb-2 scrollbar-hide px-4 relative z-10">
                        <div className="flex min-w-max items-center relative px-4 h-6">
                          
                          <div className="absolute top-1/2 -translate-y-1/2 left-4 right-4 h-[2px] bg-[rgba(0,0,0,0.1)] z-0 rounded-full" />
                          
                          <div 
                            className="absolute top-1/2 -translate-y-1/2 left-4 h-[2px] bg-[#2F6F4E] z-0 transition-all duration-500 ease-out rounded-full shadow-[0_0_8px_rgba(47,111,78,0.4)]"
                            style={{ 
                                width: `calc(${CONSTRUCTION_STEPS.length > 1 ? (activeStep / (CONSTRUCTION_STEPS.length - 1)) * 100 : 0}% - 32px)`
                            }} 
                          />

                          {CONSTRUCTION_STEPS.map((item, idx) => (
                            <div key={item.id} className="relative flex justify-center items-center min-w-[80px] h-full">
                              <span className={`absolute bottom-full mb-2 text-[11px] font-bold transition-colors whitespace-nowrap ${idx === activeStep ? 'text-[#2F6F4E] scale-105' : 'text-[#6B7280] opacity-60'}`}>
                                {item.date}
                              </span>
                              <button
                                onClick={() => setActiveStep(idx)}
                                aria-label={`View step ${idx + 1}`}
                                className={`relative z-10 w-3 h-3 rounded-full border-2 outline-none focus-visible:ring-2 focus-visible:ring-[#2F6F4E] focus-visible:ring-offset-2 transition-all duration-300 ${idx === activeStep ? 'scale-105' : 'opacity-60 hover:opacity-100'} ${idx <= activeStep ? 'bg-[#2F6F4E] border-[#2F6F4E]' : 'bg-white border-[rgba(0,0,0,0.25)]'} ${idx === activeStep ? 'ring-4 ring-[rgba(47,111,78,0.2)] bg-white border-[3px]' : ''}`}
                              />
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className={`absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-white via-white/80 to-transparent z-20 flex items-center justify-end transition-all duration-300 pointer-events-none ${canRight ? 'opacity-100' : 'opacity-0'}`}>
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

                    <motion.div key={activeStep} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-[rgba(255,255,255,0.4)] rounded-[8px] p-2 border border-[rgba(0,0,0,0.05)]">
                      <p className="text-[13px] font-bold text-[#1A1F24] mb-3 tracking-tight px-1">{CONSTRUCTION_STEPS[activeStep].title}</p>
                      {currentImages.length > 0 ? (
                        <div className="relative w-full aspect-video rounded-[8px] overflow-hidden bg-white shadow-inner group">
                          <img src={currentImages[imageIndex]} alt="Progress" onClick={() => setZoomSrc(currentImages[imageIndex])} className="w-full h-full object-cover cursor-zoom-in transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                          {currentImages.length > 1 && (
                            <div className="absolute bottom-3 right-3 flex gap-2">
                                <button onClick={(e) => { e.stopPropagation(); if(imageIndex > 0) setImageIndex(i => i - 1); }} disabled={imageIndex === 0} className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-md shadow-lg flex items-center justify-center text-[#1A1F24] transition-opacity hover:bg-white disabled:opacity-40 disabled:cursor-not-allowed"><ChevronLeftIcon sx={{ fontSize: 18 }} /></button>
                                <button onClick={(e) => { e.stopPropagation(); if(imageIndex < currentImages.length -1) setImageIndex(i => i + 1); }} disabled={imageIndex === currentImages.length - 1} className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-md shadow-lg flex items-center justify-center text-[#1A1F24] transition-opacity hover:bg-white disabled:opacity-40 disabled:cursor-not-allowed"><ChevronRightIcon sx={{ fontSize: 18 }} /></button>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="py-12 bg-white/50 rounded-[8px] text-center border-2 border-dashed border-[rgba(0,0,0,0.1)]">
                          <p className="text-[12px] font-bold text-[#6B7280]">Updates scheduled soon</p>
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
            <p className="text-[14px] font-bold text-[#6B7280] tracking-tight">Ready for registration</p>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {zoomSrc && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setZoomSrc(null)} className="fixed inset-0 z-[100] flex items-center justify-center bg-[rgba(26,31,36,0.95)] backdrop-blur-md p-4">
            <motion.img initial={{ scale: 0.9, rotateX: 20 }} animate={{ scale: 1, rotateX: 0 }} src={zoomSrc} className="max-w-full max-h-[85vh] rounded-[8px] shadow-2xl" />
          </motion.div>
        )}
      </AnimatePresence>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fadeBlurIn { 
          from { opacity: 0; filter: blur(6px); transform: translateY(12px); } 
          to { opacity: 1; filter: blur(0px); transform: translateY(0); } 
        }
        @keyframes progress-stripe {
          from { background-position: 0 0; }
          to { background-position: 20px 0; }
        }
        .animate-fade-blur-in { animation: fadeBlurIn 0.28s cubic-bezier(0.4, 0, 0.2, 1) forwards; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </section>
  );
};

export default ProjectTimeline;