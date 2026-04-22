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
            className="absolute left-3 bottom-[82px] pointer-events-auto inline-flex items-center h-10 text-white rounded-[var(--radius-sm)] shadow-[var(--glass-shadow)] hover:brightness-110 transition-all overflow-hidden border border-[rgba(255,255,255,0.3)]"
            style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-accent))' }}
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
                  transition={{ duration: 0.22 }}
                  className="text-[12px] font-bold leading-none whitespace-nowrap overflow-hidden pr-4"
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
              className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-[4px]"
            />

            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 280 }}
              className="fixed bottom-0 left-0 right-0 z-[70] flex justify-center"
              role="dialog"
              aria-label="Schedule site visit"
            >
              <div
                className="w-full max-w-[390px] bg-[var(--color-bg-white)] rounded-t-[var(--radius-lg)] shadow-[0_-8px_40px_rgba(10,26,16,0.2)] font-outfit flex flex-col border-t border-[rgba(255,255,255,0.1)]"
                style={{ maxHeight: '86vh' }}
              >
                <div className="flex justify-center pt-3 pb-1 flex-shrink-0">
                  <div className="w-10 h-[4px] rounded-full bg-[var(--color-bg-mid)] opacity-50" />
                </div>

                <div className="overflow-y-auto flex-1 px-4 pt-2 pb-4 space-y-5">
                  {confirmed ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex flex-col items-center gap-4 py-8 text-center"
                    >
                      <div className="w-14 h-14 rounded-full bg-[var(--color-bg-soft)] flex items-center justify-center shadow-[0_0_0_6px_rgba(34,160,80,0.1)] border border-[var(--color-border)]">
                        <CheckIcon className="w-6 h-6 text-[var(--color-success)]" />
                      </div>
                      <div>
                        <p className="text-[18px] font-bold text-[var(--color-text-primary)] mb-1">Visit Scheduled!</p>
                        <div className="inline-block px-3 py-1 bg-[var(--color-bg-soft)] border border-[var(--color-border)] rounded-full text-[13px] font-bold text-[var(--color-primary)] mb-3">
                          {activeDayLabel}, Apr {activeDay.date} · {selectedSlot}
                        </div>
                        <p className="text-[12px] text-[var(--color-text-muted)] max-w-[260px] mx-auto leading-relaxed">
                          Our property consultant will reach out to you shortly to provide directions and confirm the site visit.
                        </p>
                      </div>
                      <button
                        onClick={() => setConfirmed(false)}
                        className="mt-2 px-6 py-2 rounded-[var(--radius-md)] border border-[var(--color-accent)] text-[var(--color-accent)] text-[12px] font-bold hover:bg-[var(--color-bg-soft)] transition-all active:scale-95"
                      >
                        Modify Booking
                      </button>
                    </motion.div>
                  ) : (
                    <>
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <TodayIcon className="w-4 h-4 text-[var(--color-accent)]" />
                            <p className="text-[14px] font-bold text-[var(--color-text-primary)]">Select Date</p>
                          </div>
                          <button
                            onClick={() => setOpen(false)}
                            className="compact-touch w-7 h-7 rounded-full flex items-center justify-center bg-[var(--color-bg-soft)] text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors"
                          >
                            <CloseIcon className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => scrollDates('left')}
                            className="compact-touch w-10 h-10 rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-bg-white)] hover:bg-[var(--color-bg-soft)] transition-colors flex-shrink-0 flex items-center justify-center disabled:opacity-30"
                          >
                            <ChevronLeftIcon className="w-4 h-4 text-[var(--color-text-primary)]" />
                          </button>

                          <div
                            ref={datesScrollRef}
                            className="flex gap-2 overflow-x-auto flex-1 scrollbar-hide py-1"
                          >
                            {DAYS.map(d => (
                              <button
                                key={d.key}
                                onClick={() => setSelectedDay(d.key)}
                                className={`compact-touch w-[52px] h-[52px] flex flex-col items-center justify-center rounded-[var(--radius-md)] border-2 transition-all flex-shrink-0 ${selectedDay === d.key
                                    ? 'border-[var(--color-accent)] bg-[var(--color-bg-soft)] shadow-[var(--glass-shadow)]'
                                    : 'border-[var(--color-border)] bg-[var(--color-bg-white)] hover:border-[var(--color-secondary)]'
                                  }`}
                              >
                                <span className={`text-[15px] font-bold leading-none mb-1 ${selectedDay === d.key ? 'text-[var(--color-primary)]' : 'text-[var(--color-text-primary)]'}`}>
                                  {d.date}
                                </span>
                                <span className={`text-[10px] font-bold uppercase tracking-tight ${d.isToday ? 'text-[var(--color-accent)]' : 'text-[var(--color-text-muted)]'}`}>
                                  {d.isToday ? 'Today' : d.day.slice(0, 3)}
                                </span>
                              </button>
                            ))}
                          </div>

                          <button
                            onClick={() => scrollDates('right')}
                            className="compact-touch w-10 h-10 rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-bg-white)] hover:bg-[var(--color-bg-soft)] transition-colors flex-shrink-0 flex items-center justify-center"
                          >
                            <ChevronRightIcon className="w-4 h-4 text-[var(--color-text-primary)]" />
                          </button>
                        </div>
                      </div>

                      <div className="h-px bg-[var(--color-bg-mid)] opacity-50" />

                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <ClockIcon className="w-4 h-4 text-[var(--color-accent)]" />
                          <p className="text-[14px] font-bold text-[var(--color-text-primary)]">Preferred Session</p>
                        </div>
                        <div className="flex gap-2">
                          {SESSIONS.map(s => (
                            <button
                              key={s.id}
                              onClick={() => handleSessionChange(s.id)}
                              className={`compact-touch flex-1 py-2.5 rounded-[var(--radius-md)] border-2 text-[12px] font-bold transition-all ${selectedSession === s.id
                                  ? 'border-[var(--color-primary)] bg-[var(--color-bg-soft)] text-[var(--color-primary)]'
                                  : 'border-[var(--color-border)] bg-[var(--color-bg-white)] text-[var(--color-text-muted)] hover:border-[var(--color-secondary)]'
                                }`}
                            >
                              {s.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <div className="grid grid-cols-4 gap-2" role="radiogroup">
                          {currentSlots.map(slot => (
                            <button
                              key={slot}
                              onClick={() => setSelectedSlot(slot)}
                              className={`compact-touch py-2.5 rounded-[var(--radius-sm)] border-2 text-center transition-all ${selectedSlot === slot
                                  ? 'border-[var(--color-accent)] bg-[var(--color-accent)] text-white shadow-[var(--glass-shadow)]'
                                  : 'border-[var(--color-border)] bg-[var(--color-bg-white)] text-[var(--color-text-primary)] hover:border-[var(--color-secondary)]'
                                }`}
                            >
                              <span className="text-[11px] font-bold">
                                {slot}
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 px-3 py-2 bg-[var(--color-bg-soft)] border border-[var(--color-border)] rounded-[var(--radius-md)]">
                        <CalendarIcon className="w-4 h-4 text-[var(--color-primary)]" />
                        <p className="text-[12px] font-bold text-[var(--color-text-primary)]">
                          Booking for {activeDayLabel}, Apr {activeDay.date} at {selectedSlot}
                        </p>
                      </div>
                    </>
                  )}
                </div>

                {!confirmed && (
                  <div className="px-4 pt-2 pb-6 flex-shrink-0 border-t border-[var(--color-border)]">
                    <button
                      onClick={() => setConfirmed(true)}
                      className="glass-cta w-full py-3.5 rounded-[var(--radius-md)] text-white text-[14px] font-bold tracking-wide active:scale-[0.98] transition-all"
                      style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-accent))' }}
                    >
                      Schedule Free Visit
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