import React, { useState } from 'react';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import LinearProgress from '@mui/material/LinearProgress';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import CloseIcon from '@mui/icons-material/Close';
import ZoomOutMapIcon from '@mui/icons-material/ZoomOutMap';
import RoadOutlinedIcon from '@mui/icons-material/StraightOutlined';
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined';
import ParkOutlinedIcon from '@mui/icons-material/ParkOutlined';
import MeetingRoomOutlinedIcon from '@mui/icons-material/MeetingRoomOutlined';
import BoltOutlinedIcon from '@mui/icons-material/BoltOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';

const layoutImages = [
  {
    src: 'https://images.unsplash.com/photo-1563207153-f403bf289096?w=800&h=500&fit=crop',
    label: 'Master Layout Plan',
  },
  {
    src: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=500&fit=crop',
    label: 'Phase 1 Plot Grid',
  },
  {
    src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=500&fit=crop',
    label: 'Internal Road Network',
  },
];

const plotSizes = [
  { size: '100 Sq.Yd', available: 48, total: 80, facing: 'North / East', pricePerSqYd: 18000, tag: 'popular' },
  { size: '150 Sq.Yd', available: 22, total: 60, facing: 'East / West',  pricePerSqYd: 17500, tag: null },
  { size: '200 Sq.Yd', available: 9,  total: 40, facing: 'North Facing', pricePerSqYd: 16800, tag: 'last-few' },
  { size: '240 Sq.Yd', available: 0,  total: 20, facing: 'Corner Plots', pricePerSqYd: 16000, tag: 'sold-out' },
];

const infoBadges = [
  { icon: <RoadOutlinedIcon sx={{ fontSize: 16 }} />, label: 'Roads', value: '30ft / 20ft' },
  { icon: <ExploreOutlinedIcon sx={{ fontSize: 16 }} />, label: 'Facing', value: 'N & E' },
  { icon: <ParkOutlinedIcon sx={{ fontSize: 16 }} />, label: 'Open Space', value: '15%' },
  { icon: <MeetingRoomOutlinedIcon sx={{ fontSize: 16 }} />, label: 'Clubhouse', value: '2400 Sq.Ft' },
  { icon: <BoltOutlinedIcon sx={{ fontSize: 16 }} />, label: 'Utilities', value: 'Underground' },
  { icon: <HomeOutlinedIcon sx={{ fontSize: 16 }} />, label: 'Zoning', value: 'Residential' },
];

const TagChip: React.FC<{ tag: string | null }> = ({ tag }) => {
  if (!tag) return null;
  const config = {
    popular:  { label: '?? Popular',   bg: '#E8F5E9', color: '#1F7A63' },
    'last-few': { label: '? Last few', bg: '#FFF8E1', color: '#F57C00' },
    'sold-out': { label: '? Sold Out', bg: '#FFEBEE', color: '#C62828' },
  }[tag];
  if (!config) return null;
  return (
    <span
      className="text-[0.625rem] font-700 px-1.5 py-0.5 rounded-[3px]"
      style={{ backgroundColor: config.bg, color: config.color, fontWeight: 700 }}
    >
      {config.label}
    </span>
  );
};

const AvailBar: React.FC<{ available: number; total: number }> = ({ available, total }) => {
  const pct = total === 0 ? 0 : Math.round((available / total) * 100);
  const color = available === 0 ? '#BDBDBD' : pct <= 25 ? '#EF5350' : pct <= 60 ? '#FFA726' : '#1F7A63';
  return (
    <div className="flex items-center gap-2">
      <LinearProgress
        variant="determinate"
        value={pct}
        sx={{
          flex: 1,
          height: 5,
          borderRadius: 4,
          backgroundColor: '#E0E0E0',
          '& .MuiLinearProgress-bar': { backgroundColor: color },
        }}
      />
      <Typography sx={{ fontSize: '0.6875rem', color: '#666666', whiteSpace: 'nowrap', minWidth: 44, textAlign: 'right' }}>
        {available === 0 ? 'Sold Out' : `${available}/${total}`}
      </Typography>
    </div>
  );
};

