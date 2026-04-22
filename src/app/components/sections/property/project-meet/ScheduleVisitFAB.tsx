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
    <rect x="11" y="14" width="2" height="2" rx="0.5" fill="currentColor" stroke="none" />
    <rect x="14" y="14" width="2" height="2" rx="0.5" fill="currentColor" stroke="none" />
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
  const activeDayLabel = activeDay.isToday ? 'Today' : activeDay.day;

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 z-[55] flex justify-center pointer-events-none font-outfit">
        <div className="relative w-full max-w-[390px]">
          <motion.button
            layout
            whileTap={{ scale: 0.92 }}
            onClick={handleOpen}
            aria-label="Schedule Site Visit"
            className="absolute left-3 bottom-[82px] pointer-events-auto inline-flex items-center h-9 text-white rounded-[4px] shadow-lg hover:brightness-110 transition-all overflow-hidden border border-white/20 backdrop-blur-md"
            style={{ background: 'linear-gradient(135deg, rgba(21,101,58,0.9), rgba(47,125,78,0.9))' }}
          >
            <div className="w-9 h-9 flex items-center justify-center flex-shrink-0">
              <CalendarIcon className="w-3.5 h-3.5 text-white" />
            </div>
            <AnimatePresence>
              {isAtBottom && (
                <motion.span
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 'auto', opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{ duration: 0.22 }}
                  className="text-[11px] font-bold leading-none whitespace-nowrap overflow-hidden pr-4"
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
              className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-[2px]"
            />

            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 280 }}
              className="fixed bottom-0 left-0 right-0 z-[70] flex justify-center p-2"
              role="dialog"
              aria-label="Schedule site visit"
            >
              <div
                className="w-full max-w-[390px] bg-white/90 backdrop-blur-xl rounded-[8px] shadow-2xl font-outfit flex flex-col border border-white/40"
                style={{ maxHeight: '82vh' }}
              >
                <div className="flex justify-center pt-2 pb-1 flex-shrink-0">
                  <div className="w-8 h-1 rounded-full bg-gray-300/60" />
                </div>

                <div className="overflow-y-auto flex-1 px-4 pt-1 pb-3 space-y-3">
                  {confirmed ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex flex-col items-center gap-3 py-6 text-center"
                    >
                      <div className="w-12 h-12 rounded-[4px] bg-[#EEF4F0]/80 backdrop-blur-sm flex items-center justify-center border border-white">
                        <CheckIcon className="w-5 h-5 text-[#15653A]" />
                      </div>
                      <div>
                        <p className="text-[16px] font-bold text-[#0B1F17] mb-1">Visit Scheduled!</p>
                        <div className="inline-block px-3 py-1 bg-[#EEF4F0]/60 border border-white rounded-full text-[12px] font-bold text-[#15653A] mb-2">
                          {activeDayLabel}, Apr {activeDay.date} · {selectedSlot}
                        </div>
                        <p className="text-[11px] text-[#64786D] max-w-[240px] mx-auto leading-relaxed">
                          Confirmed. A consultant will reach out shortly with directions.
                        </p>
                      </div>
                      <button
                        onClick={() => setConfirmed(false)}
                        className="mt-1 px-5 py-1.5 rounded-[4px] border border-[#15653A]/30 text-[#15653A] text-[11px] font-bold hover:bg-white/50 transition-all active:scale-95"
                      >
                        Modify Booking
                      </button>
                    </motion.div>
                  ) : (
                    <>
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-1.5">
                            <TodayIcon className="w-3.5 h-3.5 text-[#15653A]" />
                            <p className="text-[13px] font-bold text-[#0B1F17]">Select Date</p>
                          </div>
                          <button
                            onClick={() => setOpen(false)}
                            className="w-6 h-6 rounded-full flex items-center justify-center bg-gray-100/80 text-[#64786D] transition-colors"
                          >
                            <CloseIcon className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => scrollDates('left')}
                            className="w-8 h-8 rounded-[4px] border border-white/60 bg-white/40 backdrop-blur-sm hover:bg-white/60 transition-colors flex-shrink-0 flex items-center justify-center disabled:opacity-20"
                          >
                            <ChevronLeftIcon className="w-3.5 h-3.5 text-[#0B1F17]" />
                          </button>

                          <div
                            ref={datesScrollRef}
                            className="flex gap-1.5 overflow-x-auto flex-1 scrollbar-hide py-0.5"
                          >
                            {DAYS.map(d => (
                              <button
                                key={d.key}
                                onClick={() => setSelectedDay(d.key)}
                                className={`w-11 h-11 flex flex-col items-center justify-center rounded-[4px] border transition-all flex-shrink-0 backdrop-blur-sm ${selectedDay === d.key
                                    ? 'border-[#15653A] bg-[#EEF4F0]/80 shadow-md scale-105'
                                    : 'border-white/60 bg-white/30 hover:border-[#15653A]/40'
                                  }`}
                              >
                                <span className={`text-[13px] font-bold leading-none mb-0.5 ${selectedDay === d.key ? 'text-[#15653A]' : 'text-[#0B1F17]'}`}>
                                  {d.date}
                                </span>
                                <span className={`text-[9px] font-bold tracking-tight ${d.isToday ? 'text-[#15653A]' : 'text-[#64786D]'}`}>
                                  {d.isToday ? 'Today' : d.day.slice(0, 3)}
                                </span>
                              </button>
                            ))}
                          </div>

                          <button
                            onClick={() => scrollDates('right')}
                            className="w-8 h-8 rounded-[4px] border border-white/60 bg-white/40 backdrop-blur-sm hover:bg-white/60 transition-colors flex-shrink-0 flex items-center justify-center"
                          >
                            <ChevronRightIcon className="w-3.5 h-3.5 text-[#0B1F17]" />
                          </button>
                        </div>
                      </div>

                      <div className="h-px bg-gray-200/40" />

                      <div>
                        <div className="flex items-center gap-1.5 mb-2">
                          <ClockIcon className="w-3.5 h-3.5 text-[#15653A]" />
                          <p className="text-[13px] font-bold text-[#0B1F17]">Session</p>
                        </div>
                        <div className="flex gap-1.5">
                          {SESSIONS.map(s => (
                            <button
                              key={s.id}
                              onClick={() => handleSessionChange(s.id)}
                              className={`flex-1 py-2 rounded-[4px] border text-[11px] font-bold transition-all backdrop-blur-sm ${selectedSession === s.id
                                  ? 'border-[#15653A] bg-[#EEF4F0]/80 text-[#15653A] shadow-sm'
                                  : 'border-white/60 bg-white/30 text-[#64786D] hover:border-[#15653A]/30'
                                }`}
                            >
                              {s.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-4 gap-1.5" role="radiogroup">
                        {currentSlots.map(slot => (
                          <button
                            key={slot}
                            onClick={() => setSelectedSlot(slot)}
                            className={`py-2 rounded-[4px] border text-center transition-all backdrop-blur-sm ${selectedSlot === slot
                                ? 'border-[#15653A] bg-[#15653A] text-white shadow-md'
                                : 'border-white/60 bg-white/30 text-[#0B1F17] text-[10px] font-bold hover:border-[#15653A]/30'
                              }`}
                          >
                            <span className="text-[10px] font-bold">{slot}</span>
                          </button>
                        ))}
                      </div>

                      <div className="flex items-center gap-2 px-3 py-2 bg-[#EEF4F0]/40 backdrop-blur-sm border border-white/60 rounded-[4px]">
                        <CalendarIcon className="w-3.5 h-3.5 text-[#15653A]" />
                        <p className="text-[11px] font-bold text-[#0B1F17]">
                          {activeDayLabel}, Apr {activeDay.date} @ {selectedSlot}
                        </p>
                      </div>
                    </>
                  )}
                </div>

                {!confirmed && (
                  <div className="px-4 py-3 flex-shrink-0 border-t border-gray-100/30">
                    <button
                      onClick={() => setConfirmed(true)}
                      className="w-full py-3 rounded-[4px] text-white text-[13px] font-bold tracking-wide active:scale-[0.98] transition-all shadow-lg shadow-[#15653A]/20"
                      style={{ background: 'linear-gradient(135deg, #15653A, #2F7D4E)' }}
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