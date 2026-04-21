import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';
import SectionTabNav from '../shared/SectionTabNav';

// ---- Tab content ----

const PriceTab = () => (
  <div className="flex flex-col gap-3">
    {[
      { size: '100 Sq.Yd', pricePerSqYd: 18000, totalCost: 1800000 },
      { size: '150 Sq.Yd', pricePerSqYd: 17500, totalCost: 2625000 },
      { size: '200 Sq.Yd', pricePerSqYd: 16800, totalCost: 3360000 },
      { size: '240 Sq.Yd', pricePerSqYd: 16000, totalCost: 3840000 },
    ].map((row) => (
      <div key={row.size} className="flex items-center justify-between px-3 py-2.5 rounded-[4px] bg-[#F5F5F5] border border-[#E0E0E0]">
        <div>
          <Typography sx={{ fontSize: '0.8125rem', fontWeight: 700, color: '#1A1A1A' }}>
            {row.size} Plot
          </Typography>
          <Typography sx={{ fontSize: '0.6875rem', color: '#666666' }}>
            ?{row.pricePerSqYd.toLocaleString('en-IN')}/Sq.Yd
          </Typography>
        </div>
        <Typography sx={{ fontSize: '0.875rem', fontWeight: 800, color: '#1F7A63' }}>
          ?{(row.totalCost / 100000).toFixed(1)}L
        </Typography>
      </div>
    ))}
    <Typography sx={{ fontSize: '0.6875rem', color: '#9E9E9E', mt: 0.5 }}>
      * GST, registration charges, and development charges extra
    </Typography>
  </div>
);

const CostTab = () => (
  <div className="flex flex-col gap-2">
    {[
      { label: 'Plot Cost (100 Sq.Yd example)', value: '?18,00,000' },
      { label: 'GST (5%)', value: '?90,000' },
      { label: 'Registration Charges (1%)', value: '?18,000' },
      { label: 'Development Charges', value: '?1,50,000' },
      { label: 'Documentation / Legal', value: '?15,000' },
    ].map((row, i, arr) => (
      <div key={row.label}>
        <div className="flex items-center justify-between py-2">
          <Typography sx={{ fontSize: '0.8125rem', color: '#1A1A1A', fontWeight: i === arr.length - 1 ? 700 : 500 }}>
            {row.label}
          </Typography>
          <Typography sx={{ fontSize: '0.8125rem', fontWeight: 700, color: i === arr.length - 1 ? '#1F7A63' : '#1A1A1A' }}>
            {row.value}
          </Typography>
        </div>
        {i < arr.length - 1 && <Divider />}
      </div>
    ))}
    <div className="flex items-center justify-between px-3 py-2.5 rounded-[4px] bg-[#E8F5E9] border border-[#1F7A63] mt-1">
      <Typography sx={{ fontSize: '0.875rem', fontWeight: 700, color: '#1F7A63' }}>Total (approx.)</Typography>
      <Typography sx={{ fontSize: '0.9375rem', fontWeight: 800, color: '#1F7A63' }}>?20,73,000</Typography>
    </div>
  </div>
);

const BookingTab = () => (
  <div className="flex flex-col gap-2.5">
    {[
      { label: 'Booking Amount', value: '?1,00,000', note: 'Refundable upon cancellation' },
      { label: 'Within 30 Days', value: '25% of Plot Cost', note: 'After booking confirmation' },
      { label: 'On Agreement', value: '50% of Plot Cost', note: 'Sale agreement execution' },
      { label: 'On Registration', value: 'Balance Amount', note: 'At time of plot registration' },
    ].map((row) => (
      <div key={row.label} className="px-3 py-2.5 rounded-[4px] bg-[#F5F5F5] border border-[#E0E0E0]">
        <div className="flex items-center justify-between">
          <Typography sx={{ fontSize: '0.8125rem', fontWeight: 700, color: '#1A1A1A' }}>{row.label}</Typography>
          <Typography sx={{ fontSize: '0.8125rem', fontWeight: 700, color: '#1F7A63' }}>{row.value}</Typography>
        </div>
        <Typography sx={{ fontSize: '0.6875rem', color: '#9E9E9E', mt: 0.25 }}>{row.note}</Typography>
      </div>
    ))}
  </div>
);

