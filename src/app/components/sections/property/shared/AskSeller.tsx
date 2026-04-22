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
    <div className={`w-full px-4 pt-3 pb-3 space-y-3 font-outfit bg-[var(--color-bg-white)] border-t border-[var(--color-border)] ${className}`}>
      <div className="flex items-center justify-between gap-1">
        <h3 className="text-[14px] font-bold text-[var(--color-text-primary)] leading-tight">Ask Seller</h3>

        {!isAdding && (
          <button
            type="button"
            onClick={() => setIsAdding(true)}
            className="inline-flex items-center gap-1.5 rounded-[4px] border border-[var(--color-primary)]/30 bg-[var(--color-bg-white)] px-2 py-1 shadow-sm transition-all hover:border-[var(--color-primary)] hover:shadow-[0_2px_8px_rgba(34,160,80,0.12)] active:scale-[0.98]"
          >
            <span className="flex h-[18px] w-[18px] items-center justify-center rounded-[3px] bg-[var(--color-primary)] text-white">
              <svg className="h-2.5 w-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
            </span>
            <span className="text-[11px] font-bold leading-none text-[var(--color-secondary)]">Custom Question</span>
          </button>
        )}
      </div>

      <div className="space-y-2.5">
        {visibleQuestions.map((q) => {
          const checked = selected.includes(q);
          return (
            <button
              key={q}
              onClick={() => toggleQuestion(q)}
              className="flex items-start gap-2.5 w-full text-left group transition-opacity active:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]/40 rounded-[4px]"
            >
              <div
                className={`mt-0.5 w-4 h-4 rounded-[4px] flex items-center justify-center flex-shrink-0 shadow-sm transition-all ${checked ? "" : "bg-[var(--color-bg-soft)] border border-[var(--color-border)]"
                  }`}
                style={checked ? { background: `linear-gradient(135deg, var(--color-primary), var(--color-secondary))` } : {}}
              >
                {checked && (
                  <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3.5} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              <span
                className={`text-[12px] font-semibold leading-tight transition-colors ${checked ? "text-[var(--color-text-primary)]" : "text-[var(--color-text-muted)]"
                  } group-hover:text-[var(--color-primary)]`}
              >
                {q}
              </span>
            </button>
          );
        })}
      </div>

      <div className="space-y-2.5">
        {isAdding && (
          <form
            onSubmit={handleAddCustom}
            className="flex items-center gap-2 w-full px-2.5 py-2 animate-in fade-in duration-200"
          >
            <div className="w-4 h-4 rounded-[4px] flex items-center justify-center border border-[var(--color-primary)] bg-[var(--color-primary)] flex-shrink-0">
              <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-bg-white)] animate-pulse" />
            </div>
            <input
              ref={inputRef}
              type="text"
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              onBlur={() => !customInput && setIsAdding(false)}
              placeholder="Type your question..."
              className="text-[12px] font-bold text-[var(--color-text-primary)] outline-none border-b border-[var(--color-primary)] w-full pb-0.5 bg-transparent placeholder:text-[var(--color-text-muted)]/50"
            />
          </form>
        )}

        {questions.length > 2 && (
          <button
            onClick={() => setShowMore(!showMore)}
            className="flex items-center gap-2.5 w-full group focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]/40 rounded-[4px]"
          >
            <div className="w-4 h-4 rounded-[4px] flex items-center justify-center bg-[var(--color-bg-soft)] border border-[var(--color-border)] group-hover:border-[var(--color-primary)] transition-colors flex-shrink-0">
              <svg
                className={`w-2.5 h-2.5 text-[var(--color-text-muted)] group-hover:text-[var(--color-primary)] transition-transform ${showMore ? "" : "rotate-180"
                  }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 15l7-7 7 7" />
              </svg>
            </div>
            <span className="text-[12px] font-bold text-[var(--color-primary)] underline decoration-1 underline-offset-2">
              {showMore ? "Show fewer" : "Load more"}
            </span>
          </button>
        )}
      </div>
    </div>
  );
}