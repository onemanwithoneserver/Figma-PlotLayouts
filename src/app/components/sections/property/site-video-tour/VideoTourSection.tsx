import React, { useState } from 'react';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import VolumeUpOutlinedIcon from '@mui/icons-material/VolumeUpOutlined';
import FullscreenOutlinedIcon from '@mui/icons-material/FullscreenOutlined';

const VideoTourSection: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <Card elevation={0}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2.5">
        <Typography sx={{ fontSize: '0.9375rem', fontWeight: 700, color: '#1A1A1A' }}>
          Site Video Tour
        </Typography>
        <Chip
          label="Official Walk-through"
          size="small"
          sx={{
            backgroundColor: '#E8F5E9',
            color: '#1F7A63',
            fontWeight: 600,
            fontSize: '0.6875rem',
            borderRadius: '4px',
          }}
        />
      </div>
      <Divider />

      {/* Video area */}
      <div className="relative w-full bg-[#0B0F0C]" style={{ aspectRatio: '16/9' }}>
        <img
          src="https://images.unsplash.com/photo-1500076656116-558758c991c1?w=800&h=450&fit=crop"
          alt="Site video tour thumbnail"
          className="w-full h-full object-cover"
          style={{ opacity: 0.65 }}
        />

        {/* Play button — flat, no gradient */}
        <div className="absolute inset-0 flex items-center justify-center">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            aria-label="Play site video tour"
            className="flex flex-col items-center gap-2 group"
          >
            <div className="w-14 h-14 rounded-full flex items-center justify-center bg-[#1F7A63] transition-transform duration-200 group-hover:scale-105">
              <PlayCircleOutlineIcon sx={{ fontSize: 32, color: '#FFFFFF' }} />
            </div>
            <span className="text-white text-[11px] font-semibold tracking-wide">Watch Tour</span>
          </button>
        </div>

        {/* Bottom control bar */}
        <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-3 py-2 bg-black/50">
          <Typography sx={{ fontSize: '0.6875rem', color: 'rgba(255,255,255,0.8)', fontWeight: 500 }}>
            Vasavi Skyla · Site Walk-through
          </Typography>
          <div className="flex items-center gap-2.5">
            <VolumeUpOutlinedIcon sx={{ fontSize: 16, color: 'rgba(255,255,255,0.7)' }} />
            <FullscreenOutlinedIcon sx={{ fontSize: 16, color: 'rgba(255,255,255,0.7)' }} />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default VideoTourSection;

