import React, { useState } from 'react';
import { motion } from 'framer-motion';
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
        <motion.div
          initial={{ y: 18, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-[390px] glass-sticky pointer-events-auto"
          role="toolbar"
          aria-label="Property actions"
        >
          <div className="flex items-end justify-between px-1.5 py-1">

            {/* Save */}
            <motion.button
              onClick={handleSave}
              whileHover={{ y: -1.5, scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              transition={{ duration: 0.18 }}
              className="flex flex-col items-center gap-0.5 w-12 py-0.5"
              aria-label={saved ? 'Remove from saved' : 'Save property'}
              aria-pressed={saved}
            >
              {saved
                ? <BookmarkOutlinedIcon sx={{ fontSize: 20, color: 'var(--accent-primary)' }} />
                : <BookmarkBorderOutlinedIcon sx={{ fontSize: 20, color: 'var(--text-gray)' }} />
              }
              <span className={`text-[0.625rem] leading-none ${saved ? 'text-[var(--accent-primary)] font-bold' : 'text-[var(--text-gray)]'}`}>
                Save
              </span>
            </motion.button>

            {/* Hide */}
            <motion.button
              onClick={handleHide}
              whileHover={{ y: -1.5, scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              transition={{ duration: 0.18 }}
              className="flex flex-col items-center gap-0.5 w-12 py-0.5"
              aria-label="Hide property"
            >
              <VisibilityOffOutlinedIcon sx={{ fontSize: 20, color: 'var(--text-gray)' }} />
              <span className="text-[0.625rem] leading-none text-[var(--text-gray)]">
                Hide
              </span>
            </motion.button>

            {/* Contact — center CTA */}
            <motion.div
              initial={{ scale: 0.92, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center -mt-3"
            >
              <a href="tel:+919999999999" className="flex flex-col items-center" aria-label="Call seller">
                <motion.div
                  whileHover={{ y: -2, scale: 1.05 }}
                  whileTap={{ scale: 0.96 }}
                  transition={{ duration: 0.18 }}
                  className="w-10 h-10 rounded-[2px] flex items-center justify-center mb-0.5 shadow-[0_2px_12px_var(--primary-alpha-25)]"
                  style={{ background: 'var(--gradient-accent)' }}
                >
                  <PhoneOutlinedIcon sx={{ fontSize: 18, color: 'var(--background-color)' }} />
                </motion.div>
                <span className="text-[0.625rem] leading-none text-[var(--accent-primary)] font-bold">
                  Contact
                </span>
              </a>
            </motion.div>

            {/* Share */}
            <motion.button
              onClick={handleShare}
              whileHover={{ y: -1.5, scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              transition={{ duration: 0.18 }}
              className="flex flex-col items-center gap-0.5 w-12 py-0.5"
              aria-label="Share property"
            >
              <ShareOutlinedIcon sx={{ fontSize: 20, color: 'var(--text-gray)' }} />
              <span className="text-[0.625rem] leading-none text-[var(--text-gray)]">
                Share
              </span>
            </motion.button>

            {/* Close */}
            <motion.button
              onClick={handleClose}
              whileHover={{ y: -1.5, scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              transition={{ duration: 0.18 }}
              className="flex flex-col items-center gap-0.5 w-12 py-0.5"
              aria-label="Close property"
            >
              <CloseOutlinedIcon sx={{ fontSize: 20, color: 'var(--error-color-alt2)' }} />
              <span className="text-[0.625rem] leading-none text-[var(--error-color-alt2)]">
                Close
              </span>
            </motion.button>

          </div>
        </motion.div>
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