import React, { useState, useRef, useEffect } from 'react';
import SectionTabNav from '../shared/SectionTabNav';
import AskSeller from '../shared/AskSeller';
import { PLOTS, DEV_CHARGES, LEGAL_CHARGES, BOOKING_STEPS, PAYMENT_TABS, fmtINR, paymentAskSellerQuestions } from './data';
import type { Plot } from './data';

const ChevronDown = ({ open }: { open: boolean }) => (
  <svg
    width="14" height="14" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
    style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}
    aria-hidden="true"
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const SizeDropdown = ({ value, onChange }: { value: Plot; onChange: (p: Plot) => void }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={ref} className="relative mb-3">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex items-center justify-between w-full px-3 py-2.5 rounded-[var(--radius-sm)] bg-[var(--color-bg-white)] border border-[var(--color-border)] focus:outline-none focus:border-[var(--color-accent)] transition-colors shadow-sm"
      >
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-bold text-[var(--color-text-muted)] uppercase tracking-wide">Plot Size</span>
          <span className="h-3 w-px bg-[var(--color-border)]" />
          <span className="text-[13px] font-extrabold text-[var(--color-text-primary)]">{value.size}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-bold text-[var(--color-text-muted)]">
            Rs. {value.pricePerSqYd.toLocaleString('en-IN')}/Sq.Yd
          </span>
          <span className="text-[var(--color-text-muted)]">
            <ChevronDown open={open} />
          </span>
        </div>
      </button>

      {open && (
        <ul
          role="listbox"
          aria-label="Select plot size"
          className="absolute z-20 top-full mt-1.5 w-full rounded-[var(--radius-sm)] bg-[var(--color-bg-white)] border border-[var(--color-border)] shadow-[var(--glass-shadow)] overflow-hidden animate-fade-in"
        >
          {PLOTS.map((plot) => {
            const isSelected = plot.size === value.size;
            return (
              <li
                key={plot.size}
                role="option"
                aria-selected={isSelected}
                onClick={() => { onChange(plot); setOpen(false); }}
                className={`flex items-center justify-between px-3 py-2.5 cursor-pointer transition-colors ${isSelected ? 'bg-[var(--color-bg-soft)]' : 'hover:bg-[var(--color-bg-main)]'
                  }`}
              >
                <div className="flex items-center gap-2">
                  <span
                    className="w-2 h-2 rounded-full flex-shrink-0 transition-colors"
                    style={{ background: isSelected ? 'var(--color-accent)' : 'var(--color-bg-mid)' }}
                  />
                  <span className={`text-[13px] font-bold ${isSelected ? 'text-[var(--color-primary)]' : 'text-[var(--color-text-primary)]'}`}>
                    {plot.size}
                  </span>
                </div>
                <div className="text-right">
                  <p className={`text-[12px] font-extrabold ${isSelected ? 'text-[var(--color-primary)]' : 'text-[var(--color-text-primary)]'}`}>
                    Rs. {((plot.pricePerSqYd * plot.sqYd) / 100000).toFixed(1)}L
                  </p>
                  <p className="text-[10px] font-semibold text-[var(--color-text-muted)]">
                    Rs. {plot.pricePerSqYd.toLocaleString('en-IN')}/Sq.Yd
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

// ---- Price Tab ----
const PriceTab = () => (
  <div className="flex flex-col animate-fade-in">
    {PLOTS.map((plot, i, arr) => (
      <div key={plot.size} className="hover:bg-[var(--color-bg-soft)] transition-colors px-2 -mx-2 rounded-[var(--radius-sm)]">
        <div className="flex items-center justify-between py-2.5">
          <div>
            <p className="text-[13px] font-bold text-[var(--color-text-primary)]">{plot.size} Plot</p>
            <p className="text-[11px] font-semibold text-[var(--color-text-muted)] mt-0.5">
              Rs. {plot.pricePerSqYd.toLocaleString('en-IN')}/Sq.Yd
            </p>
          </div>
          <p className="text-[15px] font-extrabold text-[var(--color-accent)]">
            Rs. {((plot.pricePerSqYd * plot.sqYd) / 100000).toFixed(1)}L
          </p>
        </div>
        {i < arr.length - 1 && <div className="h-px bg-[var(--color-bg-mid)] mx-2" />}
      </div>
    ))}
    <p className="text-[10px] font-medium text-[var(--color-text-muted)] mt-2 italic px-0.5">
      * GST, registration &amp; development charges extra
    </p>
  </div>
);

// ---- Cost Tab ----
const CostTab = ({ selected, onSelect }: { selected: Plot; onSelect: (p: Plot) => void }) => {
  const plotCost = selected.pricePerSqYd * selected.sqYd;
  const gst = Math.round(plotCost * 0.05);
  const regCharges = Math.round(plotCost * 0.01);
  const total = plotCost + gst + regCharges + DEV_CHARGES + LEGAL_CHARGES;

  const items = [
    { label: `Plot Cost (${selected.size})`, value: fmtINR(plotCost) },
    { label: 'GST (5%)', value: fmtINR(gst) },
    { label: 'Registration Charges (1%)', value: fmtINR(regCharges) },
    { label: 'Development Charges', value: fmtINR(DEV_CHARGES) },
    { label: 'Documentation / Legal', value: fmtINR(LEGAL_CHARGES) },
  ];

  return (
    <div className="flex flex-col animate-fade-in">
      <SizeDropdown value={selected} onChange={onSelect} />

      <div className="bg-[var(--color-bg-white)] border border-[var(--color-border)] rounded-[var(--radius-sm)] px-3 py-1 shadow-sm mb-3">
        {items.map((row, i) => (
          <div key={row.label}>
            <div className="flex items-center justify-between py-2">
              <p className="text-[12px] font-semibold text-[var(--color-text-muted)]">{row.label}</p>
              <p className="text-[12.5px] font-bold text-[var(--color-text-primary)]">{row.value}</p>
            </div>
            {i < items.length - 1 && <div className="h-px bg-[var(--color-border)] opacity-50" />}
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between px-4 py-3 rounded-[var(--radius-sm)] shadow-[0_4px_16px_rgba(34,160,80,0.15)] transition-transform hover-lift" style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-accent))' }}>
        <p className="text-[13px] font-extrabold text-[var(--color-bg-white)] tracking-wide">Total (approx.)</p>
        <p className="text-[18px] font-black text-white drop-shadow-md">{fmtINR(total)}</p>
      </div>

      <p className="text-[10px] font-medium text-[var(--color-text-muted)] mt-2 italic px-0.5 text-center">
        * Varies based on unit selection &amp; statutory charges
      </p>
    </div>
  );
};

// ---- Booking Tab ----
const BookingTab = () => (
  <div className="flex flex-col gap-2 animate-fade-in">
    {BOOKING_STEPS.map((row) => (
      <div
        key={row.label}
        className="group flex items-start gap-3 px-3 py-3 rounded-[var(--radius-sm)] bg-[var(--color-bg-white)] border border-[var(--color-border)] hover:border-[var(--color-secondary)] hover:shadow-sm transition-all duration-200 cursor-pointer"
      >
        <span className="mt-0.5 text-[10px] font-extrabold text-white bg-[var(--color-accent)] w-[22px] h-[22px] flex-shrink-0 flex items-center justify-center rounded-[6px] shadow-sm group-hover:scale-110 transition-transform">
          {row.step}
        </span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <p className="text-[13px] font-bold text-[var(--color-text-primary)] group-hover:text-[var(--color-primary)] transition-colors">{row.label}</p>
            <p className="text-[12.5px] font-extrabold text-[var(--color-accent)] flex-shrink-0">{row.value}</p>
          </div>
          <p className="text-[11px] font-medium text-[var(--color-text-muted)] mt-1 leading-snug">{row.note}</p>
        </div>
      </div>
    ))}
  </div>
);

// ---- Root ----
const PaymentPlan: React.FC = () => {
  const [activeTab, setActiveTab] = useState(PAYMENT_TABS[0].id);
  const [selectedPlot, setSelectedPlot] = useState<Plot>(PLOTS[0]);

  return (
    <div className="font-outfit">
      <SectionTabNav
        tabs={PAYMENT_TABS}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        layoutId="payment-active-pill"
      />
      <div className="px-3 py-3 bg-[var(--color-bg-main)]">
        {activeTab === 'price' && <PriceTab />}
        {activeTab === 'cost' && <CostTab selected={selectedPlot} onSelect={setSelectedPlot} />}
        {activeTab === 'booking' && <BookingTab />}
      </div>
      <AskSeller initialQuestions={paymentAskSellerQuestions} className="bg-[var(--color-bg-main)]" />
    </div>
  );
};

export default PaymentPlan;