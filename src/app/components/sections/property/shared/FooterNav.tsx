import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
    setSnack(saved ? 'removed from saved' : 'saved to favorites');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: 'Vasavi Skyla — Chevella', url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
      setSnack('link copied to clipboard');
    }
  };

  const handleHide = () => setSnack('property hidden');
  const handleClose = () => setSnack('closed');

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center pointer-events-none font-inter">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          className="w-full max-w-[390px] bg-[rgba(255,255,255,0.7)] backdrop-blur-[24px] border-t border-[rgba(255,255,255,0.6)] shadow-[0_-8px_32px_rgba(0,0,0,0.06)] pointer-events-auto pb-safe"
          role="toolbar"
        >
          <div className="flex items-end justify-between px-3 py-2">

            {/* Save Button */}
            <motion.button
              onClick={handleSave}
              whileTap={{ scale: 0.9 }}
              className="flex flex-col items-center gap-1 w-14 py-1 group"
            >
              <div className={`transition-colors duration-200 ${saved ? 'text-[#2F6F4E]' : 'text-[#4A5560] group-hover:text-[#2F6F4E]'}`}>
                {saved ? <BookmarkOutlinedIcon sx={{ fontSize: 22 }} /> : <BookmarkBorderOutlinedIcon sx={{ fontSize: 22 }} />}
              </div>
              <span className={`text-[10px] font-bold  tracking-wide transition-colors duration-200 ${saved ? 'text-[#2F6F4E]' : 'text-[#6B7280] group-hover:text-[#4A5560]'}`}>
                save
              </span>
            </motion.button>

            {/* Hide Button */}
            <motion.button
              onClick={handleHide}
              whileTap={{ scale: 0.9 }}
              className="flex flex-col items-center gap-1 w-14 py-1 group"
            >
              <VisibilityOffOutlinedIcon sx={{ fontSize: 22 }} className="text-[#4A5560] group-hover:text-[#1A1F24] transition-colors" />
              <span className="text-[10px] font-bold text-[#6B7280] group-hover:text-[#4A5560]  tracking-wide transition-colors">
                hide
              </span>
            </motion.button>

            {/* Center Contact Action */}
            <div className="flex flex-col items-center -mt-6 relative z-10">
              <motion.button
                onClick={() => setAskSellerOpen(true)}
                whileHover={{ y: -3, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-14 h-14 rounded-[12px] flex items-center justify-center shadow-[0_12px_24px_rgba(47,111,78,0.3)] border-[4px] border-white relative overflow-hidden group/btn"
                style={{ background: 'linear-gradient(135deg, #2F6F4E, #1E4D35)' }}
              >
                {/* Light Sweep */}
                <div className="absolute top-0 -left-[100%] w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-20deg] group-hover/btn:left-[100%] transition-all duration-700 pointer-events-none" />
                <PhoneOutlinedIcon sx={{ fontSize: 24, color: '#ffffff' }} />
              </motion.button>
              <span className="text-[10px] font-black text-[#2F6F4E]  tracking-widest mt-1.5 drop-shadow-sm">
                contact
              </span>
            </div>

            {/* Share Button */}
            <motion.button
              onClick={handleShare}
              whileTap={{ scale: 0.9 }}
              className="flex flex-col items-center gap-1 w-14 py-1 group"
            >
              <ShareOutlinedIcon sx={{ fontSize: 22 }} className="text-[#4A5560] group-hover:text-[#4A90E2] transition-colors" />
              <span className="text-[10px] font-bold text-[#6B7280] group-hover:text-[#4A5560]  tracking-wide transition-colors">
                share
              </span>
            </motion.button>

            {/* Close Button */}
            <motion.button
              onClick={handleClose}
              whileTap={{ scale: 0.9 }}
              className="flex flex-col items-center gap-1 w-14 py-1 group"
            >
              <CloseOutlinedIcon sx={{ fontSize: 22 }} className="text-[#C65A3A] group-hover:text-[#C65A3A] transition-colors" />
              <span className="text-[10px] font-bold text-[#C65A3A]  tracking-wide transition-colors">
                close
              </span>
            </motion.button>

          </div>
        </motion.div>
      </div>

      {/* Glass Snackbar */}
      <Snackbar
        open={!!snack}
        autoHideDuration={2000}
        onClose={() => setSnack('')}
        message={snack}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        sx={{ 
          bottom: 100, 
          '& .MuiSnackbarContent-root': { 
            bgcolor: 'rgba(26, 31, 36, 0.85)',
            backdropFilter: 'blur(12px)',
            borderRadius: '8px',
            fontSize: '13px',
            fontWeight: 600,
            textTransform: '',
            fontFamily: 'Inter, sans-serif',
            minWidth: 'auto',
            textAlign: 'center',
            boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
            border: '1px solid rgba(255,255,255,0.1)'
          } 
        }}
      />

      {/* Modern Contact Dialog */}
      <Dialog
        open={askSellerOpen}
        onClose={() => setAskSellerOpen(false)}
        fullWidth
        maxWidth="sm"
        TransitionComponent={ContactDialogTransition}
        keepMounted
        PaperProps={{
          sx: {
            borderRadius: '12px',
            m: 1.5,
            bgcolor: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(24px)',
            border: '1px solid rgba(255, 255, 255, 0.6)',
            maxWidth: '390px',
            width: '100%',
            boxShadow: '0 24px 64px rgba(0,0,0,0.15)',
          },
        }}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-[rgba(0,0,0,0.05)]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-[8px] bg-[rgba(47,111,78,0.1)] border border-[rgba(47,111,78,0.2)] flex items-center justify-center">
              <HeadingIcon name="ask-seller" className="w-4 h-4 text-[#2F6F4E]" />
            </div>
            <h3 className="text-[16px] font-bold text-[#1A1F24] tracking-tight">Ask Seller</h3>
          </div>
          <IconButton
            onClick={() => setAskSellerOpen(false)}
            size="small"
            sx={{ 
              bgcolor: 'rgba(0,0,0,0.04)',
              '&:hover': { bgcolor: 'rgba(0,0,0,0.08)' }
            }}
          >
            <CloseOutlinedIcon sx={{ fontSize: 18, color: '#4A5560' }} />
          </IconButton>
        </div>
        <div className="p-1">
          <SellerQueries />
        </div>
      </Dialog>
    </>
  );
};

export default FooterNav;