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
    <div className={`w-full px-4 pt-3 pb-3 space-y-3 font-['Outfit',_sans-serif] bg-[var(--background-color)] border-t border-[var(--border-color-subtle)] ${className}`}>

      {/* Header Row */}
      <div className="flex items-center justify-between gap-1">
        <h3 className="text-[14px] font-bold text-[var(--text-color)] leading-tight">Ask Seller</h3>

        {!isAdding && (
          <button
            type="button"
            onClick={() => setIsAdding(true)}
            className="inline-flex items-center gap-1.5 rounded-[4px] border border-[var(--primary-color)]/30 bg-white px-2 py-1 shadow-sm transition-all hover:border-[var(--primary-color)] hover:shadow-[0_2px_8px_var(--primary-alpha-12)] active:scale-[0.98]"
          >
            <span className="flex h-[18px] w-[18px] items-center justify-center rounded-[3px] bg-[var(--primary-color)] text-white">
              <svg className="h-2.5 w-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
            </span>
            <span className="text-[11px] font-bold leading-none text-[var(--primary-color-hover)]">Custom Question</span>
          </button>
        )}
      </div>

      {/* Questions List */}
      <div className="space-y-2.5">
        {visibleQuestions.map((q) => {
          const checked = selected.includes(q);
          return (
            <button
              key={q}
              onClick={() => toggleQuestion(q)}
              className="flex items-start gap-2.5 w-full text-left group transition-opacity active:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary-color)]/40 rounded-[4px]"
            >
              <div
                className={`mt-0.5 w-4 h-4 rounded-[4px] flex items-center justify-center flex-shrink-0 shadow-sm transition-all ${
                  checked ? "" : "bg-[var(--secondary-color)] border border-[var(--border-color)]"
                }`}
                style={checked ? { background: `linear-gradient(135deg, var(--primary-color), var(--primary-color-hover))` } : {}}
              >
                {checked && (
                  <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3.5} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              <span
                className={`text-[12px] font-semibold leading-tight transition-colors ${
                  checked ? "text-[var(--text-color)]" : "text-[var(--text-color-muted)]"
                } group-hover:text-[var(--primary-color)]`}
              >
                {q}
              </span>
            </button>
          );
        })}
      </div>

      {/* Footer Controls */}
      <div className="space-y-2.5">

        {/* Custom Question Input */}
        {isAdding && (
          <form
            onSubmit={handleAddCustom}
            className="flex items-center gap-2 w-full px-2.5 py-2 animate-in fade-in duration-200"
          >
            <div className="w-4 h-4 rounded-[4px] flex items-center justify-center border border-[var(--primary-color)] bg-[var(--primary-color)] flex-shrink-0">
              <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            </div>
            <input
              ref={inputRef}
              type="text"
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              onBlur={() => !customInput && setIsAdding(false)}
              placeholder="Type your question..."
              className="text-[12px] font-bold text-[var(--text-color)] outline-none border-b border-[var(--primary-color)] w-full pb-0.5 bg-transparent placeholder:text-[var(--text-color-muted)]/50"
            />
          </form>
        )}

        {/* Load More */}
        {questions.length > 2 && (
          <button
            onClick={() => setShowMore(!showMore)}
            className="flex items-center gap-2.5 w-full group focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary-color)]/40 rounded-[4px]"
          >
            <div className="w-4 h-4 rounded-[4px] flex items-center justify-center bg-[var(--secondary-color)] border border-[var(--border-color)] group-hover:border-[var(--primary-color)] transition-colors flex-shrink-0">
              <svg
                className={`w-2.5 h-2.5 text-[var(--text-color-muted)] group-hover:text-[var(--primary-color)] transition-transform ${
                  showMore ? "" : "rotate-180"
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 15l7-7 7 7" />
              </svg>
            </div>
            <span className="text-[12px] font-bold text-[var(--primary-color)] underline decoration-1 underline-offset-2">
              {showMore ? "Show fewer" : "Load more"}
            </span>
          </button>
        )}
      </div>
    </div>
  );
}