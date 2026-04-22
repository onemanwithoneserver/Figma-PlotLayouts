import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import HeadingIcon from '../shared/HeadingIcon';
import { APPROVALS, CONSTRUCTION_STEPS, PROGRESS_PCT } from './data';

type DotStatus = 'done' | 'active' | 'upcoming';

function Dot({ status }: { status: DotStatus }) {
  const base = 'w-[18px] h-[18px] rounded-full border-[2px] border-[#ffffff] flex items-center justify-center flex-shrink-0';
  if (status === 'done')
    return (
      <div className={`${base} bg-[#0B1F17] shadow-sm`}>
        <div className="w-[7px] h-[7px] rounded-full bg-[#ffffff]" />
      </div>
    );
  if (status === 'active')
    return (
      <div className={`${base} bg-[#15653A] shadow-[0_0_10px_rgba(21,101,58,0.4)]`}>
        <div className="w-[7px] h-[7px] rounded-full bg-[#ffffff]" />
      </div>
    );
  return (
    <div className={`${base} bg-[#ffffff] border-[#C8DBCF]`}>
      <div className="w-[7px] h-[7px] rounded-full bg-[#C8DBCF]" />
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
    <section className="font-outfit w-full bg-[#ffffff] border-t border-[#C8DBCF]">
      <div className="section-heading-row">
        <div className="section-heading-left">
          <HeadingIcon name="project-status" />
          <h3 className="section-heading-text">Project Status</h3>
        </div>
      </div>

      <div className="px-1 pt-1 pb-1 bg-[#ffffff]">
        <div className="rounded-[4px] border border-[#C8DBCF] bg-[rgba(255,255,255,0.9)] shadow-[0_6px_20px_rgba(10,26,16,0.05)] px-3.5 py-3.5">
          <div className="flex items-start justify-end gap-2 mb-3">
            <span className="inline-flex items-center rounded-[4px] border border-[#15653A] bg-[#EEF4F0] px-2.5 py-1 text-[11px] font-black text-[#15653A] leading-none whitespace-nowrap">
              {PROGRESS_PCT}% Complete
            </span>
          </div>

          <div className="relative h-[8px] w-full rounded-full bg-[#EEF4F0] overflow-hidden mb-2.5">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${PROGRESS_PCT}%` }}
              transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1] }}
              className="h-full rounded-full"
              style={{ background: 'linear-gradient(135deg, #15653A, #2F7D4E)' }}
            />
            <motion.span
              initial={{ left: 0 }}
              animate={{ left: `calc(${PROGRESS_PCT}% - 10px)` }}
              transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1] }}
              className="absolute top-1/2 -translate-y-1/2 w-5 h-5 rounded-full border-2 border-[#ffffff] bg-[#15653A] shadow-[0_2px_10px_rgba(21,101,58,0.4)]"
              aria-hidden="true"
            />
          </div>

          <div className="flex items-center justify-between">
            <span className="text-[12px] font-bold text-[#15653A]">Execution phase</span>
            <span className="text-[11px] font-semibold text-[#64786D]">On schedule</span>
          </div>
        </div>
      </div>

      <div className="bg-[#ffffff] px-4 py-6">
        <div className="relative ml-[7px] pl-6 border-l-2 border-[#C8DBCF] space-y-8 pb-1">

          <div className="relative h-6 flex items-center">
            <div className="absolute -left-[35px] z-10"><Dot status="done" /></div>
            <p className="text-[13.5px] font-bold text-[#0B1F17]">Under development</p>
          </div>

          <div className="relative flex flex-col gap-3">
            <div className="absolute -left-[35px] top-3 z-10"><Dot status="done" /></div>
            <p className="text-[13.5px] font-bold text-[#0B1F17]">Final LP received</p>

            <div className="flex flex-col gap-2">
              {APPROVALS.map((doc) => (
                <div key={doc.id} className="flex items-center justify-between bg-[#ffffff] border border-[#C8DBCF] rounded-[4px] px-3 py-2.5 hover:border-[#15653A] transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-[4px] bg-[#ffffff] border border-[#C8DBCF] flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-[#15653A]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zM6 20V4h7v5h5v11H6z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-[12px] font-bold text-[#0B1F17] leading-none mb-1">{doc.name}</p>
                      <p className="text-[11px] font-medium text-[#64786D] leading-none">{doc.date}</p>
                    </div>
                  </div>
                  <button className="compact-touch p-1.5 text-[#64786D] hover:text-[#15653A] transition-colors" aria-label={`View ${doc.name}`}>
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
              <p className="text-[13.5px] font-bold text-[#0B1F17]">Development phase</p>
              <button
                onClick={() => setProgressOpen((v) => !v)}
                className="compact-touch inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[4px] border border-[#15653A] bg-[#ffffff] text-[#15653A] text-[11px] font-bold hover:bg-[#15653A] hover:text-white transition-all shadow-sm"
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
                    <button onClick={() => shift('left')} disabled={!canLeft} className={`compact-touch absolute left-0 top-0 z-20 h-10 w-8 flex items-center justify-start bg-gradient-to-r from-[#ffffff] to-transparent transition-opacity ${canLeft ? 'opacity-100' : 'opacity-0'}`} aria-label="Scroll left">
                      <div className="w-6 h-6 rounded-full bg-[#ffffff] border border-[#C8DBCF] flex items-center justify-center shadow-sm"><ChevronLeftIcon sx={{ fontSize: 16 }} /></div>
                    </button>
                    <button onClick={() => shift('right')} disabled={!canRight} className={`compact-touch absolute right-0 top-0 z-20 h-10 w-8 flex items-center justify-end bg-gradient-to-l from-[#ffffff] to-transparent transition-opacity ${canRight ? 'opacity-100' : 'opacity-0'}`} aria-label="Scroll right">
                      <div className="w-6 h-6 rounded-full bg-[#ffffff] border border-[#C8DBCF] flex items-center justify-center shadow-sm"><ChevronRightIcon sx={{ fontSize: 16 }} /></div>
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
                              className="compact-touch relative min-w-[80px] flex-1 flex flex-col items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#15653A]/40 rounded-[4px]"
                            >
                              <span className={`text-[11px] mb-2.5 transition-colors ${isActive ? 'font-black text-[#15653A]' : 'font-bold text-[#64786D]'}`}>
                                {item.date}
                              </span>
                              <div className="relative w-full flex justify-center items-center h-5">
                                <div className={`absolute w-full h-[2px] ${idx < activeStep ? 'bg-[#15653A]' : 'bg-[#C8DBCF]'}`} />
                                <div className={`relative z-10 rounded-full border-2 transition-all duration-300 ${idx <= activeStep ? 'w-[10px] h-[10px] bg-[#15653A] border-[#15653A]' : 'w-[8px] h-[8px] bg-[#ffffff] border-[#C8DBCF]'} ${isActive ? 'scale-125 ring-4 ring-[#15653A]/20' : ''}`} />
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <AnimatePresence mode="wait">
                      <motion.div key={activeStep} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="mt-2" role="tabpanel">
                        <p className="text-[12.5px] font-bold text-[#0B1F17] mb-3">{CONSTRUCTION_STEPS[activeStep].title}</p>
                        {currentImages.length > 0 ? (
                          <div className="relative w-full h-48 rounded-[4px] overflow-hidden bg-[#ffffff] border border-[#C8DBCF]">
                            <img src={currentImages[imageIndex]} alt={`${CONSTRUCTION_STEPS[activeStep].title} progress`} onClick={() => setZoomSrc(currentImages[imageIndex])} className="w-full h-full object-cover cursor-zoom-in" loading="lazy" />
                            {currentImages.length > 1 && (
                              <div className="absolute inset-0 flex items-center justify-between px-2">
                                <button onClick={prevImage} className="compact-touch w-8 h-8 rounded-[4px] bg-[rgba(255,255,255,0.9)] shadow-[0_4px_14px_rgba(21,101,58,0.18)] flex items-center justify-center" aria-label="Previous image"><ChevronLeftIcon sx={{ fontSize: 18 }} /></button>
                                <button onClick={nextImage} className="compact-touch w-8 h-8 rounded-[4px] bg-[rgba(255,255,255,0.9)] shadow-[0_4px_14px_rgba(21,101,58,0.18)] flex items-center justify-center" aria-label="Next image"><ChevronRightIcon sx={{ fontSize: 18 }} /></button>
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="py-10 bg-[#ffffff] rounded-[4px] text-center border-2 border-dashed border-[#C8DBCF]">
                            <p className="text-[12px] font-bold text-[#64786D]">Images updating soon</p>
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
            <p className="text-[13.5px] font-bold text-[#64786D]">Ready for registration</p>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {zoomSrc && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setZoomSrc(null)} className="fixed inset-0 z-[100] flex items-center justify-center bg-[rgba(0,0,0,0.95)] p-4" role="dialog" aria-label="Zoomed image">
            <motion.img initial={{ scale: 0.9 }} animate={{ scale: 1 }} src={zoomSrc} className="max-w-full max-h-[85vh] rounded-[4px]" alt="Zoomed construction progress" />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ProjectTimeline;