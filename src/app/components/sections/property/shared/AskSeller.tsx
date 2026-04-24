import React, { useState, useMemo, useRef, useEffect } from "react";
import HeadingIcon from './HeadingIcon';

interface AskSellerProps {
  initialQuestions?: string[];
  className?: string;
}

const DEFAULT_QUESTIONS = [
  "What is the current possession status?",
  "Are there any pending legal approvals?",
];

export default function AskSeller({ initialQuestions = DEFAULT_QUESTIONS, className = '' }: AskSellerProps) {
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
    <div className={`w-full px-2 py-2 space-y-2 font-inter bg-transparent animate-fade-blur-in opacity-0 ${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <div className="w-8 h-8 rounded-[4px] bg-[rgba(47,111,78,0.1)] border border-[rgba(47,111,78,0.2)] flex items-center justify-center">
            <HeadingIcon name="ask-seller" className="w-4 h-4 text-[#2F6F4E]" />
          </div>
          <h3 className="text-[14px] font-bold text-[#1A1F24] tracking-tight">Ask Seller</h3>
        </div>

        {!isAdding && (
          <button
            type="button"
            onClick={() => setIsAdding(true)}
            className="group relative inline-flex items-center gap-1 rounded-[4px] border border-[rgba(47,111,78,0.3)] bg-white px-2 py-1 shadow-sm transition-all duration-[280ms] ease-[cubic-bezier(0.4,0,0.2,1)] hover:-translate-y-[2px] hover:shadow-[0_4px_12px_rgba(47,111,78,0.15)] active:scale-95 overflow-hidden"
          >
            <div className="absolute top-0 -left-[100%] w-full h-full bg-gradient-to-r from-transparent via-[rgba(47,111,78,0.05)] to-transparent skew-x-[-20deg] group-hover:left-[100%] transition-all duration-700 pointer-events-none" />
            
            <svg className="h-3 w-3 text-[#2F6F4E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            <span className="text-[11px] font-bold text-[#2F6F4E] ">Custom Question</span>
          </button>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        {visibleQuestions.map((q, idx) => {
          const checked = selected.includes(q);
          return (
            <button
              key={q}
              onClick={() => toggleQuestion(q)}
              className={`flex items-center gap-2 w-full px-2.5 py-2 rounded-[4px] text-left transition-all duration-[280ms] ease-[cubic-bezier(0.4,0,0.2,1)] border relative overflow-hidden ${
                checked 
                ? "bg-[rgba(255,255,255,0.85)] border-[#2F6F4E] shadow-[0_4px_12px_rgba(47,111,78,0.12)] scale-[1.01]" 
                : "bg-[rgba(255,255,255,0.6)] border-[rgba(0,0,0,0.08)] hover:bg-[rgba(255,255,255,0.8)]"
              }`}
            >
              <div
                className={`w-4 h-4 rounded-[6px] flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                  checked ? "bg-[#2F6F4E] shadow-[0_2px_6px_rgba(47,111,78,0.3)]" : "bg-[rgba(0,0,0,0.05)] border border-[rgba(0,0,0,0.1)]"
                }`}
              >
                {checked && (
                  <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3.5} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              
              <span className={`text-[12.5px] font-medium leading-tight transition-colors duration-300 ${
                  checked ? "text-[#1A1F24] font-bold" : "text-[#4A5560]"
                }`}
              >
                {q}
              </span>
            </button>
          );
        })}
      </div>

      <div className="space-y-1.5">
        {isAdding && (
          <form
            onSubmit={handleAddCustom}
            className="flex items-center gap-2 w-full px-2.5 py-2 rounded-[4px] bg-[rgba(255,255,255,0.8)] border border-[#2F6F4E] shadow-[0_0_0_3px_rgba(47,111,78,0.1)] animate-fade-blur-in"
          >
            <div className="w-4 h-4 rounded-full bg-[#2F6F4E] flex-shrink-0 animate-pulse" />
            <input
              ref={inputRef}
              type="text"
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              onBlur={() => !customInput && setIsAdding(false)}
              placeholder="Type your question here..."
              className="text-[13px] font-semibold text-[#1A1F24] outline-none w-full bg-transparent placeholder:text-[#6B7280]/60"
            />
          </form>
        )}

        {questions.length > 2 && (
          <button
            onClick={() => setShowMore(!showMore)}
            className="flex items-center gap-1 group w-fit px-0.5 focus:outline-none"
          >
            <div className="w-5 h-5 rounded-[6px] flex items-center justify-center bg-[rgba(0,0,0,0.05)] text-[#4A5560] group-hover:bg-[#2F6F4E] group-hover:text-white transition-all duration-300">
              <svg
                className={`w-3 h-3 transition-transform duration-300 ${showMore ? "" : "rotate-180"}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 15l7-7 7 7" />
              </svg>
            </div>
            <span className="text-[12px] font-bold text-[#2F6F4E] tracking-wide border-b border-[#2F6F4E]/20 group-hover:border-[#2F6F4E] transition-all">
              {showMore ? "show fewer" : `load more questions`}
            </span>
          </button>
        )}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fadeBlurIn { 
          from { opacity: 0; filter: blur(6px); transform: translateY(8px); } 
          to { opacity: 1; filter: blur(0px); transform: translateY(0); } 
        }
        .animate-fade-blur-in { animation: fadeBlurIn 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards; }
      `}} />
    </div>
  );
}