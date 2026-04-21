import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const DAYS = (() => {
  const now = new Date();
  return Array.from({ length: 14 }, (_, i) => {
    const d = new Date(now);
    d.setDate(now.getDate() + i);
    return {
      key:     d.toISOString().slice(0, 10),
      date:    String(d.getDate()),
      day:     DAY_NAMES[d.getDay()],
      isToday: i === 0,
    };
  });
})();

const SESSIONS = [
  { id: 'morning',   label: '🌄 Morning',   slots: ['07:00 AM','07:30 AM','08:00 AM','08:30 AM','09:00 AM','09:30 AM','10:00 AM','10:30 AM'] },
  { id: 'afternoon', label: '🌆 Afternoon', slots: ['12:00 PM','12:30 PM','01:00 PM','01:30 PM','02:00 PM','02:30 PM'] },
  { id: 'evening',   label: '🌇 Evening',   slots: ['05:00 PM','05:30 PM','06:00 PM','06:30 PM'] },
];

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
  const [open,            setOpen]            = useState(false);
  const [isAtBottom,      setIsAtBottom]      = useState(false);
  const [selectedDay,     setSelectedDay]     = useState(DAYS[0].key);
  const [selectedSession, setSelectedSession] = useState('morning');
  const [selectedSlot,    setSelectedSlot]    = useState('09:00 AM');
  const [confirmed,       setConfirmed]       = useState(false);

  const datesScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const nearBottom = document.documentElement.scrollHeight - window.innerHeight - window.scrollY <= 80;
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

  const activeDay      = DAYS.find(d => d.key === selectedDay)!;
  const currentSlots   = SESSIONS.find(s => s.id === selectedSession)!.slots;
  const activeDayLabel = activeDay.isToday ? 'Today' : activeDay.day;

  return (
    <>
      {/* z-[55] sits above the footer nav (z-50) but below the popup (z-[60+]) */}
      <div className="fixed bottom-0 left-0 right-0 z-[55] flex justify-center pointer-events-none">
        <div className="relative w-full max-w-[390px]">

          {/* Schedule Visit FAB — left side, icon-only by default, expands to pill at page bottom */}
          <motion.button
            layout
            whileTap={{ scale: 0.92 }}
            onClick={handleOpen}
            aria-label="Schedule Site Visit"
            className="absolute left-3 bottom-[72px] pointer-events-auto inline-flex items-center h-9 bg-[#1F7A63] text-white rounded-[4px] shadow-[0_4px_20px_rgba(31,122,99,0.40)] hover:bg-[#176554] transition-colors overflow-hidden"
          >
            {/* Icon — always visible */}
            <div className="w-9 h-9 flex items-center justify-center flex-shrink-0">
              <CalendarIcon className="w-4 h-4 text-white" />
            </div>
            {/* Label — slides in when user reaches page bottom */}
            <AnimatePresence>
              {isAtBottom && (
                <motion.span
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 'auto', opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{ duration: 0.22 }}
                  className="text-[12px] font-bold leading-none whitespace-nowrap overflow-hidden pr-3"
                >
                  Schedule Visit
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
              className="fixed bottom-0 left-0 right-0 z-[70] flex justify-center"
            >
              <div
                className="w-full max-w-[390px] bg-white rounded-t-[8px] shadow-[0_-8px_40px_rgba(0,0,0,0.16)] font-['Outfit',_sans-serif] flex flex-col"
                style={{ maxHeight: '86vh' }}
              >
                {/* Drag handle only — no separate header */}
                <div className="flex justify-center pt-2 pb-0 flex-shrink-0">
                  <div className="w-8 h-[3px] rounded-full bg-[#E0E0E0]" />
                </div>

                <div className="overflow-y-auto flex-1 px-3 pt-2.5 pb-2 space-y-2">
                  {confirmed ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex flex-col items-center gap-3 py-5 text-center"
                    >
                      <div className="w-11 h-11 rounded-[4px] bg-[#E8F5E9] flex items-center justify-center shadow-[0_0_0_4px_rgba(31,122,99,0.08)]">
                        <CheckIcon className="w-5 h-5 text-[#1F7A63]" />
                      </div>
                      <div>
                        <p className="text-[14px] font-bold text-[#1A1A1A] mb-1">Visit Confirmed!</p>
                        <p className="text-[12px] font-semibold text-[#1F7A63] mb-1">
                          {activeDayLabel}, Apr {activeDay.date} · {selectedSlot}
                        </p>
                        <p className="text-[11px] text-[#999] max-w-[220px] mx-auto leading-relaxed">
                          Our team will contact you shortly to confirm the visit details.
                        </p>
                      </div>
                      <button
                        onClick={() => setConfirmed(false)}
                        className="px-4 py-1.5 rounded-[4px] border border-[#1F7A63] text-[#1F7A63] text-[11px] font-bold hover:bg-[#E8F5E9] transition-colors"
                      >
                        Reschedule
                      </button>
                    </motion.div>
                  ) : (
                    <>
                      {/* ── Select Date row with inline close button ── */}
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <div className="flex items-center gap-1.5">
                            <TodayIcon className="w-3.5 h-3.5 text-[#1F7A63]" />
                            <p className="text-[12px] font-bold text-[#1A1A1A] leading-none">
                              Select Date
                            </p>
                          </div>
                          <button
                            onClick={() => setOpen(false)}
                            aria-label="Close"
                            className="w-6 h-6 rounded-[4px] flex items-center justify-center text-[#AAAAAA] hover:bg-[#F5F5F5] hover:text-[#1A1A1A] transition-colors"
                          >
                            <CloseIcon className="w-[13px] h-[13px]" />
                          </button>
                        </div>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => scrollDates('left')}
                            aria-label="Scroll dates left"
                            className="p-1 rounded-[4px] border border-[#E0E0E0] bg-white hover:bg-[#F5F5F5] transition-colors flex-shrink-0"
                          >
                            <ChevronLeftIcon className="w-3 h-3 text-[#555]" />
                          </button>

                          <div
                            ref={datesScrollRef}
                            className="flex gap-1 overflow-x-auto flex-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                          >
                            {DAYS.map(d => (
                              <button
                                key={d.key}
                                onClick={() => setSelectedDay(d.key)}
                                className={`flex flex-col items-center min-w-[44px] py-1.5 rounded-[4px] border transition-all flex-shrink-0 ${
                                  selectedDay === d.key
                                    ? 'border-[#1F7A63] bg-[#E8F5E9]'
                                    : 'border-[#E0E0E0] bg-white hover:border-[#B2D8CE]'
                                }`}
                              >
                                <span className={`text-[13px] font-bold leading-none mb-0.5 ${selectedDay === d.key ? 'text-[#1F7A63]' : 'text-[#1A1A1A]'}`}>
                                  {d.date}
                                </span>
                                <span className={`text-[9px] font-semibold ${d.isToday ? 'text-[#1F7A63]' : 'text-[#888]'}`}>
                                  {d.isToday ? 'Today' : d.day}
                                </span>
                              </button>
                            ))}
                          </div>

                          <button
                            onClick={() => scrollDates('right')}
                            aria-label="Scroll dates right"
                            className="p-1 rounded-[4px] border border-[#E0E0E0] bg-white hover:bg-[#F5F5F5] transition-colors flex-shrink-0"
                          >
                            <ChevronRightIcon className="w-3 h-3 text-[#555]" />
                          </button>
                        </div>
                      </div>

                      <div className="h-px bg-[#F0F0F0]" />

                      {/* ── Preferred Time ── */}
                      <div>
                        <div className="flex items-center gap-1.5 mb-1.5">
                          <ClockIcon className="w-3.5 h-3.5 text-[#1F7A63]" />
                          <p className="text-[12px] font-bold text-[#1A1A1A]">Preferred Time</p>
                        </div>
                        <div className="flex gap-1">
                          {SESSIONS.map(s => (
                            <button
                              key={s.id}
                              onClick={() => handleSessionChange(s.id)}
                              className={`flex-1 py-1.5 rounded-[4px] border text-[11px] font-semibold transition-all ${
                                selectedSession === s.id
                                  ? 'border-[#1F7A63] bg-[#E8F5E9] text-[#1F7A63]'
                                  : 'border-[#E0E0E0] bg-white text-[#666] hover:border-[#B2D8CE]'
                              }`}
                            >
                              {s.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* ── Time slots ── */}
                      <div className="grid grid-cols-4 gap-1">
                        {currentSlots.map(slot => (
                          <button
                            key={slot}
                            onClick={() => setSelectedSlot(slot)}
                            className={`py-1.5 px-0.5 rounded-[4px] border text-center transition-all ${
                              selectedSlot === slot
                                ? 'border-[#1F7A63] bg-[#E8F5E9]'
                                : 'border-[#E0E0E0] bg-white hover:border-[#B2D8CE]'
                            }`}
                          >
                            <span className={`text-[10px] font-bold ${ selectedSlot === slot ? 'text-[#1F7A63]' : 'text-[#1A1A1A]'}`}>
                              {slot}
                            </span>
                          </button>
                        ))}
                      </div>

                      {/* ── Summary pills ── */}
                      <div className="flex items-center gap-1.5">
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-[4px] bg-[#E8F5E9] text-[#1F7A63] text-[10px] font-bold">
                          <CalendarIcon className="w-2.5 h-2.5" />
                          {activeDayLabel}, Apr {activeDay.date}
                        </span>
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-[4px] bg-[#E8F5E9] text-[#1F7A63] text-[10px] font-bold">
                          <ClockIcon className="w-2.5 h-2.5" />
                          {selectedSlot}
                        </span>
                      </div>
                    </>
                  )}
                </div>

                {!confirmed && (
                  <div className="px-3 pt-1.5 pb-3 flex-shrink-0 border-t border-[#F0F0F0]">
                    <button
                      onClick={() => setConfirmed(true)}
                      className="w-full py-2 rounded-[4px] bg-[#1F7A63] text-white text-[12px] font-bold tracking-wide hover:bg-[#176554] active:scale-[0.99] transition-all shadow-[0_2px_10px_rgba(31,122,99,0.25)]"
                    >
                      Confirm Site Visit
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