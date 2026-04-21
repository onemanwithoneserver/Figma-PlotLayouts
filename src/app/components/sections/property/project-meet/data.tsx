export interface SessionData {
  id: string;
  label: string;
  slots: string[];
}

export const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] as const;

export const SESSIONS: SessionData[] = [
  { id: 'morning',   label: '🌄 Morning',   slots: ['07:00 AM','07:30 AM','08:00 AM','08:30 AM','09:00 AM','09:30 AM','10:00 AM','10:30 AM'] },
  { id: 'afternoon', label: '🌆 Afternoon', slots: ['12:00 PM','12:30 PM','01:00 PM','01:30 PM','02:00 PM','02:30 PM'] },
  { id: 'evening',   label: '🌇 Evening',   slots: ['05:00 PM','05:30 PM','06:00 PM','06:30 PM'] },
];

/** Default selections */
export const DEFAULT_SESSION = 'morning';
export const DEFAULT_SLOT = '09:00 AM';

/** Number of days to show in calendar */
export const CALENDAR_DAYS = 14;
