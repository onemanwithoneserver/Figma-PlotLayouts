export interface Plot {
  size: string;
  sqYd: number;
  pricePerSqYd: number;
}

export interface BookingStep {
  step: string;
  label: string;
  value: string;
  note: string;
}

export interface PaymentTab {
  id: string;
  label: string;
}

export const PLOTS: Plot[] = [
  { size: '100 Sq.Yd', sqYd: 100, pricePerSqYd: 18000 },
  { size: '150 Sq.Yd', sqYd: 150, pricePerSqYd: 17500 },
  { size: '200 Sq.Yd', sqYd: 200, pricePerSqYd: 16800 },
  { size: '240 Sq.Yd', sqYd: 240, pricePerSqYd: 16000 },
];

export const DEV_CHARGES = 150000;
export const LEGAL_CHARGES = 15000;

export const BOOKING_STEPS: BookingStep[] = [
  { step: '01', label: 'Booking Amount',  value: 'Rs. 1,00,000',    note: 'Refundable upon cancellation' },
  { step: '02', label: 'Within 30 Days',  value: '25% of Plot Cost', note: 'After booking confirmation' },
  { step: '03', label: 'On Agreement',    value: '50% of Plot Cost', note: 'Sale agreement execution' },
  { step: '04', label: 'On Registration', value: 'Balance Amount',   note: 'At time of plot registration' },
];

export const PAYMENT_TABS: PaymentTab[] = [
  { id: 'price',   label: 'Price/Sq.Yd' },
  { id: 'cost',    label: 'Cost' },
  { id: 'booking', label: 'Booking' },
];

/** Format number to INR */
export function fmtINR(n: number): string {
  return 'Rs. ' + n.toLocaleString('en-IN');
}
