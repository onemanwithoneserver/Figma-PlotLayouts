import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SESSIONS, DAY_NAMES, DEFAULT_SESSION, DEFAULT_SLOT, CALENDAR_DAYS } from './data';

const DAYS = (() => {
  const now = new Date();
  return Array.from({ length: CALENDAR_DAYS }, (_, i) => {
    const d = new Date(now);
    d.setDate(now.getDate() + i);
    return {
      key: d.toISOString().slice(0, 10),
      date: String(d.getDate()),
      day: DAY_NAMES[d.getDay()],
      isToday: i === 0,
    };
  });
})();

const CalendarIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const ClockIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const CheckIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
  </svg>
);

const CloseIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const TodayIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M8 7V3m8 4V3M3 11h18M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    <rect x="8" y="14" width="2" height="2" rx="0.5" fill="currentColor" stroke="none" />
  </svg>
);

const ChevronLeftIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
  </svg>
);

const ChevronRightIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
  </svg>
);

const ScheduleVisitFAB: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(false);
  const [selectedDay, setSelectedDay] = useState(DAYS[0].key);
  const [selectedSession, setSelectedSession] = useState(DEFAULT_SESSION);
  const [selectedSlot, setSelectedSlot] = useState(DEFAULT_SLOT);
  const [confirmed, setConfirmed] = useState(false);

  const datesScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const nearBottom = document.documentElement.scrollHeight - window.innerHeight - window.scrollY <= 120;
      setIsAtBottom(nearBottom);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollDates = (direction: 'left' | 'right') => {
    if (datesScrollRef.current) {
      const scrollAmount = 150;
      datesScrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const handleSessionChange = (id: string) => {
    setSelectedSession(id);
    const sess = SESSIONS.find(s => s.id === id)!;
    if (!sess.slots.includes(selectedSlot)) setSelectedSlot(sess.slots[0]);
  };

  const handleOpen = () => { setOpen(true); setConfirmed(false); };

  const activeDay = DAYS.find(d => d.key === selectedDay)!;
  const currentSlots = SESSIONS.find(s => s.id === selectedSession)!.slots;
  const activeDayLabel = activeDay.isToday ? 'today' : activeDay.day;

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 z-[55] flex justify-center pointer-events-none font-inter">
        <div className="relative w-full max-w-[390px]">
          <motion.button
            layout
            whileTap={{ scale: 0.95 }}
            onClick={handleOpen}
            aria-label="Schedule Site Visit"
            className="absolute left-4 bottom-[90px] pointer-events-auto inline-flex items-center h-10 text-white rounded-[8px] shadow-[4px_4px_8px_#CBCBC7,-4px_-4px_8px_#FFFFFF] hover:brightness-105 transition-all overflow-hidden animate-neu-float"
            style={{ background: 'linear-gradient(135deg, #2F6F4E, #1E4D35)' }}
          >
            <div className="w-10 h-10 flex items-center justify-center flex-shrink-0">
              <CalendarIcon className="w-4 h-4 text-white" />
            </div>
            <AnimatePresence>
              {isAtBottom && (
                <motion.span
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 'auto', opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
                  className="text-[12px] font-bold leading-none whitespace-nowrap overflow-hidden pr-5"
                >
                  Schedule Site Visit
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-[60] bg-[rgba(26,31,36,0.45)]"
            />

            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed bottom-0 left-0 right-0 z-[70] flex justify-center p-3"
              role="dialog"
              aria-label="Schedule site visit"
            >
              <div
                className="w-full max-w-[390px] bg-[#ECECE8] shadow-[0_-6px_20px_#CBCBC7,0_-2px_4px_#FFFFFF] rounded-[8px] font-inter flex flex-col"
                style={{ maxHeight: '85vh' }}
              >
                <div className="flex justify-center pt-3 pb-2 flex-shrink-0">
                  <div className="w-10 h-1 rounded-full bg-[rgba(0,0,0,0.1)]" />
                </div>

                <div className="overflow-y-auto flex-1 px-5 pt-1 pb-5 space-y-5">
                  {confirmed ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex flex-col items-center gap-4 py-10 text-center"
                    >
                      <div className="w-16 h-16 rounded-[8px] bg-[#ECECE8] shadow-[3px_3px_6px_#CBCBC7,-3px_-3px_6px_#FFFFFF] flex items-center justify-center">
                        <CheckIcon className="w-7 h-7 text-[#2F6F4E]" />
                      </div>
                      <div>
                        <p className="text-[18px] font-bold text-[#1A2B22] mb-2 tracking-tight">Visit Scheduled!</p>
                        <div className="inline-block px-4 py-1.5 bg-[#ECECE8] shadow-[2px_2px_4px_#CBCBC7,-2px_-2px_4px_#FFFFFF] rounded-[8px] text-[13px] font-bold text-[#2F6F4E] mb-3">
                          {activeDayLabel}, Apr {activeDay.date} · {selectedSlot}
                        </div>
                        <p className="text-[14px] text-[#3D5048] max-w-[280px] mx-auto leading-relaxed font-medium">
                          Confirmed. A consultant will reach out shortly with the detailed itinerary.
                        </p>
                      </div>
                      <button
                        onClick={() => setConfirmed(false)}
                        className="mt-2 text-[#2F6F4E] text-[13px] font-bold hover:underline underline-offset-4 decoration-2"
                      >
                        Modify Booking
                      </button>
                    </motion.div>
                  ) : (
                    <>
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <TodayIcon className="w-4 h-4 text-[#2F6F4E]" />
                            <p className="text-[14px] font-bold text-[#1A2B22] tracking-tight">Select Date</p>
                          </div>
                          <button
                            onClick={() => setOpen(false)}
                            className="w-8 h-8 rounded-[8px] flex items-center justify-center bg-[#ECECE8] shadow-[2px_2px_4px_#CBCBC7,-2px_-2px_4px_#FFFFFF] active:shadow-[inset_2px_2px_4px_#CBCBC7,inset_-2px_-2px_4px_#FFFFFF] text-[#3D5048] transition-shadow"
                          >
                            <CloseIcon className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => scrollDates('left')}
                            className="w-10 h-10 rounded-[8px] bg-[#ECECE8] shadow-[2px_2px_4px_#CBCBC7,-2px_-2px_4px_#FFFFFF] active:shadow-[inset_2px_2px_4px_#CBCBC7,inset_-2px_-2px_4px_#FFFFFF] transition-shadow flex-shrink-0 flex items-center justify-center"
                          >
                            <ChevronLeftIcon className="w-4 h-4 text-[#1A2B22]" />
                          </button>

                          <div
                            ref={datesScrollRef}
                            className="flex gap-2 overflow-x-auto flex-1 scrollbar-hide py-1"
                          >
                            {DAYS.map(d => (
                              <motion.button
                                key={d.key}
                                onClick={() => setSelectedDay(d.key)}
                                whileTap={{ scale: 0.9 }}
                                transition={{ type: 'spring', stiffness: 500, damping: 28 }}
                                className={`w-12 h-12 flex flex-col items-center justify-center rounded-[8px] transition-shadow flex-shrink-0 ${
                                    selectedDay === d.key
                                    ? 'bg-[#ECECE8] shadow-[inset_2px_2px_4px_#CBCBC7,inset_-2px_-2px_4px_#FFFFFF] border border-[#2F6F4E]'
                                    : 'bg-[#ECECE8] shadow-[2px_2px_4px_#CBCBC7,-2px_-2px_4px_#FFFFFF] active:shadow-[inset_2px_2px_4px_#CBCBC7,inset_-2px_-2px_4px_#FFFFFF]'
                                  }`}
                              >
                                <span className={`text-[14px] font-bold leading-none mb-0.5 ${selectedDay === d.key ? 'text-[#2F6F4E]' : 'text-[#1A1F24]'}`}>
                                  {d.date}
                                </span>
                                  <span className={`text-[10px] font-bold uppercase tracking-wide ${d.isToday ? 'text-[#2F6F4E]' : 'text-[#5C6B63]'}`}>
                                  {d.isToday ? 'Today' : d.day.slice(0, 3)}
                                </span>
                              </motion.button>
                            ))}
                          </div>

                          <button
                            onClick={() => scrollDates('right')}
                            className="w-10 h-10 rounded-[8px] bg-[#ECECE8] shadow-[2px_2px_4px_#CBCBC7,-2px_-2px_4px_#FFFFFF] active:shadow-[inset_2px_2px_4px_#CBCBC7,inset_-2px_-2px_4px_#FFFFFF] transition-shadow flex-shrink-0 flex items-center justify-center"
                          >
                            <ChevronRightIcon className="w-4 h-4 text-[#1A2B22]" />
                          </button>
                        </div>
                      </div>

                      <div className="h-[1px] bg-[rgba(0,0,0,0.06)]" />

                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <ClockIcon className="w-4 h-4 text-[#2F6F4E]" />
                          <p className="text-[14px] font-bold text-[#1A2B22] tracking-tight">Session</p>
                        </div>
                        <div className="flex gap-2">
                          {SESSIONS.map(s => (
                            <motion.button
                              key={s.id}
                              onClick={() => handleSessionChange(s.id)}
                              whileTap={{ scale: 0.94 }}
                              transition={{ type: 'spring', stiffness: 500, damping: 28 }}
                              className={`flex-1 py-2.5 rounded-[8px] text-[12px] font-bold transition-shadow ${
                                  selectedSession === s.id
                                  ? 'bg-[#ECECE8] shadow-[inset_2px_2px_4px_#CBCBC7,inset_-2px_-2px_4px_#FFFFFF] border border-[#2F6F4E] text-[#2F6F4E]'
                                  : 'bg-[#ECECE8] shadow-[2px_2px_4px_#CBCBC7,-2px_-2px_4px_#FFFFFF] active:shadow-[inset_2px_2px_4px_#CBCBC7,inset_-2px_-2px_4px_#FFFFFF] text-[#5C6B63]'
                                }`}
                            >
                              {s.label}
                            </motion.button>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-4 gap-2" role="radiogroup">
                        {currentSlots.map(slot => (
                          <motion.button
                            key={slot}
                            onClick={() => setSelectedSlot(slot)}
                            whileTap={{ scale: 0.9 }}
                            transition={{ type: 'spring', stiffness: 500, damping: 28 }}
                            className={`py-2.5 rounded-[8px] text-center transition-shadow text-[11px] font-bold ${
                                selectedSlot === slot
                                ? 'bg-[#2F6F4E] text-white shadow-[2px_2px_4px_#CBCBC7,-2px_-2px_4px_#FFFFFF]'
                                : 'bg-[#ECECE8] shadow-[2px_2px_4px_#CBCBC7,-2px_-2px_4px_#FFFFFF] active:shadow-[inset_2px_2px_4px_#CBCBC7,inset_-2px_-2px_4px_#FFFFFF] text-[#1A2B22]'
                              }`}
                          >
                            {slot}
                          </motion.button>
                        ))}
                      </div>

                      <div className="flex items-center gap-3 px-4 py-3 bg-[#ECECE8] shadow-[inset_2px_2px_4px_#CBCBC7,inset_-2px_-2px_4px_#FFFFFF] rounded-[8px]">
                        <CalendarIcon className="w-4 h-4 text-[#2F6F4E]" />
                        <p className="text-[13px] font-bold text-[#1A2B22] tracking-tight">
                          {activeDayLabel}, Apr {activeDay.date} @ {selectedSlot}
                        </p>
                      </div>
                    </>
                  )}
                </div>

                {!confirmed && (
                  <div className="px-5 py-4 flex-shrink-0 border-t border-[rgba(0,0,0,0.06)] bg-[#ECECE8]">
                    <button
                      onClick={() => setConfirmed(true)}
                      className="neu-btn-green w-full py-3.5 text-white text-[14px] font-bold tracking-wide"
                    >
                      Confirm Schedule
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default ScheduleVisitFAB;