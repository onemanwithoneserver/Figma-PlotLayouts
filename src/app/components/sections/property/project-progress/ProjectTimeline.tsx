import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { APPROVALS, CONSTRUCTION_STEPS, PROGRESS_PCT } from './data';

type DotStatus = 'done' | 'active' | 'upcoming';

function Dot({ status }: { status: DotStatus }) {
  const base = 'w-[18px] h-[18px] rounded-full border-[2px] border-white flex items-center justify-center flex-shrink-0';
  if (status === 'done')
    return (
      <div className={`${base} bg-[var(--text-primary)] shadow-sm`}>
        <div className="w-[7px] h-[7px] rounded-full bg-white" />
      </div>
    );
  if (status === 'active')
    return (
      <div className={`${base} bg-[var(--accent-primary)] shadow-[0_0_10px_rgba(31,122,92,0.35)]`}>
        <div className="w-[7px] h-[7px] rounded-full bg-white" />
      </div>
    );
  return (
    <div className={`${base} bg-white border-[var(--border-default)]`}>
      <div className="w-[7px] h-[7px] rounded-full bg-[var(--border-default)]" />
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

  useEffect(() => {
    setImageIndex(0);
  }, [activeStep]);

  const syncArrows = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 2);
    setCanRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 2);
  };

  useEffect(() => {
    if (!progressOpen) return;
    const el = scrollRef.current;
    if (!el) return;
    syncArrows();
    el.addEventListener('scroll', syncArrows, { passive: true });
    window.addEventListener('resize', syncArrows);
    return () => {
      el.removeEventListener('scroll', syncArrows);
      window.removeEventListener('resize', syncArrows);
    };
  }, [progressOpen]);

  const shift = (dir: 'left' | 'right') =>
    scrollRef.current?.scrollBy({ left: dir === 'left' ? -150 : 150, behavior: 'smooth' });

  const currentImages = CONSTRUCTION_STEPS[activeStep]?.images || [];

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (imageIndex < currentImages.length - 1) setImageIndex((prev) => prev + 1);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (imageIndex > 0) setImageIndex((prev) => prev - 1);
  };

  return (
    <section className="font-['Outfit',_sans-serif] w-full bg-white border-t border-[var(--border-subtle)]">
      {/* Progress Header — Glass accent */}
      <div className="bg-[var(--bg-section-light)] border-b-2 border-[var(--accent-primary)] px-4 pt-5 pb-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[15px] font-bold text-[var(--text-primary)] tracking-tight">Project Status</h3>
          <span className="text-[12px] font-black text-[var(--accent-primary)]">{PROGRESS_PCT}% Complete</span>
        </div>

        {/* Progress bar with gradient */}
        <div className="h-[6px] w-full rounded-full bg-[var(--accent-soft)] overflow-hidden mb-2.5">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${PROGRESS_PCT}%` }}
            transition={{ duration: 1.4, ease: [0.25, 1, 0.5, 1] }}
            className="h-full rounded-full"
            style={{ background: 'var(--gradient-accent)' }}
          />
        </div>
        <span className="text-[12px] font-bold text-[var(--accent-primary)]">Execution phase</span>
      </div>

      {/* Timeline */}
      <div className="bg-white px-4 py-6">
        <div className="relative ml-[7px] pl-6 border-l-2 border-[var(--border-default)] space-y-8 pb-1">
          
          {/* Node 1: Under development */}
          <div className="relative h-6 flex items-center">
            <div className="absolute -left-[35px] z-10"><Dot status="done" /></div>
            <p className="text-[13.5px] font-bold text-[var(--text-primary)]">Under development</p>
          </div>

          {/* Node 2: Final LP received + approvals */}
          <div className="relative flex flex-col gap-3">
            <div className="absolute -left-[35px] top-3 z-10"><Dot status="done" /></div>
            <p className="text-[13.5px] font-bold text-[var(--text-primary)]">Final LP received</p>
            
            <div className="flex flex-col gap-2">
              {APPROVALS.map((doc) => (
                <div key={doc.id} className="flex items-center justify-between bg-[var(--bg-section-light)] border border-[var(--border-subtle)] rounded-[var(--radius-sm)] px-3 py-2.5 hover:border-[var(--accent-border)] transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-[var(--radius-sm)] bg-white border border-[var(--border-default)] flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-[var(--accent-primary)]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zM6 20V4h7v5h5v11H6z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-[12px] font-bold text-[var(--text-primary)] leading-none mb-1">{doc.name}</p>
                      <p className="text-[11px] font-medium text-[var(--text-muted)] leading-none">{doc.date}</p>
                    </div>
                  </div>
                  <button className="compact-touch p-1.5 text-[#AAAAAA] hover:text-[var(--accent-primary)] transition-colors" aria-label={`View ${doc.name}`}>
                    <svg className="w-[17px] h-[17px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Node 3: Development phase — expandable */}
          <div className="relative">
            <div className="absolute -left-[35px] top-4 -translate-y-1/2 z-10"><Dot status="active" /></div>
            <div className="flex items-center justify-between mb-4">
              <p className="text-[13.5px] font-bold text-[var(--text-primary)]">Development phase</p>
              <button
                onClick={() => setProgressOpen((v) => !v)}
                className="compact-touch inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[var(--radius-sm)] border border-[var(--accent-primary)] bg-white text-[var(--accent-primary)] text-[11px] font-bold hover:bg-[var(--accent-primary)] hover:text-white transition-all shadow-sm"
                aria-expanded={progressOpen}
                aria-controls="construction-updates"
              >
                <svg className={`w-3 h-3 transition-transform ${progressOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                </svg>
                {progressOpen ? 'Close' : 'View updates'}
              </button>
            </div>

            <AnimatePresence>
              {progressOpen && (
                <motion.div
                  id="construction-updates"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="relative mt-2">
                    <button onClick={() => shift('left')} disabled={!canLeft} className={`compact-touch absolute left-0 top-0 z-20 h-10 w-8 flex items-center justify-start bg-gradient-to-r from-white to-transparent transition-opacity ${canLeft ? 'opacity-100' : 'opacity-0'}`} aria-label="Scroll left">
                      <div className="w-6 h-6 rounded-full bg-white border border-[var(--border-default)] flex items-center justify-center shadow-sm"><ChevronLeftIcon sx={{ fontSize: 16 }} /></div>
                    </button>
                    <button onClick={() => shift('right')} disabled={!canRight} className={`compact-touch absolute right-0 top-0 z-20 h-10 w-8 flex items-center justify-end bg-gradient-to-l from-white to-transparent transition-opacity ${canRight ? 'opacity-100' : 'opacity-0'}`} aria-label="Scroll right">
                      <div className="w-6 h-6 rounded-full bg-white border border-[var(--border-default)] flex items-center justify-center shadow-sm"><ChevronRightIcon sx={{ fontSize: 16 }} /></div>
                    </button>

                    <div ref={scrollRef} className="w-full overflow-x-auto pb-4 pt-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                      <div className="flex min-w-max items-start" role="tablist" aria-label="Construction steps">
                        {CONSTRUCTION_STEPS.map((item, idx) => {
                          const isActive = idx === activeStep;
                          return (
                            <button
                              key={item.id}
                              type="button"
                              role="tab"
                              aria-selected={isActive}
                              onClick={() => setActiveStep(idx)}
                              className="compact-touch relative min-w-[80px] flex-1 flex flex-col items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)]/40 rounded-[var(--radius-sm)]"
                            >
                              <span className={`text-[11px] mb-2.5 transition-colors ${isActive ? 'font-black text-[var(--accent-primary)]' : 'font-bold text-[#888]'}`}>
                                {item.date}
                              </span>
                              <div className="relative w-full flex justify-center items-center h-5">
                                <div className={`absolute w-full h-[2px] ${idx < activeStep ? 'bg-[var(--accent-primary)]' : 'bg-[var(--border-default)]'}`} />
                                <div className={`relative z-10 rounded-full border-2 transition-all duration-300 ${idx <= activeStep ? 'w-[10px] h-[10px] bg-[var(--accent-primary)] border-[var(--accent-primary)]' : 'w-[8px] h-[8px] bg-white border-[#D0D0D0]'} ${isActive ? 'scale-125 ring-4 ring-[var(--accent-primary)]/20' : ''}`} />
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <AnimatePresence mode="wait">
                      <motion.div key={activeStep} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="mt-2" role="tabpanel">
                        <p className="text-[12.5px] font-bold text-[var(--text-primary)] mb-3">{CONSTRUCTION_STEPS[activeStep].title}</p>
                        {currentImages.length > 0 ? (
                          <div className="relative w-full h-48 rounded-[var(--radius-sm)] overflow-hidden bg-[var(--bg-section-light)] border border-[var(--border-subtle)]">
                            <img src={currentImages[imageIndex]} alt={`${CONSTRUCTION_STEPS[activeStep].title} progress`} onClick={() => setZoomSrc(currentImages[imageIndex])} className="w-full h-full object-cover cursor-zoom-in" loading="lazy" />
                            {currentImages.length > 1 && (
                              <div className="absolute inset-0 flex items-center justify-between px-2">
                                <button onClick={prevImage} className="compact-touch w-8 h-8 rounded-[var(--radius-sm)] bg-white/90 shadow-md flex items-center justify-center" aria-label="Previous image"><ChevronLeftIcon sx={{ fontSize: 18 }} /></button>
                                <button onClick={nextImage} className="compact-touch w-8 h-8 rounded-[var(--radius-sm)] bg-white/90 shadow-md flex items-center justify-center" aria-label="Next image"><ChevronRightIcon sx={{ fontSize: 18 }} /></button>
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="py-10 bg-[var(--bg-section-light)] rounded-[var(--radius-sm)] text-center border-2 border-dashed border-[var(--border-subtle)]">
                            <p className="text-[12px] font-bold text-[#9CA3AF]">Images updating soon</p>
                          </div>
                        )}
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Node 4: Ready for registration */}
          <div className="relative h-6 flex items-center">
            <div className="absolute -left-[35px] z-10"><Dot status="upcoming" /></div>
            <p className="text-[13.5px] font-bold text-[#888888]">Ready for registration</p>
          </div>
        </div>
      </div>

      {/* Zoom lightbox */}
      <AnimatePresence>
        {zoomSrc && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setZoomSrc(null)} className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4" role="dialog" aria-label="Zoomed image">
            <motion.img initial={{ scale: 0.9 }} animate={{ scale: 1 }} src={zoomSrc} className="max-w-full max-h-[85vh] rounded-[var(--radius-sm)]" alt="Zoomed construction progress" />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ProjectTimeline;