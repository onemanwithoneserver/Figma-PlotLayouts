import type { PricingTier } from '../../../../types/plot';

export type Plot = PricingTier;

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
  { size: '100sqyd', label: '100 Sq.Yd Plot', dimensions: '30 x 33 Ft', pricePerSqYd: 18000, totalPrice: 1800000, available: true },
  { size: '150sqyd', label: '150 Sq.Yd Plot', dimensions: '33 x 45 Ft', pricePerSqYd: 17500, totalPrice: 2625000, available: true },
  { size: '200sqyd', label: '200 Sq.Yd Plot', dimensions: '40 x 45 Ft', pricePerSqYd: 16800, totalPrice: 3360000, available: true },
  { size: '240sqyd', label: '240 Sq.Yd Plot', dimensions: '45 x 48 Ft', pricePerSqYd: 16000, totalPrice: 3840000, available: true },
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

export const paymentAskSellerQuestions: string[] = [
  'Is any flexible payment plan available?',
  'What is the minimum booking amount?',
  'Are home loans available for this project?',
  'Are there any hidden charges beyond the listed cost?',
  'Can the payment schedule be customized?',
];
