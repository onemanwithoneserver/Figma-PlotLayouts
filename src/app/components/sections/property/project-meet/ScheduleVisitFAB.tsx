import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const CALENDAR_DAYS = 14;
const DEFAULT_SESSION = 'morning';
const DEFAULT_SLOT = '09:00 AM';
const SESSIONS = [
  { id: 'morning', label: 'Morning', slots: ['09:00 AM', '10:00 AM', '11:00 AM', '11:30 AM'] },
  { id: 'afternoon', label: 'Afternoon', slots: ['01:00 PM', '02:00 PM', '03:30 PM', '04:30 PM'] },
  { id: 'evening', label: 'Evening', slots: ['06:00 PM', '07:00 PM', '08:00 PM', '08:30 PM'] },
];

const DAYS = (() => {
  const now = new Date();
  return Array.from({ length: CALENDAR_DAYS }, (_, i) => {
    const d = new Date(now);
    d.setDate(now.getDate() + i);
    return {
      key: d.toISOString().slice(0, 10),
      date: String(d.getDate()),
      day: DAY_NAMES[d.getDay()],
      month: MONTH_NAMES[d.getMonth()],
      isToday: i === 0,
    };
  });
})();

const CalendarIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const ClockIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
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
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3M3 11h18M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
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
      const scrollAmount = 140;
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

  const handleOpen = () => { 
    setOpen(true); 
    setConfirmed(false); 
  };

  const activeDay = DAYS.find(d => d.key === selectedDay)!;
  const currentSlots = SESSIONS.find(s => s.id === selectedSession)!.slots;
  const activeDayLabel = activeDay.isToday ? 'today' : activeDay.day;

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 z-[55] flex justify-center pointer-events-none">
        <div className="relative w-full max-w-[390px]">
          <motion.button
            layout
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 2, type: 'spring', stiffness: 220, damping: 18 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleOpen}
            className="absolute left-6 bottom-[80px] pointer-events-auto inline-flex items-center h-10 text-white rounded-[8px] shadow-[0_4px_12px_rgba(26,107,74,0.3)] overflow-hidden border border-white/20 backdrop-blur-[10px] bg-gradient-to-br from-[#1A6B4A] to-[#124b33]"
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
                  transition={{ duration: 0.25 }}
                  className="text-[12px] font-bold whitespace-nowrap pr-5"
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
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-[60] bg-[#1A1A2E]/40 backdrop-blur-sm"
            />

            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="fixed bottom-0 left-0 right-0 z-[70] flex justify-center"
            >
              <div className="w-full max-w-[390px] flex flex-col bg-white/95 backdrop-blur-xl border-t border-[#E2E8F0] rounded-t-[24px] shadow-[0_-8px_30px_rgba(26,107,74,0.1)] pb-safe">
                
                <div className="flex justify-center pt-3 pb-2 flex-shrink-0">
                  <div className="w-10 h-1.5 rounded-full bg-[#E2E8F0]" />
                </div>

                <div className="overflow-y-auto px-5 pb-5 space-y-4 mt-1">
                  {confirmed ? (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.98 }} 
                      animate={{ opacity: 1, scale: 1 }} 
                      className="flex flex-col items-center gap-3 py-6 text-center"
                    >
                      <div className="w-12 h-12 rounded-[8px] bg-[#D4F5E7] flex items-center justify-center shadow-sm">
                        <CheckIcon className="w-6 h-6 text-[#1A6B4A]" />
                      </div>
                      <div>
                        <p className="text-[18px] font-bold text-[#1A1A2E] mb-2 tracking-tight">Visit Scheduled!</p>
                        <div className="inline-block px-3 py-1 bg-[#D4F5E7]/50 border border-[#1A6B4A]/10 rounded-[6px] text-[12px] font-bold text-[#1A6B4A] mb-3">
                          {activeDayLabel}, {activeDay.month} {activeDay.date} · {selectedSlot}
                        </div>
                        <p className="text-[13px] text-[#4A5568] leading-relaxed max-w-[240px] mx-auto">
                          A consultant will contact you shortly with the detailed itinerary.
                        </p>
                      </div>
                      <button onClick={() => setConfirmed(false)} className="text-[#1A6B4A] mt-2 text-[12px] font-bold hover:underline">
                        Modify Booking
                      </button>
                    </motion.div>
                  ) : (
                    <>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <TodayIcon className="w-4 h-4 text-[#1A6B4A]" />
                          <p className="text-[14px] font-bold text-[#1A1A2E]">Select Date</p>
                        </div>
                        <button aria-label="Close schedule modal" title="Close" onClick={() => setOpen(false)} className="w-7 h-7 rounded-[6px] flex items-center justify-center bg-[#F5F7FA] text-[#4A5568] hover:bg-[#E2E8F0] transition-colors">
                          <CloseIcon className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button aria-label="Scroll dates left" title="Previous dates" onClick={() => scrollDates('left')} className="w-9 h-9 rounded-[8px] border border-[#E2E8F0] bg-white flex-shrink-0 flex items-center justify-center shadow-sm hover:bg-[#F5F7FA] transition-colors">
                          <ChevronLeftIcon className="w-4 h-4 text-[#4A5568]" />
                        </button>
                        <div ref={datesScrollRef} className="flex gap-2 overflow-x-auto flex-1 scrollbar-hide py-1">
                          {DAYS.map(d => (
                            <button
                              key={d.key}
                              onClick={() => setSelectedDay(d.key)}
                              className={`w-[46px] h-[48px] flex flex-col items-center justify-center rounded-[8px] border transition-all flex-shrink-0 ${
                                selectedDay === d.key 
                                  ? 'border-[#1A6B4A] bg-[#D4F5E7]/50 shadow-sm' 
                                  : 'border-[#E2E8F0] bg-white hover:border-[#1A6B4A]/30'
                              }`}
                            >
                              <span className={`text-[14px] font-bold leading-none mb-0.5 ${selectedDay === d.key ? 'text-[#1A6B4A]' : 'text-[#1A1A2E]'}`}>{d.date}</span>
                              <span className={`text-[10px] font-semibold ${selectedDay === d.key ? 'text-[#1A6B4A]' : 'text-[#4A5568]'}`}>
                                {d.isToday ? 'Today' : d.day.slice(0, 3)}
                              </span>
                            </button>
                          ))}
                        </div>
                        <button aria-label="Scroll dates right" title="Next dates" onClick={() => scrollDates('right')} className="w-9 h-9 rounded-[8px] border border-[#E2E8F0] bg-white flex-shrink-0 flex items-center justify-center shadow-sm hover:bg-[#F5F7FA] transition-colors">
                          <ChevronRightIcon className="w-4 h-4 text-[#4A5568]" />
                        </button>
                      </div>

                      <div className="h-[1px] bg-[#E2E8F0] mx-[-4px] my-2" />

                      <div>
                        <div className="flex items-center gap-2 mb-2.5">
                          <ClockIcon className="w-4 h-4 text-[#1A6B4A]" />
                          <p className="text-[14px] font-bold text-[#1A1A2E]">Session</p>
                        </div>
                        <div className="flex gap-2">
                          {SESSIONS.map(s => (
                            <button
                              key={s.id}
                              onClick={() => handleSessionChange(s.id)}
                              className={`flex-1 py-1.5 rounded-[8px] border text-[12px] font-bold transition-all shadow-sm ${
                                selectedSession === s.id 
                                  ? 'border-[#1A6B4A] bg-[#D4F5E7]/50 text-[#1A6B4A]' 
                                  : 'border-[#E2E8F0] bg-white text-[#4A5568] hover:border-[#1A6B4A]/30'
                              }`}
                            >
                              {s.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-4 gap-2 pt-1">
                        {currentSlots.map(slot => (
                          <button
                            key={slot}
                            onClick={() => setSelectedSlot(slot)}
                            className={`py-2 rounded-[8px] border text-center text-[11px] font-bold transition-all shadow-sm ${
                              selectedSlot === slot 
                                ? 'border-[#1A6B4A] bg-[#1A6B4A] text-white' 
                                : 'border-[#E2E8F0] bg-white text-[#1A1A2E] hover:border-[#1A6B4A]/40'
                            }`}
                          >
                            {slot}
                          </button>
                        ))}
                      </div>

                      <div className="flex items-center justify-center gap-2 mt-4 px-3 py-2.5 bg-[#F5F7FA] border border-[#E2E8F0] rounded-[8px]">
                        <CalendarIcon className="w-4 h-4 text-[#1A6B4A]" />
                        <p className="text-[13px] font-bold text-[#1A1A2E]">
                          {activeDayLabel}, {activeDay.month} {activeDay.date} @ {selectedSlot}
                        </p>
                      </div>

                      <button
                        onClick={() => setConfirmed(true)}
                        className="w-full mt-2 py-3 rounded-[8px] text-white text-[14px] font-bold tracking-wide active:scale-[0.98] transition-all shadow-[0_4px_12px_rgba(26,107,74,0.25)] bg-gradient-to-br from-[#1A6B4A] to-[#124b33]"
                      >
                        Confirm Schedule
                      </button>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default ScheduleVisitFAB;