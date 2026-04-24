import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import BookmarkOutlinedIcon from '@mui/icons-material/BookmarkOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import AutorenewOutlinedIcon from '@mui/icons-material/AutorenewOutlined';
import HeadingIcon from './HeadingIcon';

const formVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.05 },
  },
};

const inputVariants: Variants = {
  hidden: { opacity: 0, y: 4 },
  visible: { 
    opacity: 1, y: 0,
    transition: { type: 'spring', stiffness: 400, damping: 30 }
  },
};

const FooterNav: React.FC = () => {
  const [saved, setSaved] = useState(false);
  const [snack, setSnack] = useState('');
  const [askSellerOpen, setAskSellerOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    description: ''
  });

  useEffect(() => {
    if (snack) {
      const timer = setTimeout(() => setSnack(''), 2500);
      return () => clearTimeout(timer);
    }
  }, [snack]);

  const handleSave = () => {
    setSaved((v) => !v);
    setSnack(saved ? 'Removed from saved' : 'Saved to favorites');
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: 'Vasavi Skyla — Chevella', url: window.location.href });
      } catch (err) {}
    } else {
      navigator.clipboard.writeText(window.location.href);
      setSnack('Link copied');
    }
  };

  const handleHide = () => setSnack('Property hidden');
  const handleClose = () => setSnack('Menu closed');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    await new Promise((resolve) => setTimeout(resolve, 1200));
    
    setIsSubmitting(false);
    setSnack('Message sent successfully');
    setAskSellerOpen(false);
    setFormData({ name: '', phone: '', description: '' });
  };

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 z-40 flex justify-center pointer-events-none">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="w-full max-w-[390px] bg-[#1A1A2E] border-t border-[#283046] shadow-[0_-2px_10px_rgba(0,0,0,0.28)] pointer-events-auto pb-safe"
          role="toolbar"
        >
          <div className="flex items-end justify-between px-[8px] py-[4px]">
            <motion.button
              onClick={handleSave}
              whileTap={{ scale: 0.92 }}
              className="flex flex-col items-center gap-[2px] w-[52px] py-[4px] rounded-[4px] hover:bg-white/10 transition-colors"
            >
              <motion.div whileHover={{ scale: 1.08 }} className={`transition-colors duration-200 ${saved ? 'text-[#F5A623]' : 'text-[#CBD5E0]'}`}>
                {saved ? <BookmarkOutlinedIcon sx={{ fontSize: 20 }} /> : <BookmarkBorderOutlinedIcon sx={{ fontSize: 20 }} />}
              </motion.div>
              <span className={`text-[11px] font-semibold tracking-wide transition-colors duration-200 ${saved ? 'text-[#F5A623]' : 'text-[#CBD5E0]'}`}>Save</span>
            </motion.button>

            <motion.button
              onClick={handleHide}
              whileTap={{ scale: 0.92 }}
              className="flex flex-col items-center gap-[2px] w-[52px] py-[4px] rounded-[4px] hover:bg-white/10 transition-colors text-[#CBD5E0]"
            >
              <motion.div whileHover={{ scale: 1.08 }}><VisibilityOffOutlinedIcon sx={{ fontSize: 20 }} /></motion.div>
              <span className="text-[11px] font-semibold tracking-wide">Hide</span>
            </motion.button>

            <div className="flex flex-col items-center -mt-[24px] relative z-10 px-[4px]">
              <motion.button
                onClick={() => setAskSellerOpen(true)}
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.94 }}
                className="w-[48px] h-[48px] rounded-[8px] flex items-center justify-center shadow-[0_4px_12px_rgba(31,65,46,0.24)] border-[1px] border-white/90 relative overflow-hidden group"
                style={{ background: 'linear-gradient(135deg, #2F6F4E, #1E4D35)' }}
              >
                <motion.div 
                  animate={{ x: ['-150%', '150%'] }}
                  transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut", repeatDelay: 1.5 }}
                  className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-20deg]" 
                />
                <PhoneOutlinedIcon sx={{ fontSize: 22, color: '#ffffff' }} />
              </motion.button>
              <span className="text-[11px] font-bold text-white tracking-wide mt-[4px]">Contact</span>
            </div>

            <motion.button
              onClick={handleShare}
              whileTap={{ scale: 0.92 }}
              className="flex flex-col items-center gap-[2px] w-[52px] py-[4px] rounded-[4px] hover:bg-white/10 transition-colors text-[#CBD5E0]"
            >
              <motion.div whileHover={{ scale: 1.08 }}><ShareOutlinedIcon sx={{ fontSize: 20 }} /></motion.div>
              <span className="text-[11px] font-semibold tracking-wide">Share</span>
            </motion.button>

            <motion.button
              onClick={handleClose}
              whileTap={{ scale: 0.92 }}
              className="flex flex-col items-center gap-[2px] w-[52px] py-[4px] rounded-[4px] hover:bg-[#B84B2C]/8 transition-colors text-[#B84B2C]"
            >
              <motion.div whileHover={{ scale: 1.08 }}><CloseOutlinedIcon sx={{ fontSize: 20 }} /></motion.div>
              <span className="text-[11px] font-semibold tracking-wide">Close</span>
            </motion.button>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {snack && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            className="fixed bottom-[80px] left-1/2 -translate-x-1/2 z-50 pointer-events-none"
          >
            <div className="bg-[#173625]/88 backdrop-blur-[10px] text-white border-[1px] border-white/12 shadow-[0_4px_12px_rgba(31,65,46,0.2)] px-[16px] py-[8px] rounded-[4px] text-[12px] font-semibold tracking-wide text-center whitespace-nowrap">
              {snack}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {askSellerOpen && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-[8px]">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => !isSubmitting && setAskSellerOpen(false)}
              className="absolute inset-0 bg-[#0F172A]/30 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 15, scale: 0.96 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              className="glass-float relative w-full max-w-[390px] overflow-hidden flex flex-col"
            >
              <div className="flex items-center justify-between px-[12px] py-[8px] border-b-[1px] border-black/5 bg-gradient-to-b from-white/60 to-transparent">
                <div className="flex items-center gap-[6px]">
                  <div className="w-[26px] h-[26px] rounded-[4px] bg-[#2F6F4E]/10 border-[1px] border-[#2F6F4E]/20 flex items-center justify-center shadow-sm">
                    <HeadingIcon name="ask-seller" className="w-[14px] h-[14px] text-[#2F6F4E]" />
                  </div>
                  <h3 className="text-[15px] font-extrabold text-[#142218] tracking-tight">Contact Seller</h3>
                </div>
                <motion.button
                  whileHover={!isSubmitting ? { backgroundColor: 'rgba(0,0,0,0.06)' } : {}}
                  whileTap={!isSubmitting ? { scale: 0.9 } : {}}
                  onClick={() => setAskSellerOpen(false)}
                  disabled={isSubmitting}
                  className="p-[4px] rounded-[4px] text-[#64748B] hover:text-[#1A1F24] disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
                >
                  <CloseOutlinedIcon sx={{ fontSize: 18 }} />
                </motion.button>
              </div>
              
              <motion.form 
                onSubmit={handleSubmit}
                variants={formVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="flex flex-col gap-[12px] p-[12px]"
              >
                <motion.div variants={inputVariants} className="input-shell">
                  <input 
                    type="text" 
                    required
                    aria-label="Full Name"
                    title="Full Name"
                    disabled={isSubmitting}
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Full Name"
                    className="w-full bg-white/58 border-[1px] border-black/10 rounded-[8px] px-[12px] py-[10px] text-[14px] font-medium text-[#142218] placeholder:text-transparent focus:bg-white focus:outline-none focus:border-[#2F6F4E]/45 focus:shadow-[0_0_0_3px_rgba(34,197,94,0.18)] disabled:opacity-60 disabled:bg-black/5 disabled:cursor-not-allowed shadow-[inset_0_1px_2px_rgba(31,65,46,0.04)]"
                  />
                  <label>Full Name</label>
                </motion.div>

                <motion.div variants={inputVariants} className="input-shell">
                  <input 
                    type="tel" 
                    required
                    aria-label="Phone Number"
                    title="Phone Number"
                    disabled={isSubmitting}
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    placeholder="Phone Number"
                    className="w-full bg-white/58 border-[1px] border-black/10 rounded-[8px] px-[12px] py-[10px] text-[14px] font-medium text-[#142218] placeholder:text-transparent focus:bg-white focus:outline-none focus:border-[#2F6F4E]/45 focus:shadow-[0_0_0_3px_rgba(34,197,94,0.18)] disabled:opacity-60 disabled:bg-black/5 disabled:cursor-not-allowed shadow-[inset_0_1px_2px_rgba(31,65,46,0.04)]"
                  />
                  <label>Phone Number</label>
                </motion.div>

                <motion.div variants={inputVariants} className="input-shell">
                  <textarea 
                    required
                    rows={3}
                    aria-label="Message"
                    title="Message"
                    disabled={isSubmitting}
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    placeholder="Message"
                    className="w-full bg-white/58 border-[1px] border-black/10 rounded-[8px] px-[12px] py-[10px] text-[14px] font-medium text-[#142218] placeholder:text-transparent focus:bg-white focus:outline-none focus:border-[#2F6F4E]/45 focus:shadow-[0_0_0_3px_rgba(34,197,94,0.18)] disabled:opacity-60 disabled:bg-black/5 disabled:cursor-not-allowed shadow-[inset_0_1px_2px_rgba(31,65,46,0.04)] resize-none"
                  />
                  <label>Message</label>
                </motion.div>

                <motion.div variants={inputVariants} className="mt-[4px]">
                  <motion.button
                    whileHover={!isSubmitting ? { scale: 1.01, y: -1 } : {}}
                    whileTap={!isSubmitting ? { scale: 0.98, y: 0 } : {}}
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full relative overflow-hidden rounded-[4px] py-[10px] flex items-center justify-center shadow-[0_4px_12px_rgba(31,65,46,0.22)] border-[1px] border-white/20 group disabled:opacity-70 disabled:cursor-not-allowed transition-all"
                    style={{ background: 'linear-gradient(135deg, #2F6F4E, #1E4D35)' }}
                  >
                    {!isSubmitting && (
                      <motion.div 
                        className="absolute inset-0 w-full h-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
                      />
                    )}
                    <span className="flex items-center gap-[8px] text-[13px] font-bold text-white tracking-wide relative z-10 drop-shadow-sm">
                      {isSubmitting ? (
                        <>
                          Sending...
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                          >
                            <AutorenewOutlinedIcon sx={{ fontSize: 16 }} />
                          </motion.div>
                        </>
                      ) : (
                        <>
                          Send Message
                          <SendOutlinedIcon 
                            sx={{ fontSize: 16 }} 
                            className="transform group-hover:translate-x-[2px] group-hover:-translate-y-[2px] transition-transform duration-300" 
                          />
                        </>
                      )}
                    </span>
                  </motion.button>
                </motion.div>
              </motion.form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FooterNav;
