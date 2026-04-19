import React from 'react';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

interface ContentSectionProps {
  title: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}

const ContentSection: React.FC<ContentSectionProps> = ({ title, action, children }) => {
  return (
    <Card elevation={0}>
      <div className="flex items-center justify-between px-4 py-2.5">
        <Typography variant="h6" sx={{ fontSize: '0.9375rem', fontWeight: 700, color: '#1A1A1A' }}>
          {title}
        </Typography>
        {action && <div className="flex-shrink-0">{action}</div>}
      </div>
      <Divider />
      {children}
    </Card>
  );
};

export default ContentSection;