const Layout: React.FC = () => {
  const [imgIdx, setImgIdx] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const prev = () => setImgIdx((i) => (i - 1 + layoutImages.length) % layoutImages.length);
  const next = () => setImgIdx((i) => (i + 1) % layoutImages.length);

  return (
    <>
      {/* Image Viewer */}
      <div className="relative w-full bg-[#F5F5F5]" style={{ aspectRatio: '4/3' }}>
        <img
          src={layoutImages[imgIdx].src}
          alt={layoutImages[imgIdx].label}
          className="w-full h-full object-cover"
        />

        {/* Prev / Next */}
        {layoutImages.length > 1 && (
          <>
            <IconButton
              onClick={prev}
              size="small"
              sx={{ position: 'absolute', left: 8, top: '50%', transform: 'translateY(-50%)', bgcolor: 'rgba(255,255,255,0.9)', '&:hover': { bgcolor: '#FFFFFF' } }}
            >
              <NavigateBeforeIcon sx={{ fontSize: 18, color: '#1A1A1A' }} />
            </IconButton>
            <IconButton
              onClick={next}
              size="small"
              sx={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', bgcolor: 'rgba(255,255,255,0.9)', '&:hover': { bgcolor: '#FFFFFF' } }}
            >
              <NavigateNextIcon sx={{ fontSize: 18, color: '#1A1A1A' }} />
            </IconButton>
          </>
        )}

        {/* Image label + fullscreen */}
        <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-3 py-2 bg-[rgba(0,0,0,0.45)]">
          <Typography sx={{ fontSize: '0.75rem', fontWeight: 600, color: '#FFFFFF' }}>
            {layoutImages[imgIdx].label}
          </Typography>
          <div className="flex items-center gap-2">
            <span className="text-white/70 text-[0.625rem]">
              {imgIdx + 1} / {layoutImages.length}
            </span>
            <IconButton
              onClick={() => setLightboxOpen(true)}
              size="small"
              sx={{ color: 'rgba(255,255,255,0.85)', p: 0.25 }}
            >
              <ZoomOutMapIcon sx={{ fontSize: 16 }} />
            </IconButton>
          </div>
        </div>
      </div>

      {/* Thumbnail strip */}
      <div className="flex gap-1.5 px-3 py-2 border-b border-[#E0E0E0]">
        {layoutImages.map((img, i) => (
          <button
            key={i}
            onClick={() => setImgIdx(i)}
            className="flex-1 rounded-[3px] overflow-hidden border-2 transition-all"
            style={{ borderColor: i === imgIdx ? '#1F7A63' : '#E0E0E0' }}
          >
            <img src={img.src} alt={img.label} className="w-full h-9 object-cover" />
          </button>
        ))}
      </div>

      {/* Site quick facts */}
      <div className="grid grid-cols-3 gap-1.5 px-3 py-3 border-b border-[#E0E0E0]">
        {infoBadges.map((b) => (
          <div
            key={b.label}
            className="flex flex-col items-center gap-1 py-2 px-1 rounded-[4px] bg-[#F5F5F5] border border-[#E0E0E0]"
          >
            <span className="text-[#1F7A63]">{b.icon}</span>
            <Typography sx={{ fontSize: '0.5625rem', fontWeight: 600, color: '#666666', textTransform: '', letterSpacing: '0.04em' }}>
              {b.label}
            </Typography>
            <Typography sx={{ fontSize: '0.6875rem', fontWeight: 700, color: '#1A1A1A', textAlign: 'center', lineHeight: 1.2 }}>
              {b.value}
            </Typography>
          </div>
        ))}
      </div>

      {/* Plot availability */}
      <div className="px-3 py-3">
        <Typography sx={{ fontSize: '0.8125rem', fontWeight: 700, color: '#1A1A1A', mb: 1.5 }}>
          Plot Availability
        </Typography>
        <div className="flex flex-col gap-2.5">
          {plotSizes.map((plot) => (
            <div key={plot.size} className="rounded-[4px] border border-[#E0E0E0] bg-white overflow-hidden">
              <div className="px-3 py-2.5">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <Typography sx={{ fontSize: '0.8125rem', fontWeight: 700, color: '#1A1A1A' }}>
                      {plot.size}
                    </Typography>
                    <TagChip tag={plot.tag} />
                  </div>
                  <Typography sx={{ fontSize: '0.75rem', fontWeight: 600, color: '#1F7A63' }}>
                    ?{plot.pricePerSqYd.toLocaleString('en-IN')}/Sq.Yd
                  </Typography>
                </div>
                <div className="flex items-center justify-between mb-1.5">
                  <Typography sx={{ fontSize: '0.6875rem', color: '#666666' }}>
                    Facing: {plot.facing}
                  </Typography>
                </div>
                <AvailBar available={plot.available} total={plot.total} />
              </div>
            </div>
          ))}
        </div>

        <Button
          variant="contained"
          fullWidth
          sx={{
            mt: 2,
            backgroundColor: '#1F7A63',
            borderRadius: '4px',
            fontWeight: 700,
            fontSize: '0.875rem',
            py: 1.25,
            '&:hover': { backgroundColor: '#145a47' },
          }}
        >
          Check Plot Availability
        </Button>
      </div>

      {/* Lightbox */}
      <Dialog
        open={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{ sx: { bgcolor: '#000000', m: 1 } }}
      >
        <div className="relative">
          <img
            src={layoutImages[imgIdx].src}
            alt={layoutImages[imgIdx].label}
            className="w-full"
          />
          <IconButton
            onClick={() => setLightboxOpen(false)}
            sx={{ position: 'absolute', top: 8, right: 8, bgcolor: 'rgba(0,0,0,0.6)', color: '#FFFFFF', '&:hover': { bgcolor: 'rgba(0,0,0,0.8)' } }}
            size="small"
          >
            <CloseIcon sx={{ fontSize: 18 }} />
          </IconButton>
          <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-3">
            <IconButton onClick={prev} sx={{ bgcolor: 'rgba(255,255,255,0.15)', color: '#FFFFFF' }} size="small">
              <NavigateBeforeIcon />
            </IconButton>
            <IconButton onClick={next} sx={{ bgcolor: 'rgba(255,255,255,0.15)', color: '#FFFFFF' }} size="small">
              <NavigateNextIcon />
            </IconButton>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default Layout;