import React, { useState, useRef, useEffect } from 'react';
import SectionTabNav from '../shared/SectionTabNav';
import AskSeller from '../shared/AskSeller';
import { PLOTS, DEV_CHARGES, LEGAL_CHARGES, BOOKING_STEPS, PAYMENT_TABS, fmtINR, paymentAskSellerQuestions } from './data';
import type { Plot } from './data';

const ChevronDown = ({ open }: { open: boolean }) => (
  <svg
    width="14" height="14" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
    style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.28s cubic-bezier(0.4, 0, 0.2, 1)' }}
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
    <div ref={ref} className="relative mb-3 z-30">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        className="group flex items-center justify-between w-full px-3 py-2.5 rounded-[8px] bg-[rgba(255,255,255,0.62)] backdrop-blur-[8px] border border-[rgba(255,255,255,0.68)] shadow-[0_1px_6px_rgba(31,65,46,0.08)] focus:outline-none focus:border-[#2F6F4E] transition-all duration-[240ms] ease-[cubic-bezier(0.4,0,0.2,1)] hover:bg-[rgba(255,255,255,0.76)] hover:shadow-[0_2px_8px_rgba(31,65,46,0.1)] overflow-hidden relative"
      >
        <div className="flex items-center gap-2 relative z-10">
          <span className="text-[12px] font-semibold text-[#5a665e] uppercase tracking-[0.05em] group-hover:text-[#46524a] transition-colors">Plot Size</span>
          <span className="h-3 w-px bg-[rgba(0,0,0,0.1)]" />
          <span className="text-[14px] font-bold text-[#142218] tracking-tight">{value.size}</span>
        </div>
        <div className="flex items-center gap-2 relative z-10">
          <span className="text-[12px] font-semibold text-[#4f5b53]">
            ₹{value.pricePerSqYd.toLocaleString('en-IN')} / Sq.Yd
          </span>
          <span className="text-[#2F6F4E]">
            <ChevronDown open={open} />
          </span>
        </div>
      </button>

      {open && (
        <ul
          role="listbox"
          aria-label="Select plot size"
          className="absolute z-40 top-full mt-1 w-full rounded-[8px] bg-[rgba(255,255,255,0.84)] backdrop-blur-[10px] border border-[rgba(255,255,255,0.72)] shadow-[0_3px_10px_rgba(31,65,46,0.12)] overflow-hidden animate-fade-blur-in opacity-0"
        >
          {PLOTS.map((plot) => {
            const isSelected = plot.size === value.size;
            return (
              <li
                key={plot.size}
                role="option"
                onClick={() => { onChange(plot); setOpen(false); }}
                className={`flex items-center justify-between px-3 py-2 cursor-pointer transition-colors duration-[240ms] ${isSelected ? 'bg-[rgba(47,111,78,0.08)]' : 'hover:bg-[rgba(255,255,255,0.9)]'}`}
              >
                <div className="flex items-center gap-2">
                  <span
                    className={`w-2 h-2 rounded-full flex-shrink-0 transition-all duration-[240ms] ${isSelected ? 'bg-[#2F6F4E] scale-110 shadow-[0_0_6px_rgba(47,111,78,0.34)]' : 'bg-[#a9b6ad]'}`}
                  />
                  <span className={`text-[13px] font-bold tracking-tight ${isSelected ? 'text-[#2F6F4E]' : 'text-[#142218]'}`}>
                    {plot.size}
                  </span>
                </div>
                <div className="text-right">
                  <p className={`text-[13px] font-bold ${isSelected ? 'text-[#2F6F4E]' : 'text-[#142218]'}`}>
                    ₹{((plot.pricePerSqYd * plot.sqYd) / 100000).toFixed(1)}L
                  </p>
                  <p className="text-[11px] font-medium text-[#5a665e]">
                    ₹{plot.pricePerSqYd.toLocaleString('en-IN')} / Sq.Yd
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

const PriceTab = () => (
  <div className="flex flex-col bg-[rgba(255,255,255,0.62)] backdrop-blur-[8px] rounded-[8px] border border-[rgba(255,255,255,0.68)] shadow-[0_1px_6px_rgba(31,65,46,0.08)] animate-fade-blur-in opacity-0 overflow-hidden">
    {PLOTS.map((plot, i, arr) => (
      <div key={plot.size} className="group transition-colors duration-[240ms] ease-[cubic-bezier(0.4,0,0.2,1)] hover:bg-[rgba(255,255,255,0.74)] relative">
        <div className="flex items-center justify-between px-3 py-2.5 cursor-pointer relative z-20">
          <div>
            <p className="text-[13px] font-bold text-[#142218] transition-colors duration-[240ms]">{plot.size} Plot</p>
            <p className="text-[11px] font-medium text-[#5a665e] transition-colors duration-[240ms] group-hover:text-[#46524a]">
              ₹{plot.pricePerSqYd.toLocaleString('en-IN')} / Sq.Yd
            </p>
          </div>
          <p className="text-[15px] font-bold text-[#2F6F4E] tracking-tight transition-transform duration-[240ms] group-hover:scale-[1.02]">
            ₹{((plot.pricePerSqYd * plot.sqYd) / 100000).toFixed(1)}L
          </p>
        </div>
        {i < arr.length - 1 && <div className="h-[1px] bg-gradient-to-r from-transparent via-[rgba(0,0,0,0.06)] to-transparent w-full" />}
      </div>
    ))}
    <div className="bg-[rgba(0,0,0,0.02)] px-3 py-1.5 border-t border-[rgba(0,0,0,0.04)]">
      <p className="text-[11px] font-medium text-[#5a665e] italic">
        * GST, registration &amp; development charges extra
      </p>
    </div>
  </div>
);

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
    <div className="flex flex-col animate-fade-blur-in opacity-0" style={{ animationDelay: '40ms' }}>
      <SizeDropdown value={selected} onChange={onSelect} />

      <div className="bg-[rgba(255,255,255,0.62)] backdrop-blur-[8px] border border-[rgba(255,255,255,0.68)] rounded-[8px] px-3 py-1.5 shadow-[0_1px_6px_rgba(31,65,46,0.08)] mb-3">
        {items.map((row, i) => (
          <div key={row.label}>
            <div className="flex items-center justify-between py-2">
              <p className="text-[13px] font-semibold text-[#4f5b53]">{row.label}</p>
              <p className="text-[13px] font-bold text-[#142218] tracking-tight">{row.value}</p>
            </div>
            {i < items.length - 1 && <div className="h-[1px] bg-gradient-to-r from-transparent via-[rgba(0,0,0,0.06)] to-transparent w-full" />}
          </div>
        ))}
      </div>

      <div className="relative flex items-center justify-between px-3 py-3 rounded-[8px] bg-[#2F6F4E] shadow-[0_2px_8px_rgba(31,65,46,0.22)] transition-all duration-[240ms] hover:-translate-y-[1px]">
        <p className="text-[14px] font-semibold text-[#FFFFFF] tracking-wide relative z-20">Total (approx.)</p>
        <p className="text-[20px] font-bold text-[#FFFFFF] tracking-tight relative z-20">{fmtINR(total)}</p>
      </div>

      <p className="text-[11px] font-medium text-[#5a665e] mt-2 italic text-center">
        * Varies based on unit selection &amp; statutory charges
      </p>
    </div>
  );
};

const BookingTab = () => (
  <div className="flex flex-col gap-2">
    {BOOKING_STEPS.map((row, index) => {
      const delay = 40 + index * 40;
      return (
        <div
          key={row.label}
          className="group relative flex items-start gap-3 px-3 py-2.5 rounded-[8px] bg-[rgba(255,255,255,0.62)] backdrop-blur-[8px] border border-[rgba(255,255,255,0.68)] shadow-[0_1px_6px_rgba(31,65,46,0.08)] transition-all duration-[240ms] ease-[cubic-bezier(0.4,0,0.2,1)] hover:-translate-y-[1px] hover:bg-[rgba(255,255,255,0.76)] hover:shadow-[0_2px_8px_rgba(31,65,46,0.1)] overflow-hidden animate-fade-blur-in opacity-0"
          style={{ animationDelay: `${delay}ms` }}
        >
          <span className="text-[12px] font-bold text-[#2F6F4E] bg-[rgba(47,111,78,0.08)] border border-[rgba(47,111,78,0.14)] w-7 h-7 flex-shrink-0 flex items-center justify-center rounded-[8px] group-hover:bg-[rgba(47,111,78,0.12)] group-hover:scale-[1.03] transition-all duration-[240ms] relative z-20">
            {row.step}
          </span>
          
          <div className="flex-1 min-w-0 relative z-20">
            <div className="flex items-center justify-between gap-2">
              <p className="text-[14px] font-bold text-[#142218] transition-colors duration-[240ms] tracking-tight">{row.label}</p>
              <p className="text-[13px] font-bold text-[#B84B2C] flex-shrink-0 tracking-tight transition-transform duration-[240ms] group-hover:scale-[1.02]">{row.value}</p>
            </div>
            <p className="text-[12px] font-medium text-[#5a665e] mt-0.5 leading-snug transition-colors duration-[240ms] group-hover:text-[#46524a]">{row.note}</p>
          </div>
        </div>
      );
    })}
  </div>
);

const PaymentPlan: React.FC = () => {
  const [activeTab, setActiveTab] = useState(PAYMENT_TABS[0].id);
  const [selectedPlot, setSelectedPlot] = useState<Plot>(PLOTS[0]);

  return (
    <div className="w-full">
      <SectionTabNav
        tabs={PAYMENT_TABS}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        layoutId="payment-active-pill"
      />
      <div className="px-2 py-3">
        {activeTab === 'price' && <PriceTab />}
        {activeTab === 'cost' && <CostTab selected={selectedPlot} onSelect={setSelectedPlot} />}
        {activeTab === 'booking' && <BookingTab />}
      </div>
      <div className="pb-4">
        <AskSeller initialQuestions={paymentAskSellerQuestions} />
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fadeBlurIn { 
          from { opacity: 0; filter: blur(6px); transform: translateY(12px); } 
          to { opacity: 1; filter: blur(0px); transform: translateY(0); } 
        }
        .animate-fade-blur-in { animation: fadeBlurIn 0.28s cubic-bezier(0.4, 0, 0.2, 1) forwards; }
      `}} />
    </div>
  );
};

export default PaymentPlan;