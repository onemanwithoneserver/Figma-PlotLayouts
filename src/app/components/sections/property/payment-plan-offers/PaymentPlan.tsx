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
        className="flex items-center justify-between w-full px-3 py-2.5 rounded-[4px] bg-[#ffffff] border border-[#C8DBCF] focus:outline-none focus:border-[#15653A] transition-colors shadow-sm"
      >
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-bold text-[#64786D] tracking-wide">Plot Size</span>
          <span className="h-3 w-px bg-[#C8DBCF]" />
          <span className="text-[13px] font-extrabold text-[#0B1F17]">{value.size}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-bold text-[#64786D]">
            Rs. {value.pricePerSqYd.toLocaleString('en-IN')}/Sq.Yd
          </span>
          <span className="text-[#64786D]">
            <ChevronDown open={open} />
          </span>
        </div>
      </button>

      {open && (
        <ul
          role="listbox"
          aria-label="Select plot size"
          className="absolute z-20 top-full mt-1.5 w-full rounded-[4px] bg-[#ffffff] border border-[#C8DBCF] shadow-[0_4px_14px_rgba(21,101,58,0.18)] overflow-hidden animate-fade-in"
        >
          {PLOTS.map((plot) => {
            const isSelected = plot.size === value.size;
            return (
              <li
                key={plot.size}
                role="option"
                aria-selected={isSelected}
                onClick={() => { onChange(plot); setOpen(false); }}
                className={`flex items-center justify-between px-3 py-2.5 cursor-pointer transition-colors ${isSelected ? 'bg-[#EEF4F0]' : 'hover:bg-[#EEF4F0]'}`}
              >
                <div className="flex items-center gap-2">
                  <span
                    className="w-2 h-2 rounded-full flex-shrink-0 transition-colors"
                    style={{ background: isSelected ? '#15653A' : '#C8DBCF' }}
                  />
                  <span className={`text-[13px] font-bold ${isSelected ? '#15653A' : 'text-[#0B1F17]'}`}>
                    {plot.size}
                  </span>
                </div>
                <div className="text-right">
                  <p className={`text-[12px] font-extrabold ${isSelected ? '#15653A' : 'text-[#0B1F17]'}`}>
                    Rs. {((plot.pricePerSqYd * plot.sqYd) / 100000).toFixed(1)}L
                  </p>
                  <p className="text-[10px] font-semibold text-[#64786D]">
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

const PriceTab = () => (
  <div className="flex flex-col animate-fade-in">
    {PLOTS.map((plot, i, arr) => (
      <div key={plot.size} className="hover:bg-[#EEF4F0] transition-colors px-2 -mx-2 rounded-[4px]">
        <div className="flex items-center justify-between py-2.5">
          <div>
            <p className="text-[13px] font-bold text-[#0B1F17]">{plot.size} Plot</p>
            <p className="text-[11px] font-semibold text-[#64786D] mt-0.5">
              Rs. {plot.pricePerSqYd.toLocaleString('en-IN')}/Sq.Yd
            </p>
          </div>
          <p className="text-[15px] font-extrabold text-[#15653A]">
            Rs. {((plot.pricePerSqYd * plot.sqYd) / 100000).toFixed(1)}L
          </p>
        </div>
        {i < arr.length - 1 && <div className="h-px bg-[#C8DBCF] mx-2" />}
      </div>
    ))}
    <p className="text-[10px] font-medium text-[#64786D] mt-2 italic px-0.5">
      * GST, registration &amp; development charges extra
    </p>
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
    <div className="flex flex-col animate-fade-in">
      <SizeDropdown value={selected} onChange={onSelect} />

      <div className="bg-[#ffffff] border border-[#C8DBCF] rounded-[4px] px-3 py-1 shadow-sm mb-3">
        {items.map((row, i) => (
          <div key={row.label}>
            <div className="flex items-center justify-between py-2">
              <p className="text-[12px] font-semibold text-[#64786D]">{row.label}</p>
              <p className="text-[12.5px] font-bold text-[#0B1F17]">{row.value}</p>
            </div>
            {i < items.length - 1 && <div className="h-px bg-[#C8DBCF] opacity-50" />}
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between px-4 py-3 rounded-[4px] shadow-[0_4px_16px_rgba(21,101,58,0.15)] transition-transform hover:scale-[1.01]" style={{ background: 'linear-gradient(135deg, #15653A, #2F7D4E)' }}>
        <p className="text-[13px] font-extrabold text-[#ffffff] tracking-wide">Total (approx.)</p>
        <p className="text-[18px] font-black text-white drop-shadow-md">{fmtINR(total)}</p>
      </div>

      <p className="text-[10px] font-medium text-[#64786D] mt-2 italic px-0.5 text-center">
        * Varies based on unit selection &amp; statutory charges
      </p>
    </div>
  );
};

const BookingTab = () => (
  <div className="flex flex-col gap-2 animate-fade-in">
    {BOOKING_STEPS.map((row) => (
      <div
        key={row.label}
        className="group flex items-start gap-3 px-3 py-3 rounded-[4px] bg-[#ffffff] border border-[#C8DBCF] hover:border-[#15653A] hover:shadow-sm transition-all duration-200 cursor-pointer"
      >
        <span className="mt-0.5 text-[10px] font-extrabold text-white bg-[#15653A] w-[22px] h-[22px] flex-shrink-0 flex items-center justify-center rounded-[6px] shadow-sm group-hover:scale-110 transition-transform">
          {row.step}
        </span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <p className="text-[13px] font-bold text-[#0B1F17] group-hover:text-[#15653A] transition-colors">{row.label}</p>
            <p className="text-[12.5px] font-extrabold text-[#15653A] flex-shrink-0">{row.value}</p>
          </div>
          <p className="text-[11px] font-medium text-[#64786D] mt-1 leading-snug">{row.note}</p>
        </div>
      </div>
    ))}
  </div>
);

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
      <div className="px-3 py-3 bg-[#ffffff]">
        {activeTab === 'price' && <PriceTab />}
        {activeTab === 'cost' && <CostTab selected={selectedPlot} onSelect={setSelectedPlot} />}
        {activeTab === 'booking' && <BookingTab />}
      </div>
      <AskSeller initialQuestions={paymentAskSellerQuestions} className="bg-[#ffffff]" />
    </div>
  );
};

export default PaymentPlan;