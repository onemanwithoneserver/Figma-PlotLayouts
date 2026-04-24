import React, { useState } from 'react';
import { motion } from 'framer-motion';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import VolumeUpOutlinedIcon from '@mui/icons-material/VolumeUpOutlined';
import FullscreenOutlinedIcon from '@mui/icons-material/FullscreenOutlined';
import { videoTourData } from './data';

// Framer Motion Variants
const itemVariants = {
  hidden: { opacity: 0, filter: 'blur(6px)', y: 15 },
  show: { 
    opacity: 1, 
    filter: 'blur(0px)', 
    y: 0,
    transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] }
  }
};

const VideoTourSection: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <motion.div 
      variants={itemVariants}
      initial="hidden"
      animate="show"
      className="w-full relative group cursor-pointer overflow-hidden rounded-[8px] bg-white/60 backdrop-blur-md border border-[#E2E8F0] shadow-[0_2px_8px_rgba(26,107,74,0.06)]"
    >
      <div className="relative aspect-video overflow-hidden">
        <img
          src={videoTourData.thumbnailUrl}
          alt={videoTourData.thumbnailAlt}
          className="w-full h-full object-cover transition-transform duration-[800ms] ease-out group-hover:scale-[1.02]"
          loading="lazy"
        />
        {/* Subtle dark tint over the image for better contrast */}
        <div className="absolute inset-0 bg-[#1A1A2E]/10" />
      </div>

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="pointer-events-auto flex flex-col items-center gap-1.5 focus:outline-none"
          aria-label={`Play video tour (${videoTourData.duration})`}
        >
          <div 
            className="w-16 h-16 rounded-[8px] border flex items-center justify-center transition-all duration-300 ease-out group-hover:scale-[1.05] group-active:scale-[0.95]" 
            style={{ 
              backgroundColor: isPlaying ? '#1A6B4A' : 'rgba(255, 255, 255, 0.85)',
              borderColor: isPlaying ? '#1A6B4A' : '#E2E8F0',
              backdropFilter: isPlaying ? 'none' : 'blur(8px)',
              boxShadow: isPlaying ? '0 4px 16px rgba(26,107,74,0.3)' : '0 2px 10px rgba(26,107,74,0.12)'
            }}
          >
            <PlayCircleOutlineIcon 
              sx={{ fontSize: 36, color: isPlaying ? '#FFFFFF' : '#1A6B4A' }} 
              className="transition-colors duration-300"
            />
          </div>
          
          <span className="text-white text-[11px] font-bold tracking-[0.08em] drop-shadow-[0_2px_4px_rgba(26,26,46,0.6)] opacity-95 transition-opacity">
            {videoTourData.ctaLabel}
          </span>
        </button>
      </div>

      {/* Bottom Controls Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-[#1A1A2E]/70 via-[#1A1A2E]/20 to-transparent flex items-end justify-between px-3 py-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0 z-30">
        <div className="flex items-center gap-1.5 mb-0.5">
          {/* Used Accent/CTA color for the recording pulse */}
          <div className="w-2 h-2 rounded-[4px] bg-[#F5A623] animate-pulse shadow-[0_0_6px_rgba(245,166,35,0.7)]" />
          <span className="text-white/95 text-[11px] font-semibold tracking-wide">0:00 / {videoTourData.duration}</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            className="text-white/80 hover:text-white transition-all duration-300 focus:outline-none hover:scale-110 active:scale-[0.95]"
            aria-label="Volume"
          >
            <VolumeUpOutlinedIcon sx={{ fontSize: 20 }} />
          </button>
          <button
            className="text-white/80 hover:text-white transition-all duration-300 focus:outline-none hover:scale-110 active:scale-[0.95]"
            aria-label="Fullscreen"
          >
            <FullscreenOutlinedIcon sx={{ fontSize: 20 }} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default VideoTourSection;