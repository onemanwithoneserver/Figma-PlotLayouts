/** Horizontal tab navigation items — matches section IDs in PropertyDetails */
export interface NavTab {
  id: string;
  label: string;
}

export const SECTION_TABS: NavTab[] = [
  { id: 'overview',       label: 'Overview'   },
  { id: 'highlights',     label: 'Highlights' },
  { id: 'project-status', label: 'Status'     },
  { id: 'layout',         label: 'Layout'     },
  { id: 'ask-seller',     label: 'Ask Seller' },
  { id: 'location',       label: 'Location'   },
  { id: 'amenities',      label: 'Amenities'  },
  { id: 'payment',        label: 'Pricing'    },
  { id: 'gallery',        label: 'Gallery'    },
];

/** Footer nav action items */
export interface FooterAction {
  id: string;
  label: string;
  icon: 'save' | 'hide' | 'contact' | 'share' | 'close';
}

export const FOOTER_ACTIONS: FooterAction[] = [
  { id: 'save',    label: 'Save',    icon: 'save' },
  { id: 'hide',    label: 'Hide',    icon: 'hide' },
  { id: 'contact', label: 'Contact', icon: 'contact' },
  { id: 'share',   label: 'Share',   icon: 'share' },
  { id: 'close',   label: 'Close',   icon: 'close' },
];

/** Default Ask Seller questions */
export const DEFAULT_ASK_SELLER_QUESTIONS: string[] = [
  'What is the current possession status?',
  'Are there any pending legal approvals?',
];
