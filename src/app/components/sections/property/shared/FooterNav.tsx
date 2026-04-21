import React, { useState } from 'react';
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
      navigator.share({ title: 'Vasavi Skyla — Chevella', url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
      setSnack('Link copied!');
    }
  };

  const handleHide = () => setSnack('Property hidden');
  const handleClose = () => setSnack('Closed');

  return (
    <>
      {/* Sticky bottom bar — subtle glass, compact, non-intrusive */}
      <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center pointer-events-none">
        <div
          className="w-full max-w-[390px] glass-sticky pointer-events-auto"
          role="toolbar"
          aria-label="Property actions"
        >
          <div className="flex items-center justify-between px-2 py-1.5">

            {/* Save */}
            <button
              onClick={handleSave}
              className="flex flex-col items-center gap-0.5 w-14 py-1"
              aria-label={saved ? 'Remove from saved' : 'Save property'}
              aria-pressed={saved}
            >
              {saved
                ? <BookmarkOutlinedIcon sx={{ fontSize: 22, color: 'var(--accent-primary)' }} />
                : <BookmarkBorderOutlinedIcon sx={{ fontSize: 22, color: '#757575' }} />
              }
              <span className={`text-[0.6875rem] ${saved ? 'text-[var(--accent-primary)] font-bold' : 'text-[#757575]'}`}>
                Save
              </span>
            </button>

            {/* Hide */}
            <button
              onClick={handleHide}
              className="flex flex-col items-center gap-0.5 w-14 py-1"
              aria-label="Hide property"
            >
              <VisibilityOffOutlinedIcon sx={{ fontSize: 22, color: '#757575' }} />
              <span className="text-[0.6875rem] text-[#757575]">
                Hide
              </span>
            </button>

            {/* Contact — center CTA */}
            <div className="flex flex-col items-center -mt-4">
              <a href="tel:+919999999999" className="flex flex-col items-center" aria-label="Call seller">
                <div
                  className="w-12 h-12 rounded-[var(--radius-md)] flex items-center justify-center mb-0.5 shadow-[0_2px_12px_rgba(31,122,92,0.25)]"
                  style={{ background: 'var(--gradient-accent)' }}
                >
                  <PhoneOutlinedIcon sx={{ fontSize: 22, color: '#ffffff' }} />
                </div>
                <span className="text-[0.6875rem] text-[var(--accent-primary)] font-bold">
                  Contact
                </span>
              </a>
            </div>

            {/* Share */}
            <button
              onClick={handleShare}
              className="flex flex-col items-center gap-0.5 w-14 py-1"
              aria-label="Share property"
            >
              <ShareOutlinedIcon sx={{ fontSize: 22, color: '#757575' }} />
              <span className="text-[0.6875rem] text-[#757575]">
                Share
              </span>
            </button>

            {/* Close */}
            <button
              onClick={handleClose}
              className="flex flex-col items-center gap-0.5 w-14 py-1"
              aria-label="Close property"
            >
              <CloseOutlinedIcon sx={{ fontSize: 22, color: '#EF5350' }} />
              <span className="text-[0.6875rem] text-[#EF5350]">
                Close
              </span>
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