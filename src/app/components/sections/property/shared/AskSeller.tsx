import React, { useState, useMemo, useRef, useEffect } from "react";

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
    <div className={`w-full px-5 py-4 space-y-4 font-sans bg-[var(--background-color)] border-t border-[var(--border-color-subtle)] ${className}`}>
      {/* Header Section */}
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-sm font-semibold tracking-tight text-[var(--text-color)]">
          Ask Seller
        </h3>
        
        {/* Custom Question Button */}
        {!isAdding && (
          <button
            type="button"
            onClick={() => setIsAdding(true)}
            className="group flex items-center gap-1.5 rounded-md border border-[var(--primary-color)]/20 bg-white px-2.5 py-1.5 shadow-sm transition-all hover:border-[var(--primary-color)]/50 hover:bg-[var(--primary-color)]/5 hover:shadow-md active:scale-95"
          >
            <span className="flex h-5 w-5 items-center justify-center rounded-[4px] bg-[var(--primary-color)]/10 text-[var(--primary-color)] group-hover:bg-[var(--primary-color)] group-hover:text-white transition-colors">
              <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
            </span>
            <span className="text-xs font-medium text-[var(--primary-color-hover)]">Custom Question</span>
          </button>
        )}
      </div>

      {/* Questions List */}
      <div className="space-y-3">
        {visibleQuestions.map((q) => {
          const checked = selected.includes(q);
          return (
            <button
              key={q}
              onClick={() => toggleQuestion(q)}
              className="group flex items-start gap-3 w-full text-left transition-all active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary-color)]/40 rounded-lg p-2 -mx-2 hover:bg-[var(--background-color-muted)]"
            >
              <div
                className={`mt-0.5 w-4 h-4 rounded-[4px] flex items-center justify-center flex-shrink-0 shadow-sm transition-all duration-300 ease-out ${
                  checked 
                    ? "bg-[var(--primary-color)] border-transparent shadow-[0_2px_8px_var(--primary-alpha-25-alt2)] scale-105" 
                    : "bg-[var(--secondary-color)] border border-[var(--border-color)] group-hover:border-[var(--primary-color)]/50"
                }`}
              >
                {checked && (
                  <svg className="w-2.5 h-2.5 text-white animate-in zoom-in-50 duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              <span
                className={`text-[13px] leading-tight transition-colors duration-200 ${
                  checked ? "font-medium text-[var(--text-color)]" : "font-normal text-[var(--text-color-muted)]"
                } group-hover:text-[var(--text-color)]`}
              >
                {q}
              </span>
            </button>
          );
        })}
      </div>

      {/* Footer Controls */}
      <div className="space-y-3 pt-1">
        {/* Add Custom Question Input */}
        {isAdding && (
          <form
            onSubmit={handleAddCustom}
            className="flex items-center gap-3 w-full p-2 -mx-2 rounded-lg bg-[var(--background-color-light)] border border-[var(--border-color-subtle)] animate-in slide-in-from-top-2 fade-in duration-200 shadow-sm"
          >
            <div className="w-4 h-4 rounded-[4px] flex items-center justify-center bg-[var(--primary-color)] flex-shrink-0 shadow-sm">
              <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            </div>
            <input
              ref={inputRef}
              type="text"
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              onBlur={() => !customInput && setIsAdding(false)}
              placeholder="Type your question..."
              className="text-[13px] font-medium text-[var(--text-color)] outline-none w-full bg-transparent placeholder:text-[var(--text-color-muted)]/60"
            />
          </form>
        )}

        {/* Load More Button */}
        {questions.length > 2 && (
          <button
            onClick={() => setShowMore(!showMore)}
            className="group flex items-center gap-2 w-fit py-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary-color)]/40 rounded-md transition-opacity hover:opacity-80"
          >
            <span className="text-xs font-medium text-[var(--primary-color)] hover:underline decoration-[var(--primary-color)]/40 underline-offset-4 transition-all">
              {showMore ? "Show fewer questions" : `View ${questions.length - 2} more questions`}
            </span>
            <div className="w-4 h-4 rounded-full flex items-center justify-center bg-[var(--primary-color)]/10 text-[var(--primary-color)] transition-transform duration-300">
              <svg
                className={`w-3 h-3 transition-transform duration-300 ${showMore ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </button>
        )}
      </div>
    </div>
  );
}