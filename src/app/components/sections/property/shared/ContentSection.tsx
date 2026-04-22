import React from 'react';
import Card from '@mui/material/Card';
import HeadingIcon from './HeadingIcon';
import type { HeadingIconName } from './HeadingIcon';

interface ContentSectionProps {
  title: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

const ContentSection: React.FC<ContentSectionProps> = ({ title, action, children, className = '' }) => {
  const iconByTitle: Record<string, HeadingIconName> = {
    Overview: 'overview',
    Highlights: 'highlights',
    'Layout & Plot Availability': 'layout',
    'Location & Distance': 'location',
    Amenities: 'amenities',
    'Pricing & Payment Plans': 'pricing',
  };

  const iconName = iconByTitle[title] ?? 'default';

  return (
    <Card
      elevation={0}
      className={`font-outfit border border-[#C8DBCF] bg-[#ffffff] shadow-sm ${className}`}
      sx={{
        borderRadius: 'var(--radius-md)',
        overflow: 'hidden',
      }}
    >
      <div className="section-heading-row">
        <div className="section-heading-left">
          <HeadingIcon name={iconName} />
          <h2 className="section-heading-text">
            {title}
          </h2>
        </div>
        {action && <div className="flex-shrink-0">{action}</div>}
      </div>
      <div className="bg-[#ffffff]">
        {children}
      </div>
    </Card>
  );
};

export default ContentSection;