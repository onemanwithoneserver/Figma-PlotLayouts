import React, { useState, useMemo, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import HeadingIcon from './HeadingIcon';
import type { HeadingIconName } from './HeadingIcon';

interface AskSellerProps {
  initialQuestions?: string[];
  className?: string;
  headingIconName?: HeadingIconName;
}

const DEFAULT_QUESTIONS = [
  "What is the current possession status?",
  "Are there any pending legal approvals?",
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 5 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3 } }
};

export default function AskSeller({ initialQuestions = DEFAULT_QUESTIONS, className = '', headingIconName = 'ask-seller' }: AskSellerProps) {
  const [questions, setQuestions] = useState(initialQuestions);
  const [selected, setSelected] = useState<string[]>(initialQuestions);
  const [showMore, setShowMore] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [customInput, setCustomInput] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);

  const visibleQuestions = useMemo(
    () => (showMore ? questions : questions.slice(0, 2)),
    [showMore, questions]
  );

  useEffect(() => {
    if (isAdding) inputRef.current?.focus();
  }, [isAdding]);

  const toggleQuestion = (q: string) => {
    setSelected((prev) =>
      prev.includes(q) ? prev.filter((item) => item !== q) : [...prev, q]
    );
  };

  const handleAddCustom = (e?: React.FormEvent) => {
    e?.preventDefault();
    const trimmed = customInput.trim();
    if (trimmed) {
      if (!questions.includes(trimmed)) {
        setQuestions((prev) => [...prev, trimmed]);
        setSelected((prev) => [...prev, trimmed]);
        setShowMore(true);
      }
      setCustomInput("");
      setIsAdding(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={`w-full px-2 py-2 space-y-3 bg-transparent ${className}`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-[6px] bg-[#D4F5E7]/50 border border-[#1A6B4A]/10 flex items-center justify-center shadow-sm">
            <HeadingIcon name={headingIconName} className="w-4 h-4 text-[#1A6B4A]" />
          </div>
          <h3 className="text-[14px] font-bold text-[#1A1A2E] tracking-tight">Ask Seller</h3>
        </div>

        {!isAdding && (
          <button
            type="button"
            onClick={() => setIsAdding(true)}
            className="group relative inline-flex items-center gap-1.5 rounded-[6px] border border-[#E2E8F0] bg-white px-2.5 py-1.5 shadow-sm transition-all duration-300 hover:-translate-y-[1px] hover:shadow-[0_4px_12px_rgba(26,107,74,0.08)] active:scale-95 overflow-hidden"
          >
            <div className="absolute top-0 -left-[100%] w-full h-full bg-gradient-to-r from-transparent via-[#1A6B4A]/5 to-transparent skew-x-[-20deg] group-hover:left-[100%] transition-all duration-700 pointer-events-none" />
            
            <svg className="h-3 w-3 text-[#1A6B4A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            <span className="text-[11px] font-bold text-[#1A6B4A]">Custom Question</span>
          </button>
        )}
      </div>

      <motion.div 
        layout
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="flex flex-col gap-2"
      >
        <AnimatePresence>
          {visibleQuestions.map((q) => {
            const checked = selected.includes(q);
            return (
              <motion.button
                layout
                variants={itemVariants}
                initial="hidden"
                animate="show"
                exit={{ opacity: 0, scale: 0.95 }}
                key={q}
                onClick={() => toggleQuestion(q)}
                className={`group flex items-center gap-2.5 w-full px-3 py-2.5 rounded-[8px] text-left transition-all duration-300 ease-out border relative overflow-hidden ${
                  checked 
                  ? "bg-white/95 border-[#1A6B4A] shadow-[0_2px_8px_rgba(26,107,74,0.12)] scale-[1.01]" 
                  : "bg-white/60 backdrop-blur-md border-[#E2E8F0] hover:bg-white/85 hover:border-[#1A6B4A]/30"
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-[4px] flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                    checked ? "bg-[#1A6B4A] shadow-[0_2px_6px_rgba(26,107,74,0.3)]" : "bg-[#F5F7FA] border border-[#E2E8F0] group-hover:border-[#1A6B4A]/50"
                  }`}
                >
                  {checked && (
                    <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3.5} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                
                <span className={`text-[12.5px] leading-tight transition-colors duration-300 ${
                    checked ? "text-[#1A1A2E] font-bold" : "text-[#4A5568] font-medium group-hover:text-[#1A1A2E]"
                  }`}
                >
                  {q}
                </span>
              </motion.button>
            );
          })}
        </AnimatePresence>
      </motion.div>

      <motion.div layout className="space-y-2">
        <AnimatePresence>
          {isAdding && (
            <motion.form
              layout
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              onSubmit={handleAddCustom}
              className="flex items-center gap-2.5 w-full px-3 py-2.5 rounded-[8px] bg-white/90 border border-[#1A6B4A] shadow-[0_0_0_3px_rgba(26,107,74,0.1)]"
            >
              <div className="w-2.5 h-2.5 rounded-full bg-[#F5A623] flex-shrink-0 animate-pulse shadow-[0_0_6px_rgba(245,166,35,0.6)]" />
              <input
                ref={inputRef}
                type="text"
                value={customInput}
                onChange={(e) => setCustomInput(e.target.value)}
                onBlur={() => !customInput && setIsAdding(false)}
                placeholder="Type your question here..."
                className="text-[13px] font-semibold text-[#1A1A2E] outline-none w-full bg-transparent placeholder:text-[#4A5568]/60"
              />
            </motion.form>
          )}
        </AnimatePresence>

        {questions.length > 2 && (
          <motion.button
            layout
            onClick={() => setShowMore(!showMore)}
            className="flex items-center gap-1.5 group w-fit px-1 py-0.5 focus:outline-none"
          >
            <div className="w-5 h-5 rounded-[6px] flex items-center justify-center bg-[#F5F7FA] border border-[#E2E8F0] text-[#4A5568] group-hover:bg-[#1A6B4A] group-hover:border-[#1A6B4A] group-hover:text-white transition-all duration-300 shadow-sm">
              <svg
                className={`w-3 h-3 transition-transform duration-300 ${showMore ? "" : "rotate-180"}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 15l7-7 7 7" />
              </svg>
            </div>
            <span className="text-[12px] font-bold text-[#1A6B4A] tracking-wide border-b border-[#1A6B4A]/20 group-hover:border-[#1A6B4A] transition-all">
              {showMore ? "show fewer" : `load more questions`}
            </span>
          </motion.button>
        )}
      </motion.div>
    </motion.div>
  );
}