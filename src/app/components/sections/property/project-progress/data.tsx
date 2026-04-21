export interface ApprovalDoc {
  id: number;
  name: string;
  date: string;
}

export interface ConstructionStep {
  id: number;
  date: string;
  title: string;
  images: string[];
}

export const PROGRESS_PCT = 65;

export const APPROVALS: ApprovalDoc[] = [
  { id: 1, name: 'HMDA Approval',    date: 'May 2022' },
  { id: 2, name: 'RERA Certificate', date: 'Jun 2022' },
];

export const CONSTRUCTION_STEPS: ConstructionStep[] = [
  {
    id: 0,
    date: "Mar '24",
    title: 'Site Clearing & Levelling',
    images: ['https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=1200&auto=format&fit=crop'],
  },
  {
    id: 1,
    date: "Oct '24",
    title: 'BT Roads & Infrastructure',
    images: [
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=1200&auto=format&fit=crop',
    ],
  },
  { id: 2, date: "Feb '25", title: 'Underground Drainage & Utilities', images: [] },
  { id: 3, date: "Jul '25", title: 'Compound Wall Construction',       images: [] },
  { id: 4, date: "Dec '25", title: 'Final Finishing & Inspection',     images: [] },
];

/** Timeline node labels */
export const TIMELINE_NODES = [
  { label: 'Under development',     status: 'done' as const },
  { label: 'Final LP received',     status: 'done' as const },
  { label: 'Development phase',     status: 'active' as const },
  { label: 'Ready for registration', status: 'upcoming' as const },
];
