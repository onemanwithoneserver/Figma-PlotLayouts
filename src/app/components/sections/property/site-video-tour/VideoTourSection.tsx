import React, { useState } from 'react';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import VolumeUpOutlinedIcon from '@mui/icons-material/VolumeUpOutlined';
import FullscreenOutlinedIcon from '@mui/icons-material/FullscreenOutlined';

const VideoTourSection: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&display=swap');
          .font-outfit { font-family: 'Outfit', sans-serif; }
        `}
      </style>
      
      <div className="font-outfit border border-[#EAEAEA] rounded-[8px] overflow-hidden bg-[#1A1A1A] w-full relative group shadow-sm cursor-pointer">
        {/* Video Thumbnail */}
        <img
          src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&h=450&fit=crop"
          alt="Video thumbnail placeholder"
          className="w-full aspect-video object-cover opacity-75 group-hover:opacity-60 transition-opacity duration-500"
        />

        {/* Play Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="pointer-events-auto flex flex-col items-center gap-2.5 focus:outline-none"
            aria-label="Play video"
          >
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center shadow-[0_4px_12px_rgba(0,0,0,0.15)] group-hover:bg-[#1F7A63] group-hover:border-[#1F7A63] group-hover:scale-110 transition-all duration-300">
              <PlayCircleOutlineIcon sx={{ fontSize: 34, color: '#FFFFFF' }} />
            </div>
            <span className="text-white text-[0.75rem] font-bold tracking-widest  drop-shadow-md opacity-90 group-hover:opacity-100 transition-opacity duration-300">
              Watch Tour
            </span>
          </button>
        </div>

        {/* Bottom Controls (Appears on Hover) */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end justify-between px-4 py-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
            <span className="text-white/90 text-[0.75rem] font-medium tracking-wide">0:00 / 3:15</span>
          </div>
          
          <div className="flex items-center gap-3">
            <button 
              className="text-white/80 hover:text-white transition-colors focus:outline-none hover:scale-110 transform duration-200"
              aria-label="Volume"
            >
              <VolumeUpOutlinedIcon sx={{ fontSize: 20 }} />
            </button>
            <button 
              className="text-white/80 hover:text-white transition-colors focus:outline-none hover:scale-110 transform duration-200"
              aria-label="Fullscreen"
            >
              <FullscreenOutlinedIcon sx={{ fontSize: 20 }} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default VideoTourSection;