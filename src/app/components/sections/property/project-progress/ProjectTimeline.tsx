import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { APPROVALS, CONSTRUCTION_STEPS, PROGRESS_PCT } from './data';

type DotStatus = 'done' | 'active' | 'upcoming';

function Dot({ status }: { status: DotStatus }) {
  const base = 'w-[18px] h-[18px] rounded-full border-[2px] border-[var(--color-bg-white)] flex items-center justify-center flex-shrink-0';
  if (status === 'done')
    return (
      <div className={`${base} bg-[var(--color-text-primary)] shadow-sm`}>
        <div className="w-[7px] h-[7px] rounded-full bg-[var(--color-bg-white)]" />
      </div>
    );
  if (status === 'active')
    return (
      <div className={`${base} bg-[var(--color-accent)] shadow-[0_0_10px_var(--color-glow)]`}>
        <div className="w-[7px] h-[7px] rounded-full bg-[var(--color-bg-white)]" />
      </div>
    );
  return (
    <div className={`${base} bg-[var(--color-bg-white)] border-[var(--color-border)]`}>
      <div className="w-[7px] h-[7px] rounded-full bg-[var(--color-border)]" />
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
    <section className="font-outfit w-full bg-[var(--color-bg-white)] border-t border-[var(--color-border)]">
      <div className="px-1 pt-1 pb-1 border-b border-[var(--color-border)] bg-gradient-to-b from-[var(--color-bg-main)] to-[var(--color-bg-white)]">
        <div className="rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[rgba(255,255,255,0.9)] shadow-[0_6px_20px_rgba(10,26,16,0.05)] px-3.5 py-3.5">
          <div className="flex items-start justify-between gap-2 mb-3">
            <div>
              <h3 className="text-[16px] font-extrabold text-[var(--color-text-primary)] tracking-tight leading-none">Project Status</h3>
            </div>
            <span className="inline-flex items-center rounded-[var(--radius-sm)] border border-[var(--color-border-hover)] bg-[var(--color-bg-soft)] px-2.5 py-1 text-[11px] font-black text-[var(--color-accent)] leading-none whitespace-nowrap">
              {PROGRESS_PCT}% Complete
            </span>
          </div>

          <div className="relative h-[8px] w-full rounded-full bg-[var(--color-bg-soft)] overflow-hidden mb-2.5">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${PROGRESS_PCT}%` }}
              transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1] }}
              className="h-full rounded-full"
              style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-accent))' }}
            />
            <motion.span
              initial={{ left: 0 }}
              animate={{ left: `calc(${PROGRESS_PCT}% - 10px)` }}
              transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1] }}
              className="absolute top-1/2 -translate-y-1/2 w-5 h-5 rounded-full border-2 border-[var(--color-bg-white)] bg-[var(--color-accent)] shadow-[0_2px_10px_var(--color-glow)]"
              aria-hidden="true"
            />
          </div>

          <div className="flex items-center justify-between">
            <span className="text-[12px] font-bold text-[var(--color-accent)]">Execution phase</span>
            <span className="text-[11px] font-semibold text-[var(--color-text-muted)]">On schedule</span>
          </div>
        </div>
      </div>

      <div className="bg-[var(--color-bg-white)] px-4 py-6">
        <div className="relative ml-[7px] pl-6 border-l-2 border-[var(--color-border)] space-y-8 pb-1">

          <div className="relative h-6 flex items-center">
            <div className="absolute -left-[35px] z-10"><Dot status="done" /></div>
            <p className="text-[13.5px] font-bold text-[var(--color-text-primary)]">Under development</p>
          </div>

          <div className="relative flex flex-col gap-3">
            <div className="absolute -left-[35px] top-3 z-10"><Dot status="done" /></div>
            <p className="text-[13.5px] font-bold text-[var(--color-text-primary)]">Final LP received</p>

            <div className="flex flex-col gap-2">
              {APPROVALS.map((doc) => (
                <div key={doc.id} className="flex items-center justify-between bg-[var(--color-bg-main)] border border-[var(--color-border)] rounded-[var(--radius-sm)] px-3 py-2.5 hover:border-[var(--color-border-hover)] transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-[var(--radius-sm)] bg-[var(--color-bg-white)] border border-[var(--color-border)] flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-[var(--color-accent)]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zM6 20V4h7v5h5v11H6z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-[12px] font-bold text-[var(--color-text-primary)] leading-none mb-1">{doc.name}</p>
                      <p className="text-[11px] font-medium text-[var(--color-text-muted)] leading-none">{doc.date}</p>
                    </div>
                  </div>
                  <button className="compact-touch p-1.5 text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors" aria-label={`View ${doc.name}`}>
                    <svg className="w-[17px] h-[17px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-[35px] top-4 -translate-y-1/2 z-10"><Dot status="active" /></div>
            <div className="flex items-center justify-between mb-4">
              <p className="text-[13.5px] font-bold text-[var(--color-text-primary)]">Development phase</p>
              <button
                onClick={() => setProgressOpen((v) => !v)}
                className="compact-touch inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[var(--radius-sm)] border border-[var(--color-accent)] bg-[var(--color-bg-white)] text-[var(--color-accent)] text-[11px] font-bold hover:bg-[var(--color-accent)] hover:text-white transition-all shadow-sm"
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
                    <button onClick={() => shift('left')} disabled={!canLeft} className={`compact-touch absolute left-0 top-0 z-20 h-10 w-8 flex items-center justify-start bg-gradient-to-r from-[var(--color-bg-white)] to-transparent transition-opacity ${canLeft ? 'opacity-100' : 'opacity-0'}`} aria-label="Scroll left">
                      <div className="w-6 h-6 rounded-full bg-[var(--color-bg-white)] border border-[var(--color-border)] flex items-center justify-center shadow-sm"><ChevronLeftIcon sx={{ fontSize: 16 }} /></div>
                    </button>
                    <button onClick={() => shift('right')} disabled={!canRight} className={`compact-touch absolute right-0 top-0 z-20 h-10 w-8 flex items-center justify-end bg-gradient-to-l from-[var(--color-bg-white)] to-transparent transition-opacity ${canRight ? 'opacity-100' : 'opacity-0'}`} aria-label="Scroll right">
                      <div className="w-6 h-6 rounded-full bg-[var(--color-bg-white)] border border-[var(--color-border)] flex items-center justify-center shadow-sm"><ChevronRightIcon sx={{ fontSize: 16 }} /></div>
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
                              onClick={() => setActiveStep(idx)}
                              className="compact-touch relative min-w-[80px] flex-1 flex flex-col items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]/40 rounded-[var(--radius-sm)]"
                            >
                              <span className={`text-[11px] mb-2.5 transition-colors ${isActive ? 'font-black text-[var(--color-accent)]' : 'font-bold text-[var(--color-text-muted)]'}`}>
                                {item.date}
                              </span>
                              <div className="relative w-full flex justify-center items-center h-5">
                                <div className={`absolute w-full h-[2px] ${idx < activeStep ? 'bg-[var(--color-accent)]' : 'bg-[var(--color-border)]'}`} />
                                <div className={`relative z-10 rounded-full border-2 transition-all duration-300 ${idx <= activeStep ? 'w-[10px] h-[10px] bg-[var(--color-accent)] border-[var(--color-accent)]' : 'w-[8px] h-[8px] bg-[var(--color-bg-white)] border-[var(--color-bg-mid)]'} ${isActive ? 'scale-125 ring-4 ring-[var(--color-accent)]/20' : ''}`} />
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <AnimatePresence mode="wait">
                      <motion.div key={activeStep} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="mt-2" role="tabpanel">
                        <p className="text-[12.5px] font-bold text-[var(--color-text-primary)] mb-3">{CONSTRUCTION_STEPS[activeStep].title}</p>
                        {currentImages.length > 0 ? (
                          <div className="relative w-full h-48 rounded-[var(--radius-sm)] overflow-hidden bg-[var(--color-bg-main)] border border-[var(--color-border)]">
                            <img src={currentImages[imageIndex]} alt={`${CONSTRUCTION_STEPS[activeStep].title} progress`} onClick={() => setZoomSrc(currentImages[imageIndex])} className="w-full h-full object-cover cursor-zoom-in" loading="lazy" />
                            {currentImages.length > 1 && (
                              <div className="absolute inset-0 flex items-center justify-between px-2">
                                <button onClick={prevImage} className="compact-touch w-8 h-8 rounded-[var(--radius-sm)] bg-[rgba(255,255,255,0.9)] shadow-[var(--glass-shadow)] flex items-center justify-center" aria-label="Previous image"><ChevronLeftIcon sx={{ fontSize: 18 }} /></button>
                                <button onClick={nextImage} className="compact-touch w-8 h-8 rounded-[var(--radius-sm)] bg-[rgba(255,255,255,0.9)] shadow-[var(--glass-shadow)] flex items-center justify-center" aria-label="Next image"><ChevronRightIcon sx={{ fontSize: 18 }} /></button>
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="py-10 bg-[var(--color-bg-main)] rounded-[var(--radius-sm)] text-center border-2 border-dashed border-[var(--color-border)]">
                            <p className="text-[12px] font-bold text-[var(--color-text-muted)]">Images updating soon</p>
                          </div>
                        )}
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="relative h-6 flex items-center">
            <div className="absolute -left-[35px] z-10"><Dot status="upcoming" /></div>
            <p className="text-[13.5px] font-bold text-[var(--color-text-muted)]">Ready for registration</p>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {zoomSrc && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setZoomSrc(null)} className="fixed inset-0 z-[100] flex items-center justify-center bg-[rgba(0,0,0,0.95)] p-4" role="dialog" aria-label="Zoomed image">
            <motion.img initial={{ scale: 0.9 }} animate={{ scale: 1 }} src={zoomSrc} className="max-w-full max-h-[85vh] rounded-[var(--radius-sm)]" alt="Zoomed construction progress" />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ProjectTimeline;