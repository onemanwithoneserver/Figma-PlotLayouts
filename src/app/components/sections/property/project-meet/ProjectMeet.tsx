import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import EventOutlinedIcon from '@mui/icons-material/EventOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import NightlightOutlinedIcon from '@mui/icons-material/NightlightOutlined';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const DAYS = [
  { date: '19', day: 'Sun', isToday: true },
  { date: '20', day: 'Mon' },
  { date: '21', day: 'Tue' },
  { date: '22', day: 'Wed' },
  { date: '23', day: 'Thu' },
  { date: '24', day: 'Fri' },
  { date: '25', day: 'Sat' },
];

const SESSIONS: Record<string, { label: string; icon: React.ReactNode; slots: string[] }> = {
  morning: {
    label: 'Morning',
    icon: <WbSunnyOutlinedIcon sx={{ fontSize: 16 }} />,
    slots: ['07:00 AM', '07:30 AM', '08:00 AM', '08:30 AM', '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM'],
  },
  afternoon: {
    label: 'Afternoon',
    icon: <LightModeOutlinedIcon sx={{ fontSize: 16 }} />,
    slots: ['12:00 PM', '12:30 PM', '01:00 PM', '01:30 PM', '02:00 PM', '02:30 PM'],
  },
  evening: {
    label: 'Evening',
    icon: <NightlightOutlinedIcon sx={{ fontSize: 16 }} />,
    slots: ['05:00 PM', '05:30 PM', '06:00 PM', '06:30 PM'],
  },
};

