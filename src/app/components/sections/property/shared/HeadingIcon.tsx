import React from 'react';

export type HeadingIconName =
  | 'overview'
  | 'highlights'
  | 'project-status'
  | 'layout'
  | 'location'
  | 'amenities'
  | 'pricing'
  | 'gallery'
  | 'ask-seller'
  | 'default';

interface HeadingIconProps {
  name: HeadingIconName;
  className?: string;
}

const iconPaths: Record<HeadingIconName, React.ReactNode> = {
  overview: (
    <path d="M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z" />
  ),
  highlights: (
    <path d="M12 3l2.6 5.3 5.9.9-4.2 4.1 1 5.8-5.3-2.8-5.3 2.8 1-5.8-4.2-4.1 5.9-.9L12 3z" />
  ),
  'project-status': (
    <path d="M5 19V8M12 19V5M19 19v-7M3 21h18" />
  ),
  layout: (
    <path d="M4 4h16v16H4zM10 4v16M4 10h16" />
  ),
  location: (
    <path d="M12 21s6-5.2 6-10a6 6 0 10-12 0c0 4.8 6 10 6 10zM12 13.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z" />
  ),
  amenities: (
    <path d="M12 20c4.5-2.2 7-5.7 7-9.8V5.5c-5 .4-8 2.5-9.5 5.8C8.6 13.3 8.8 16.7 12 20zM9.5 11.3c.8 1.4 1.8 2.7 3.3 3.8" />
  ),
  pricing: (
    <path d="M4 7h16v10H4zM4 10h16M8 14h3M15 14h1" />
  ),
  gallery: (
    <path d="M4 6h16v12H4zM7.5 11a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm11.5 5l-4.8-4.8L9 16" />
  ),
  'ask-seller': (
    <path d="M4 5h16v11H9l-5 4V5zM8 10h8M8 13h5" />
  ),
  default: <path d="M4 4h16v16H4z" />,
};

const HeadingIcon: React.FC<HeadingIconProps> = ({ name, className = '' }) => {
  return (
    <span className={`section-heading-icon ${className}`} aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
        {iconPaths[name] || iconPaths.default}
      </svg>
    </span>
  );
};

export default HeadingIcon;
