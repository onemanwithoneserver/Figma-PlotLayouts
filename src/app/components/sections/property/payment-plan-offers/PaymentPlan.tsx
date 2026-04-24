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
        aria-expanded={open}
        className="group flex items-center justify-between w-full px-3 py-2.5 rounded-[8px] bg-[rgba(255,255,255,0.65)] backdrop-blur-[20px] border border-[rgba(255,255,255,0.6)] shadow-[0_4px_12px_rgba(0,0,0,0.04),inset_0_1px_0_rgba(255,255,255,0.8)] focus:outline-none focus:border-[#2F6F4E] transition-all duration-[280ms] ease-[cubic-bezier(0.4,0,0.2,1)] hover:bg-[rgba(255,255,255,0.85)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] overflow-hidden relative"
      >
        <div className="absolute top-0 -left-[100%] w-[50%] h-full bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.5)] to-transparent skew-x-[-20deg] transition-all duration-[600ms] ease-in-out group-hover:left-[200%] pointer-events-none" />

        <div className="flex items-center gap-2 relative z-10">
          <span className="text-[12px] font-semibold text-[#6B7280] uppercase tracking-[0.05em] group-hover:text-[#4A5560] transition-colors">Plot Size</span>
          <span className="h-3 w-px bg-[rgba(0,0,0,0.1)]" />
          <span className="text-[14px] font-bold text-[#1A1F24] tracking-tight">{value.size}</span>
        </div>
        <div className="flex items-center gap-2 relative z-10">
          <span className="text-[12px] font-semibold text-[#4A5560]">
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
          className="absolute z-40 top-full mt-1 w-full rounded-[8px] bg-[rgba(255,255,255,0.85)] backdrop-blur-[24px] border border-[rgba(255,255,255,0.8)] shadow-[0_12px_32px_rgba(0,0,0,0.12)] overflow-hidden animate-fade-blur-in opacity-0"
        >
          {PLOTS.map((plot) => {
            const isSelected = plot.size === value.size;
            return (
              <li
                key={plot.size}
                role="option"
                aria-selected={isSelected}
                onClick={() => { onChange(plot); setOpen(false); }}
                className={`flex items-center justify-between px-3 py-2 cursor-pointer transition-colors duration-[280ms] ${isSelected ? 'bg-[rgba(47,111,78,0.08)]' : 'hover:bg-[rgba(255,255,255,0.9)]'}`}
              >
                <div className="flex items-center gap-2">
                  <span
                    className={`w-2 h-2 rounded-full flex-shrink-0 transition-all duration-[280ms] ${isSelected ? 'bg-[#2F6F4E] scale-110 shadow-[0_0_8px_rgba(47,111,78,0.4)]' : 'bg-[#C8A97E]'}`}
                  />
                  <span className={`text-[13px] font-bold tracking-tight ${isSelected ? 'text-[#2F6F4E]' : 'text-[#1A1F24]'}`}>
                    {plot.size}
                  </span>
                </div>
                <div className="text-right">
                  <p className={`text-[13px] font-bold ${isSelected ? 'text-[#2F6F4E]' : 'text-[#1A1F24]'}`}>
                    ₹{((plot.pricePerSqYd * plot.sqYd) / 100000).toFixed(1)}L
                  </p>
                  <p className="text-[11px] font-medium text-[#6B7280]">
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
  <div className="flex flex-col bg-[rgba(255,255,255,0.65)] backdrop-blur-[20px] rounded-[8px] border border-[rgba(255,255,255,0.6)] shadow-[0_4px_12px_rgba(0,0,0,0.04),inset_0_1px_0_rgba(255,255,255,0.8)] animate-fade-blur-in opacity-0 overflow-hidden">
    {PLOTS.map((plot, i, arr) => (
      <div key={plot.size} className="group transition-colors duration-[280ms] ease-[cubic-bezier(0.4,0,0.2,1)] hover:bg-[rgba(255,255,255,0.85)] relative">
        <div className="absolute top-0 -left-[100%] w-[50%] h-full bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.4)] to-transparent skew-x-[-20deg] transition-all duration-[600ms] ease-in-out group-hover:left-[200%] pointer-events-none z-10" />
        
        <div className="flex items-center justify-between px-3 py-2.5 cursor-pointer relative z-20">
          <div>
            <p className="text-[13px] font-bold text-[#1A1F24] transition-colors duration-[280ms]">{plot.size} Plot</p>
            <p className="text-[11px] font-medium text-[#6B7280] transition-colors duration-[280ms] group-hover:text-[#4A5560]">
              ₹{plot.pricePerSqYd.toLocaleString('en-IN')} / Sq.Yd
            </p>
          </div>
          <p className="text-[15px] font-bold text-[#2F6F4E] tracking-tight transition-transform duration-[280ms] group-hover:scale-105">
            ₹{((plot.pricePerSqYd * plot.sqYd) / 100000).toFixed(1)}L
          </p>
        </div>
        {i < arr.length - 1 && <div className="h-[1px] bg-gradient-to-r from-transparent via-[rgba(0,0,0,0.06)] to-transparent w-full" />}
      </div>
    ))}
    <div className="bg-[rgba(0,0,0,0.02)] px-3 py-1.5 border-t border-[rgba(0,0,0,0.04)]">
      <p className="text-[11px] font-medium text-[#6B7280] italic">
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

      <div className="bg-[rgba(255,255,255,0.65)] backdrop-blur-[20px] border border-[rgba(255,255,255,0.6)] rounded-[8px] px-3 py-1.5 shadow-[0_4px_12px_rgba(0,0,0,0.04),inset_0_1px_0_rgba(255,255,255,0.8)] mb-3">
        {items.map((row, i) => (
          <div key={row.label}>
            <div className="flex items-center justify-between py-2">
              <p className="text-[13px] font-semibold text-[#4A5560]">{row.label}</p>
              <p className="text-[13px] font-bold text-[#1A1F24] tracking-tight">{row.value}</p>
            </div>
            {i < items.length - 1 && <div className="h-[1px] bg-gradient-to-r from-transparent via-[rgba(0,0,0,0.06)] to-transparent w-full" />}
          </div>
        ))}
      </div>

      <div className="relative group flex items-center justify-between px-3 py-3 rounded-[8px] bg-[#2F6F4E] shadow-[0_8px_24px_rgba(47,111,78,0.25)] transition-all duration-[280ms] hover:-translate-y-[2px] overflow-hidden">
        <div className="absolute top-0 -left-[100%] w-[50%] h-full bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.15)] to-transparent skew-x-[-20deg] transition-all duration-[600ms] ease-in-out group-hover:left-[200%] pointer-events-none z-10" />
        <p className="text-[14px] font-semibold text-[#FFFFFF] tracking-wide relative z-20">Total (approx.)</p>
        <p className="text-[20px] font-bold text-[#FFFFFF] drop-shadow-md tracking-tight relative z-20">{fmtINR(total)}</p>
      </div>

      <p className="text-[11px] font-medium text-[#6B7280] mt-2 italic text-center">
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
          className="group relative flex items-start gap-3 px-3 py-2.5 rounded-[8px] bg-[rgba(255,255,255,0.65)] backdrop-blur-[20px] border border-[rgba(255,255,255,0.6)] shadow-[0_4px_12px_rgba(0,0,0,0.04),inset_0_1px_0_rgba(255,255,255,0.8)] transition-all duration-[280ms] ease-[cubic-bezier(0.4,0,0.2,1)] hover:-translate-y-[2px] hover:scale-[1.01] hover:bg-[rgba(255,255,255,0.85)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] overflow-hidden animate-fade-blur-in opacity-0"
          style={{ animationDelay: `${delay}ms` }}
        >
          <div className="absolute top-0 -left-[100%] w-[50%] h-full bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.5)] to-transparent skew-x-[-20deg] transition-all duration-[600ms] ease-in-out group-hover:left-[200%] pointer-events-none z-10" />

          <span className="text-[12px] font-bold text-[#2F6F4E] bg-[rgba(47,111,78,0.08)] border border-[rgba(47,111,78,0.15)] w-7 h-7 flex-shrink-0 flex items-center justify-center rounded-[8px] group-hover:bg-[rgba(47,111,78,0.15)] group-hover:scale-110 transition-all duration-[280ms] relative z-20">
            {row.step}
          </span>
          
          <div className="flex-1 min-w-0 relative z-20">
            <div className="flex items-center justify-between gap-2">
              <p className="text-[14px] font-bold text-[#1A1F24] transition-colors duration-[280ms] tracking-tight">{row.label}</p>
              <p className="text-[13px] font-bold text-[#C65A3A] flex-shrink-0 tracking-tight transition-transform duration-[280ms] group-hover:scale-105">{row.value}</p>
            </div>
            <p className="text-[12px] font-medium text-[#6B7280] mt-0.5 leading-snug transition-colors duration-[280ms] group-hover:text-[#4A5560]">{row.note}</p>
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