const InstallmentsTab = () => (
  <div className="flex flex-col gap-2">
    <div className="px-3 py-2.5 rounded-[4px] bg-[#E8F5E9] border border-[#1F7A63]">
      <Typography sx={{ fontSize: '0.8125rem', fontWeight: 700, color: '#1F7A63' }}>
        EMI Starting at ?14,500/month
      </Typography>
      <Typography sx={{ fontSize: '0.6875rem', color: '#666666', mt: 0.25 }}>
        For 100 Sq.Yd plot Ã‚Â· 10 year tenure Ã‚Â· 8.5% interest (SBI)
      </Typography>
    </div>
    {[
      { bank: 'SBI Home Loans', rate: '8.50%', emi: '?14,500/mo', tenure: '10 yrs' },
      { bank: 'HDFC Bank', rate: '8.75%', emi: '?14,800/mo', tenure: '10 yrs' },
      { bank: 'Axis Bank', rate: '9.00%', emi: '?15,000/mo', tenure: '10 yrs' },
    ].map((b) => (
      <div key={b.bank} className="flex items-center gap-3 px-3 py-2.5 rounded-[4px] border border-[#E0E0E0] bg-white">
        <AccountBalanceOutlinedIcon sx={{ fontSize: 20, color: '#1F7A63', flexShrink: 0 }} />
        <div className="flex-1">
          <Typography sx={{ fontSize: '0.8125rem', fontWeight: 700, color: '#1A1A1A' }}>{b.bank}</Typography>
          <Typography sx={{ fontSize: '0.6875rem', color: '#666666' }}>@{b.rate} Ã‚Â· {b.tenure}</Typography>
        </div>
        <Typography sx={{ fontSize: '0.8125rem', fontWeight: 700, color: '#1F7A63' }}>{b.emi}</Typography>
      </div>
    ))}
  </div>
);

const OffersTab = () => (
  <div className="flex flex-col gap-3">
    {[
      { title: 'Early Booking Discount', desc: '2% off on total plot cost for bookings before May 31, 2026', tag: 'Limited' },
      { title: 'Referral Bonus', desc: 'Earn ?25,000 for every successful referral Ã¢â‚¬â€ paid after registration', tag: null },
      { title: 'Zero Development Charge', desc: 'Development charge waived for first 30 plot bookings', tag: 'Limited' },
    ].map((offer) => (
      <div key={offer.title} className="px-3 py-3 rounded-[4px] border border-[#E0E0E0] bg-white">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-1.5">
            <LocalOfferOutlinedIcon sx={{ fontSize: 15, color: '#1F7A63' }} />
            <Typography sx={{ fontSize: '0.8125rem', fontWeight: 700, color: '#1A1A1A' }}>{offer.title}</Typography>
          </div>
          {offer.tag && (
            <Chip label={offer.tag} size="small" sx={{ height: 20, fontSize: '0.625rem', backgroundColor: '#FFF3E0', color: '#E65100', borderRadius: '3px', fontWeight: 700 }} />
          )}
        </div>
        <Typography sx={{ fontSize: '0.75rem', color: '#666666', lineHeight: 1.4 }}>
          {offer.desc}
        </Typography>
      </div>
    ))}
  </div>
);

const PAYMENT_TABS = [
  { id: 'price',   label: 'Price/Sq.Yd', content: <PriceTab /> },
  { id: 'cost',    label: 'Cost',        content: <CostTab /> },
  { id: 'booking', label: 'Booking',     content: <BookingTab /> },
  { id: 'emi',     label: 'EMI',         content: <InstallmentsTab /> },
  { id: 'offers',  label: 'Offers',      content: <OffersTab /> },
];

const PaymentPlan: React.FC = () => {
  const [activeTab, setActiveTab] = useState(PAYMENT_TABS[0].id);
  const current = PAYMENT_TABS.find((t) => t.id === activeTab)!;

  return (
    <div>
      <SectionTabNav
        tabs={PAYMENT_TABS.map(({ id, label }) => ({ id, label }))}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        layoutId="payment-active-pill"
      />

      <div className="px-4 py-3">
        {current.content}
      </div>
    </div>
  );
};

export default PaymentPlan;