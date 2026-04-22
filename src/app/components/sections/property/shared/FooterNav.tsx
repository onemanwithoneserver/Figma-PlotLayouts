import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Snackbar from '@mui/material/Snackbar';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import Slide from '@mui/material/Slide';
import type { TransitionProps } from '@mui/material/transitions';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import BookmarkOutlinedIcon from '@mui/icons-material/BookmarkOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import SellerQueries from '../amenities/SellerQueries';
import HeadingIcon from './HeadingIcon';

const ContactDialogTransition = React.forwardRef(function ContactDialogTransition(
  props: TransitionProps & { children: React.ReactElement<unknown> },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const FooterNav: React.FC = () => {
  const [saved, setSaved] = useState(false);
  const [snack, setSnack] = useState('');
  const [askSellerOpen, setAskSellerOpen] = useState(false);

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
      <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center pointer-events-none font-outfit">
        <motion.div
          initial={{ y: 18, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-[390px] bg-[rgba(255,255,255,0.96)] backdrop-blur-[16px] border-t border-[#C8DBCF] shadow-[0_-4px_24px_rgba(15,92,48,0.1)] pointer-events-auto"
          role="toolbar"
          aria-label="Property actions"
        >
          <div className="flex items-end justify-between px-2.5 py-1.5">

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
                ? <BookmarkOutlinedIcon sx={{ fontSize: 20, color: '#15653A' }} />
                : <BookmarkBorderOutlinedIcon sx={{ fontSize: 20, color: '#64786D' }} />
              }
              <span className={`text-[0.625rem] leading-none ${saved ? 'text-[#15653A] font-bold' : 'text-[#64786D] font-semibold'}`}>
                Save
              </span>
            </motion.button>

            <motion.button
              onClick={handleHide}
              whileHover={{ y: -1.5, scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              transition={{ duration: 0.18 }}
              className="flex flex-col items-center gap-0.5 w-12 py-0.5"
              aria-label="Hide property"
            >
              <VisibilityOffOutlinedIcon sx={{ fontSize: 20, color: '#64786D' }} />
              <span className="text-[0.625rem] leading-none text-[#64786D] font-semibold">
                Hide
              </span>
            </motion.button>

            <motion.div
              initial={{ scale: 0.92, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center -mt-3.5"
            >
              <button
                type="button"
                onClick={() => setAskSellerOpen(true)}
                className="flex flex-col items-center"
                aria-label="Open ask seller"
              >
                <motion.div
                  whileHover={{ y: -2, scale: 1.05 }}
                  whileTap={{ scale: 0.96 }}
                  transition={{ duration: 0.18 }}
                  className="w-11 h-11 rounded-[8px] flex items-center justify-center mb-0.5 shadow-[0_6px_18px_rgba(21,101,58,0.4)] border-[3px] border-white"
                  style={{ background: 'linear-gradient(135deg, #15653A, #2F7D4E)' }}
                >
                  <PhoneOutlinedIcon sx={{ fontSize: 20, color: '#ffffff' }} />
                </motion.div>
                <span className="text-[0.625rem] leading-none text-[#15653A] font-bold mt-1">
                  Contact
                </span>
              </button>
            </motion.div>

            <motion.button
              onClick={handleShare}
              whileHover={{ y: -1.5, scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              transition={{ duration: 0.18 }}
              className="flex flex-col items-center gap-0.5 w-12 py-0.5"
              aria-label="Share property"
            >
              <ShareOutlinedIcon sx={{ fontSize: 20, color: '#64786D' }} />
              <span className="text-[0.625rem] leading-none text-[#64786D] font-semibold">
                Share
              </span>
            </motion.button>

            <motion.button
              onClick={handleClose}
              whileHover={{ y: -1.5, scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              transition={{ duration: 0.18 }}
              className="flex flex-col items-center gap-0.5 w-12 py-0.5"
              aria-label="Close property"
            >
              <CloseOutlinedIcon sx={{ fontSize: 20, color: '#DC2626' }} />
              <span className="text-[0.625rem] leading-none text-[#DC2626] font-semibold">
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
        sx={{ bottom: 80, '& .MuiSnackbarContent-root': { fontFamily: "'Outfit', sans-serif" } }}
      />

      <Dialog
        open={askSellerOpen}
        onClose={() => setAskSellerOpen(false)}
        fullWidth
        maxWidth="sm"
        TransitionComponent={ContactDialogTransition}
        keepMounted
        PaperProps={{
          sx: {
            borderRadius: '10px',
            m: 1,
            border: '1px solid #C8DBCF',
            maxWidth: '390px',
            width: '100%',
          },
        }}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-[#C8DBCF]">
          <div className="flex items-center gap-2">
            <HeadingIcon name="ask-seller" className="w-4 h-4" />
            <h3 className="text-[14px] font-bold text-[#0B1F17] font-outfit">Ask Seller</h3>
          </div>
          <IconButton
            onClick={() => setAskSellerOpen(false)}
            size="small"
            aria-label="Close ask seller dialog"
          >
            <CloseOutlinedIcon sx={{ fontSize: 18, color: '#64786D' }} />
          </IconButton>
        </div>
        <SellerQueries />
      </Dialog>
    </>
  );
};

export default FooterNav;