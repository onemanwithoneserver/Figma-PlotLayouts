import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Snackbar from '@mui/material/Snackbar';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import BookmarkOutlinedIcon from '@mui/icons-material/BookmarkOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

const FooterNav: React.FC = () => {
  const [saved, setSaved] = useState(false);
  const [snack, setSnack] = useState('');

  const handleSave = () => {
    setSaved((v) => !v);
    setSnack(saved ? 'Removed from saved' : 'Saved!');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: 'Vasavi Skyla â€“ Chevella', url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
      setSnack('Link copied!');
    }
  };

  const handleHide = () => setSnack('Property hidden');
  const handleClose = () => setSnack('Closed');

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center pointer-events-none">
        <div
          className="w-full max-w-[390px] bg-white pointer-events-auto"
          style={{ borderTop: '1px solid #E0E0E0' }}
        >
          <div className="flex items-center justify-between px-2 py-1.5">

            {/* Save */}
            <button
              onClick={handleSave}
              className="flex flex-col items-center gap-0.5 w-14 py-1"
            >
              {saved
                ? <BookmarkOutlinedIcon sx={{ fontSize: 22, color: '#1F7A63' }} />
                : <BookmarkBorderOutlinedIcon sx={{ fontSize: 22, color: '#757575' }} />
              }
              <Typography sx={{ fontSize: '0.6875rem', color: saved ? '#1F7A63' : '#757575', fontWeight: saved ? 700 : 400 }}>
                Save
              </Typography>
            </button>

            {/* Hide */}
            <button
              onClick={handleHide}
              className="flex flex-col items-center gap-0.5 w-14 py-1"
            >
              <VisibilityOffOutlinedIcon sx={{ fontSize: 22, color: '#757575' }} />
              <Typography sx={{ fontSize: '0.6875rem', color: '#757575' }}>
                Hide
              </Typography>
            </button>

            {/* Contact â€” center CTA */}
            <div className="flex flex-col items-center -mt-4">
              <a href="tel:+919999999999" className="flex flex-col items-center">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center mb-0.5"
                  style={{ backgroundColor: '#1F7A63' }}
                >
                  <PhoneOutlinedIcon sx={{ fontSize: 22, color: '#ffffff' }} />
                </div>
                <Typography sx={{ fontSize: '0.6875rem', color: '#1F7A63', fontWeight: 700 }}>
                  Contact
                </Typography>
              </a>
            </div>

            {/* Share */}
            <button
              onClick={handleShare}
              className="flex flex-col items-center gap-0.5 w-14 py-1"
            >
              <ShareOutlinedIcon sx={{ fontSize: 22, color: '#757575' }} />
              <Typography sx={{ fontSize: '0.6875rem', color: '#757575' }}>
                Share
              </Typography>
            </button>

            {/* Close */}
            <button
              onClick={handleClose}
              className="flex flex-col items-center gap-0.5 w-14 py-1"
            >
              <CloseOutlinedIcon sx={{ fontSize: 22, color: '#EF5350' }} />
              <Typography sx={{ fontSize: '0.6875rem', color: '#EF5350' }}>
                Close
              </Typography>
            </button>

          </div>
        </div>
      </div>

      <Snackbar
        open={!!snack}
        autoHideDuration={2000}
        onClose={() => setSnack('')}
        message={snack}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        sx={{ bottom: 80 }}
      />
    </>
  );
};

export default FooterNav;