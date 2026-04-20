import React from 'react';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import ConstructionOutlinedIcon from '@mui/icons-material/ConstructionOutlined';

const steps = [
  {
    label: 'Land Acquisition',
    description: 'All 12 acres acquired with clear title deed and encumbrance certificate.',
    status: 'done',
  },
  {
    label: 'HMDA Approval',
    description: 'Layout approved by Hyderabad Metropolitan Development Authority (HMDA).',
    status: 'done',
  },
  {
    label: 'Final LP Approved',
    description: 'Layout Plan (LP) approval received. Registered and valid document available.',
    status: 'done',
  },
  {
    label: 'Development Works',
    description: 'BT roads, drainage, compound wall, and underground utilities are in progress.',
    status: 'active',
  },
  {
    label: 'Ready to Register',
    description: 'Plots will be available for registration once development works are complete.',
    status: 'upcoming',
  },
];

const documents = [
  { name: 'HMDA Layout Approval Certificate', size: '1.2 MB' },
  { name: 'Final LP Approval Letter', size: '890 KB' },
  { name: 'RERA Registration Certificate', size: '650 KB' },
];

const ProjectTimeline: React.FC = () => {
  return (
    <Card elevation={0}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2.5">
        <Typography sx={{ fontSize: '0.9375rem', fontWeight: 700, color: '#1A1A1A' }}>
          Project Status
        </Typography>
        <Chip
          icon={<VerifiedOutlinedIcon sx={{ fontSize: 13, color: '#1F7A63 !important' }} />}
          label="RERA Valid till Dec 2028"
          size="small"
          sx={{
            backgroundColor: '#E8F5E9',
            color: '#1F7A63',
            fontWeight: 600,
            fontSize: '0.6875rem',
            borderRadius: '4px',
            '& .MuiChip-icon': { color: '#1F7A63' },
          }}
        />
      </div>
      <Divider />

      {/* Stepper */}
      <div className="px-4 py-3">
        <Stepper orientation="vertical" sx={{ '& .MuiStepConnector-line': { borderColor: '#E0E0E0' } }}>
          {steps.map((step) => (
            <Step key={step.label} active={step.status === 'active'} completed={step.status === 'done'}>
              <StepLabel
                icon={
                  step.status === 'done' ? (
                    <CheckCircleOutlineIcon sx={{ fontSize: 20, color: '#1F7A63' }} />
                  ) : step.status === 'active' ? (
                    <ConstructionOutlinedIcon sx={{ fontSize: 20, color: '#4CAF50' }} />
                  ) : (
                    <RadioButtonUncheckedIcon sx={{ fontSize: 20, color: '#BDBDBD' }} />
                  )
                }
                sx={{
                  '& .MuiStepLabel-label': {
                    fontSize: '0.8125rem',
                    fontWeight: step.status === 'active' ? 700 : 600,
                    color: step.status === 'done' ? '#1F7A63' : step.status === 'active' ? '#1A1A1A' : '#9E9E9E',
                  },
                }}
              >
                <div className="flex items-center gap-2">
                  {step.label}
                  {step.status === 'done' && (
                    <span className="text-[0.625rem] font-600 text-[#1F7A63] bg-[#E8F5E9] px-1.5 py-0.5 rounded-[3px]">Done</span>
                  )}
                  {step.status === 'active' && (
                    <span className="text-[0.625rem] font-600 text-[#4CAF50] bg-[#E8F5E9] px-1.5 py-0.5 rounded-[3px]">In Progress</span>
                  )}
                </div>
              </StepLabel>
              <StepContent sx={{ borderColor: '#E0E0E0' }}>
                <Typography sx={{ fontSize: '0.75rem', color: '#666666', pb: 1 }}>
                  {step.description}
                </Typography>
              </StepContent>
            </Step>
          ))}
        </Stepper>
      </div>

      <Divider />

      {/* Approval Documents */}
      <div className="px-4 py-3">
        <Typography sx={{ fontSize: '0.8125rem', fontWeight: 700, color: '#1A1A1A', mb: 1.5 }}>
          Approval Documents
        </Typography>
        <div className="flex flex-col gap-2">
          {documents.map((doc) => (
            <div
              key={doc.name}
              className="flex items-center justify-between px-3 py-2 rounded-[4px] bg-[#F5F5F5] border border-[#E0E0E0]"
            >
              <div className="flex items-center gap-2">
                <DescriptionOutlinedIcon sx={{ fontSize: 18, color: '#1F7A63', flexShrink: 0 }} />
                <Typography sx={{ fontSize: '0.75rem', fontWeight: 600, color: '#1A1A1A' }}>
                  {doc.name}
                </Typography>
              </div>
              <Typography sx={{ fontSize: '0.6875rem', color: '#9E9E9E' }}>{doc.size}</Typography>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default ProjectTimeline;