const ProjectMeetSection: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState('19');
  const [selectedSession, setSelectedSession] = useState('morning');
  const [selectedSlot, setSelectedSlot] = useState('09:00 AM');
  const [confirmed, setConfirmed] = useState(false);

  if (confirmed) {
    return (
      <div className="px-4 py-8 flex flex-col items-center gap-3 text-center">
        <div className="w-12 h-12 rounded-full bg-[#E8F5E9] flex items-center justify-center">
          <CheckCircleOutlineIcon sx={{ fontSize: 28, color: '#1F7A63' }} />
        </div>
        <Typography sx={{ fontSize: '0.9375rem', fontWeight: 700, color: '#1A1A1A' }}>
          Visit Confirmed!
        </Typography>
        <Typography sx={{ fontSize: '0.8125rem', color: '#666666' }}>
          Apr {selectedDate}, 2026 Ãƒâ€šÃ‚Â· {selectedSlot}
        </Typography>
        <Typography sx={{ fontSize: '0.75rem', color: '#9E9E9E', maxWidth: 240 }}>
          Our team will contact you to confirm the site visit details.
        </Typography>
        <Button
          size="small"
          variant="outlined"
          onClick={() => setConfirmed(false)}
          sx={{ borderColor: '#1F7A63', color: '#1F7A63', borderRadius: '4px', mt: 0.5 }}
        >
          Reschedule
        </Button>
      </div>
    );
  }

  return (
    <div className="px-4 py-3 flex flex-col gap-4">
      {/* Date picker */}
      <div>
        <div className="flex items-center gap-1.5 mb-2">
          <EventOutlinedIcon sx={{ fontSize: 16, color: '#1F7A63' }} />
          <Typography sx={{ fontSize: '0.8125rem', fontWeight: 700, color: '#1A1A1A' }}>
            Select Date  <span className="text-[#9E9E9E] font-normal">Ãƒâ€šÃ‚Â· April 2026</span>
          </Typography>
        </div>
        <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {DAYS.map((d) => (
            <button
              key={d.date}
              onClick={() => setSelectedDate(d.date)}
              className="flex flex-col items-center min-w-[52px] py-2.5 rounded-[4px] border transition-all"
              style={{
                borderColor: selectedDate === d.date ? '#1F7A63' : '#E0E0E0',
                backgroundColor: selectedDate === d.date ? '#E8F5E9' : '#FFFFFF',
              }}
            >
              <Typography sx={{ fontSize: '1rem', fontWeight: 700, color: selectedDate === d.date ? '#1F7A63' : '#1A1A1A' }}>
                {d.date}
              </Typography>
              <Typography sx={{ fontSize: '0.6875rem', fontWeight: 500, color: d.isToday ? '#1F7A63' : '#666666' }}>
                {d.isToday ? 'Today' : d.day}
              </Typography>
            </button>
          ))}
        </div>
      </div>

      <Divider />

      {/* Session filter */}
      <div>
        <div className="flex items-center gap-1.5 mb-2">
          <AccessTimeOutlinedIcon sx={{ fontSize: 16, color: '#1F7A63' }} />
          <Typography sx={{ fontSize: '0.8125rem', fontWeight: 700, color: '#1A1A1A' }}>
            Preferred Time
          </Typography>
        </div>
        <ToggleButtonGroup
          value={selectedSession}
          exclusive
          onChange={(_, v) => v && setSelectedSession(v)}
          fullWidth
          sx={{ gap: 1 }}
        >
          {Object.entries(SESSIONS).map(([key, s]) => (
            <ToggleButton
              key={key}
              value={key}
              sx={{
                flex: 1,
                borderRadius: '4px !important',
                border: '1px solid #E0E0E0 !important',
                py: 1,
                fontSize: '0.75rem',
                fontWeight: 600,
                color: selectedSession === key ? '#1F7A63' : '#666666',
                backgroundColor: selectedSession === key ? '#E8F5E9' : '#FFFFFF',
                '&.Mui-selected': {
                  backgroundColor: '#E8F5E9',
                  color: '#1F7A63',
                  borderColor: '#1F7A63 !important',
                },
                '&.Mui-selected:hover': { backgroundColor: '#D7EDDF' },
                gap: 0.5,
              }}
            >
              {s.icon}
              {s.label}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </div>

      {/* Time slots */}
      <div className="grid grid-cols-4 gap-1.5">
        {SESSIONS[selectedSession].slots.map((slot) => (
          <button
            key={slot}
            onClick={() => setSelectedSlot(slot)}
            className="py-2 px-1 rounded-[4px] border text-center transition-all"
            style={{
              borderColor: selectedSlot === slot ? '#1F7A63' : '#E0E0E0',
              backgroundColor: selectedSlot === slot ? '#E8F5E9' : '#FFFFFF',
            }}
          >
            <Typography sx={{ fontSize: '0.6875rem', fontWeight: 700, color: selectedSlot === slot ? '#1F7A63' : '#1A1A1A' }}>
              {slot}
            </Typography>
          </button>
        ))}
      </div>

      {/* Summary chip */}
      <div className="flex items-center gap-1.5">
        <Chip
          icon={<EventOutlinedIcon sx={{ fontSize: 13 }} />}
          label={`Apr ${selectedDate}, 2026`}
          size="small"
          sx={{ backgroundColor: '#E8F5E9', color: '#1F7A63', fontWeight: 600, fontSize: '0.6875rem', borderRadius: '4px' }}
        />
        <Chip
          icon={<AccessTimeOutlinedIcon sx={{ fontSize: 13 }} />}
          label={selectedSlot}
          size="small"
          sx={{ backgroundColor: '#E8F5E9', color: '#1F7A63', fontWeight: 600, fontSize: '0.6875rem', borderRadius: '4px' }}
        />
      </div>

      <Button
        variant="contained"
        fullWidth
        onClick={() => setConfirmed(true)}
        sx={{
          backgroundColor: '#1F7A63',
          borderRadius: '4px',
          fontWeight: 700,
          fontSize: '0.9375rem',
          py: 1.5,
          '&:hover': { backgroundColor: '#145a47' },
        }}
      >
        Confirm Site Visit
      </Button>
    </div>
  );
};

export default ProjectMeetSection;