import React from 'react';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';

interface ContentSectionProps {
  title: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}

const ContentSection: React.FC<ContentSectionProps> = ({ title, action, children }) => {
  return (
    <Card elevation={0} sx={{ borderRadius: '2px', overflow: 'hidden' }}>
      <div className="flex items-center justify-between px-2 py-1.5 bg-white">
        <h2 className="text-[0.9375rem] font-bold text-[var(--text-primary)] leading-tight">
          {title}
        </h2>
        {action && <div className="flex-shrink-0">{action}</div>}
      </div>
      {children}
    </Card>
  );
};

export default ContentSection;
