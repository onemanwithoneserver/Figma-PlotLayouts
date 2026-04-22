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
        className="flex items-center justify-between w-full px-3 py-2.5 rounded-[var(--radius-sm)] bg-white border border-[var(--border-subtle)] focus:outline-none focus:border-[var(--accent-primary)] transition-colors"
      >
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-medium text-[var(--text-muted)]">Plot Size</span>
          <span className="h-3 w-px bg-[var(--border-subtle)]" />
          <span className="text-[13px] font-semibold text-[var(--text-primary)]">{value.size}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-medium text-[var(--text-muted)]">
            Rs. {value.pricePerSqYd.toLocaleString('en-IN')}/Sq.Yd
          </span>
          <span className="text-[var(--text-muted)]">
            <ChevronDown open={open} />
          </span>
        </div>
      </button>

      {open && (
        <ul
          role="listbox"
          aria-label="Select plot size"
          className="absolute z-20 top-full mt-1 w-full rounded-[var(--radius-sm)] bg-white border border-[var(--border-subtle)] shadow-lg overflow-hidden"
        >
          {PLOTS.map((plot) => {
            const isSelected = plot.size === value.size;
            return (
              <li
                key={plot.size}
                role="option"
                aria-selected={isSelected}
                onClick={() => { onChange(plot); setOpen(false); }}
                className={`flex items-center justify-between px-3 py-2.5 cursor-pointer transition-colors ${
                  isSelected ? 'bg-[var(--accent-soft)]' : 'hover:bg-[var(--bg-section-light)]'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span
                    className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ background: isSelected ? 'var(--accent-primary)' : 'transparent' }}
                  />
                  <span className={`text-[13px] font-semibold ${isSelected ? 'text-[var(--accent-primary)]' : 'text-[var(--text-primary)]'}`}>
                    {plot.size}
                  </span>
                </div>
                <div className="text-right">
                  <p className={`text-[12px] font-bold ${isSelected ? 'text-[var(--accent-primary)]' : 'text-[var(--text-primary)]'}`}>
                    Rs. {((plot.pricePerSqYd * plot.sqYd) / 100000).toFixed(1)}L
                  </p>
                  <p className="text-[10px] text-[var(--text-muted)]">
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
  <div className="flex flex-col gap-1.5">
    {PLOTS.map((plot, i, arr) => (
      <div key={plot.size}>
        <div className="flex items-center justify-between px-1 py-2.5">
          <div>
            <p className="text-[13px] font-semibold text-[var(--text-primary)]">{plot.size} Plot</p>
            <p className="text-[11px] font-medium text-[var(--text-muted)] mt-0.5">
              Rs. {plot.pricePerSqYd.toLocaleString('en-IN')}/Sq.Yd
            </p>
          </div>
          <p className="text-[15px] font-bold text-[var(--accent-primary)]">
            Rs. {((plot.pricePerSqYd * plot.sqYd) / 100000).toFixed(1)}L
          </p>
        </div>
        {i < arr.length - 1 && <div className="h-px bg-[var(--border-subtle)]" />}
      </div>
    ))}
    <p className="text-[10px] font-medium text-[var(--text-muted)] mt-1 px-0.5">
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
    <div className="flex flex-col">
      <SizeDropdown value={selected} onChange={onSelect} />

      {items.map((row, i) => (
        <div key={row.label}>
          <div className="flex items-center justify-between py-2.5">
            <p className="text-[12px] font-medium text-[var(--text-muted)]">{row.label}</p>
            <p className="text-[12px] font-semibold text-[var(--text-primary)]">{row.value}</p>
          </div>
          {i < items.length - 1 && <div className="h-px bg-[var(--border-subtle)]" />}
        </div>
      ))}

      {/* Total row — glass card effect */}
      <div className="glass-cta flex items-center justify-between px-3 py-2.5 rounded-[var(--radius-md)] mt-2">
        <p className="text-[13px] font-semibold text-[var(--text-primary)]">Total (approx.)</p>
        <p className="text-[15px] font-bold text-[var(--accent-primary)]">{fmtINR(total)}</p>
      </div>

      <p className="text-[10px] font-medium text-[var(--text-muted)] mt-2 px-0.5">
        * Varies based on unit selection &amp; statutory charges
      </p>
    </div>
  );
};

// ---- Booking Tab ----
const BookingTab = () => (
  <div className="flex flex-col gap-1.5">
    {BOOKING_STEPS.map((row) => (
      <div
        key={row.label}
        className="flex items-start gap-3 px-3 py-2.5 rounded-[var(--radius-md)] bg-white border border-[var(--border-subtle)] hover:border-[var(--accent-border)] transition-colors"
      >
        <span className="mt-0.5 text-[10px] font-bold text-[var(--accent-primary)] bg-[var(--accent-soft)] w-6 h-6 flex-shrink-0 flex items-center justify-center rounded-[var(--radius-sm)]">
          {row.step}
        </span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <p className="text-[13px] font-semibold text-[var(--text-primary)]">{row.label}</p>
            <p className="text-[12px] font-semibold text-[var(--accent-primary)] flex-shrink-0">{row.value}</p>
          </div>
          <p className="text-[10px] font-medium text-[var(--text-muted)] mt-0.5">{row.note}</p>
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
    <div className="font-['Outfit',_sans-serif]">
      <SectionTabNav
        tabs={PAYMENT_TABS}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        layoutId="payment-active-pill"
      />
      <div className="px-3 py-3">
        {activeTab === 'price'   && <PriceTab />}
        {activeTab === 'cost'    && <CostTab    selected={selectedPlot} onSelect={setSelectedPlot} />}
        {activeTab === 'booking' && <BookingTab />}
      </div>
      <AskSeller initialQuestions={paymentAskSellerQuestions} />
    </div>
  );
};

export default PaymentPlan;