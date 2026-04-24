import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
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
    <div ref={ref} className="relative mb-4 z-30">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex items-center justify-between w-full px-4 py-3 rounded-[8px] bg-[#ECECE8] shadow-[3px_3px_6px_#CBCBC7,-3px_-3px_6px_#FFFFFF] focus:outline-none transition-shadow duration-200 active:shadow-[inset_2px_2px_4px_#CBCBC7,inset_-2px_-2px_4px_#FFFFFF]"
      >
        <div className="flex items-center gap-2.5">
          <span className="text-[12px] font-semibold text-[#5C6B63] uppercase tracking-[0.05em]">Plot Size</span>
          <span className="h-3 w-px bg-[rgba(0,0,0,0.1)]" />
          <span className="text-[14px] font-bold text-[#1A2B22] tracking-tight">{value.size}</span>
        </div>
        <div className="flex items-center gap-2 relative z-10">
          <span className="text-[12px] font-semibold text-[#3D5048]">
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
          className="absolute z-40 top-full mt-2 w-full rounded-[8px] bg-[#ECECE8] shadow-[5px_5px_10px_#CBCBC7,-5px_-5px_10px_#FFFFFF] overflow-hidden animate-fade-blur-in opacity-0"
        >
          {PLOTS.map((plot) => {
            const isSelected = plot.size === value.size;
            return (
              <li
                key={plot.size}
                role="option"
                aria-selected={isSelected}
                onClick={() => { onChange(plot); setOpen(false); }}
                className={`flex items-center justify-between px-4 py-3 cursor-pointer transition-colors duration-200 ${isSelected ? 'bg-[rgba(47,111,78,0.08)]' : 'hover:bg-[rgba(47,111,78,0.04)]'}`}
              >
                <div className="flex items-center gap-2.5">
                  <span
                    className={`w-2 h-2 rounded-full flex-shrink-0 transition-all duration-[280ms] ${isSelected ? 'bg-[#2F6F4E] scale-110 shadow-[0_0_8px_rgba(47,111,78,0.4)]' : 'bg-[#C8A97E]'}`}
                  />
                  <span className={`text-[13px] font-bold tracking-tight ${isSelected ? 'text-[#2F6F4E]' : 'text-[#1A2B22]'}`}>
                    {plot.size}
                  </span>
                </div>
                <div className="text-right">
                  <p className={`text-[13px] font-bold ${isSelected ? 'text-[#2F6F4E]' : 'text-[#1A2B22]'}`}>
                    ₹{((plot.pricePerSqYd * plot.sqYd) / 100000).toFixed(1)}L
                  </p>
                  <p className="text-[11px] font-medium text-[#5C6B63] mt-[1px]">
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
  <div className="flex flex-col bg-[#ECECE8] shadow-[5px_5px_10px_#CBCBC7,-5px_-5px_10px_#FFFFFF] rounded-[8px] animate-fade-blur-in opacity-0 overflow-hidden neu-shimmer-surface">
    {PLOTS.map((plot, i, arr) => (
      <div key={plot.size} className="relative transition-shadow duration-200 active:shadow-[inset_1px_1px_2px_#CBCBC7]">
        
          <div className="flex items-center justify-between px-4 py-3.5 cursor-pointer">
          <div>
            <p className="text-[13px] font-bold text-[#1A2B22]">{plot.size} Plot</p>
            <p className="text-[11px] font-medium text-[#5C6B63] mt-0.5">
              ₹{plot.pricePerSqYd.toLocaleString('en-IN')} / Sq.Yd
            </p>
          </div>
          <p className="text-[15px] font-bold text-[#2F6F4E] tracking-tight">
            ₹{((plot.pricePerSqYd * plot.sqYd) / 100000).toFixed(1)}L
          </p>
        </div>
        {i < arr.length - 1 && <div className="h-[1px] bg-gradient-to-r from-transparent via-[rgba(0,0,0,0.06)] to-transparent w-full" />}
      </div>
    ))}
    <div className="px-4 py-2 border-t border-[rgba(0,0,0,0.06)]">
      <p className="text-[11px] font-medium text-[#5C6B63] italic">
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

      <div className="bg-[#ECECE8] shadow-[4px_4px_8px_#CBCBC7,-4px_-4px_8px_#FFFFFF] border border-[rgba(0,0,0,0.04)] rounded-[8px] px-4 py-2 mb-4">
        {items.map((row, i) => (
          <div key={row.label}>
            <div className="flex items-center justify-between py-2.5">
              <p className="text-[13px] font-semibold text-[#3D5048]">{row.label}</p>
              <p className="text-[13px] font-bold text-[#1A2B22] tracking-tight">{row.value}</p>
            </div>
            {i < items.length - 1 && <div className="h-[1px] bg-gradient-to-r from-transparent via-[rgba(0,0,0,0.06)] to-transparent w-full" />}
          </div>
        ))}
      </div>

      {/* Grand Total */}
      <div className="flex items-center justify-between px-4 py-4 rounded-[8px] bg-[#2F6F4E] shadow-[4px_4px_8px_#CBCBC7,-4px_-4px_8px_#FFFFFF] active:shadow-[inset_2px_2px_4px_rgba(0,0,0,0.2)] transition-shadow duration-200">
        <p className="text-[14px] font-semibold text-[#FFFFFF] tracking-wide">Total (approx.)</p>
        <p className="text-[20px] font-bold text-[#FFFFFF] tracking-tight">{fmtINR(total)}</p>
      </div>

      <p className="text-[11px] font-medium text-[#5C6B63] mt-3 italic px-1 text-center">
        * Varies based on unit selection &amp; statutory charges
      </p>
    </div>
  );
};

const BookingTab = () => (
  <div className="flex flex-col gap-3">
    {BOOKING_STEPS.map((row, index) => {
      const delay = 40 + index * 40;
      return (
        <motion.div
          key={row.label}
          className="group relative flex items-start gap-3.5 px-4 py-3.5 rounded-[8px] bg-[#ECECE8] shadow-[3px_3px_6px_#CBCBC7,-3px_-3px_6px_#FFFFFF] active:shadow-[inset_2px_2px_4px_#CBCBC7,inset_-2px_-2px_4px_#FFFFFF] transition-shadow duration-200 animate-fade-blur-in opacity-0"
          style={{ animationDelay: `${delay}ms`, transformPerspective: 600 }}
          whileTap={{ scale: 0.97, rotateX: 5 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        >
          {/* Step Indicator */}
          <span className="mt-0.5 text-[12px] font-bold text-[#2F6F4E] bg-[#ECECE8] shadow-[inset_2px_2px_4px_#CBCBC7,inset_-2px_-2px_4px_#FFFFFF] w-7 h-7 flex-shrink-0 flex items-center justify-center rounded-[8px] transition-all duration-200">
            {row.step}
          </span>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2">
              <p className="text-[14px] font-bold text-[#1A2B22] tracking-tight">{row.label}</p>
              <p className="text-[13px] font-bold text-[#C65A3A] flex-shrink-0 tracking-tight">{row.value}</p>
            </div>
            <p className="text-[12px] font-medium text-[#5C6B63] mt-1 leading-snug">{row.note}</p>
          </div>
        </motion.div>
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
      <div className="px-3 py-4">
        {activeTab === 'price' && <PriceTab />}
        {activeTab === 'cost' && <CostTab selected={selectedPlot} onSelect={setSelectedPlot} />}
        {activeTab === 'booking' && <BookingTab />}
      </div>
      <div className="pb-6">
        <AskSeller initialQuestions={paymentAskSellerQuestions} />
      </div>
    </div>
  );
};

export default PaymentPlan;