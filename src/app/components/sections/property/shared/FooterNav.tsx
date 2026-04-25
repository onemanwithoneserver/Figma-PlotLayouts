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
      {/* Toolbar - Using Text Primary #1A1A2E background with Border/Divider #E2E8F0 */}
      <div className="fixed bottom-0 left-0 right-0 z-40 flex justify-center pointer-events-none">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="w-full max-w-[390px] bg-[#1A1A2E] border-t border-white/10 shadow-[0_-4px_16px_rgba(0,0,0,0.2)] pointer-events-auto pb-safe"
          role="toolbar"
        >
          <div className="flex items-end justify-between px-2 py-1">
            <motion.button
              onClick={handleSave}
              whileTap={{ scale: 0.92 }}
              className={`flex flex-col items-center gap-[2px] w-[52px] py-1 rounded-[4px] hover:bg-white/5 transition-colors duration-200 ${saved ? 'text-[#F5A623]' : 'text-[#9CA3AF] hover:text-white'}`}
            >
              <motion.div whileHover={{ scale: 1.1 }}>
                {saved ? <BookmarkOutlinedIcon sx={{ fontSize: 20 }} /> : <BookmarkBorderOutlinedIcon sx={{ fontSize: 20 }} />}
              </motion.div>
              <span className="text-[10px] font-bold tracking-tight">Save</span>
            </motion.button>

            <motion.button
              onClick={handleHide}
              whileTap={{ scale: 0.92 }}
              className="flex flex-col items-center gap-[2px] w-[52px] py-1 rounded-[4px] hover:bg-white/5 transition-colors duration-200 text-[#9CA3AF] hover:text-white"
            >
              <motion.div whileHover={{ scale: 1.1 }}><VisibilityOffOutlinedIcon sx={{ fontSize: 20 }} /></motion.div>
              <span className="text-[10px] font-bold tracking-tight">Hide</span>
            </motion.button>

            {/* Central Primary Brand Action */}
            <div className="flex flex-col items-center -mt-6 relative z-10 px-1">
              <motion.button
                onClick={() => setAskSellerOpen(true)}
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.94 }}
                className="w-12 h-12 rounded-xl flex items-center justify-center shadow-[0_4px_16px_rgba(26,107,74,0.4)] border border-white/30 relative overflow-hidden group bg-gradient-to-br from-[#1A6B4A] to-[#124b33]"
              >
                <motion.div 
                  animate={{ x: ['-150%', '150%'] }}
                  transition={{ repeat: Infinity, duration: 3, ease: "easeInOut", repeatDelay: 2 }}
                  className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-20deg]" 
                />
                <PhoneOutlinedIcon sx={{ fontSize: 22, color: '#ffffff' }} />
              </motion.button>
              <span className="text-[10px] font-black text-white tracking-widest uppercase mt-1 drop-shadow-sm">Contact</span>
            </div>

            <motion.button
              onClick={handleShare}
              whileTap={{ scale: 0.92 }}
              className="flex flex-col items-center gap-[2px] w-[52px] py-1 rounded-[4px] hover:bg-white/5 transition-colors duration-200 text-[#9CA3AF] hover:text-white"
            >
              <motion.div whileHover={{ scale: 1.1 }}><ShareOutlinedIcon sx={{ fontSize: 20 }} /></motion.div>
              <span className="text-[10px] font-bold tracking-tight">Share</span>
            </motion.button>

            <motion.button
              onClick={handleClose}
              whileTap={{ scale: 0.92 }}
              className="flex flex-col items-center gap-[2px] w-[52px] py-1 rounded-[4px] hover:bg-white/5 transition-colors duration-200 text-[#EF4444] hover:text-[#FCA5A5]"
            >
              <motion.div whileHover={{ scale: 1.1 }}><CloseOutlinedIcon sx={{ fontSize: 20 }} /></motion.div>
              <span className="text-[10px] font-bold tracking-tight">Close</span>
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Snackbar - Using Text Primary bg with Primary Tint accent */}
      <AnimatePresence>
        {snack && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 pointer-events-none"
          >
            <div className="bg-[#1A1A2E]/90 backdrop-blur-md text-[#D4F5E7] border border-[#1A6B4A]/30 shadow-xl px-4 py-2 rounded-full text-[12px] font-bold tracking-wide whitespace-nowrap">
              {snack}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Contact Form Modal */}
      <AnimatePresence>
        {askSellerOpen && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-2">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !isSubmitting && setAskSellerOpen(false)}
              className="absolute inset-0 bg-[#1A1A2E]/40 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 15, scale: 0.98 }}
              className="relative w-full max-w-[360px] bg-white/95 backdrop-blur-xl border border-[#E2E8F0] rounded-2xl shadow-2xl overflow-hidden"
            >
              <div className="flex items-center justify-between px-4 py-3 border-b border-[#E2E8F0] bg-[#F5F7FA]">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-[#D4F5E7] flex items-center justify-center shadow-sm">
                    <HeadingIcon name="ask-seller" className="w-4 h-4 text-[#1A6B4A]" />
                  </div>
                  <h3 className="text-[16px] font-bold text-[#1A1A2E] tracking-tight">Contact Seller</h3>
                </div>
                <button 
                  onClick={() => setAskSellerOpen(false)}
                  className="p-1 rounded-md text-[#EF4444] hover:bg-[#FEE2E2] hover:text-[#DC2626] transition-colors"
                >
                  <CloseOutlinedIcon sx={{ fontSize: 20 }} />
                </button>
              </div>
              
              <motion.form 
                onSubmit={handleSubmit}
                variants={formVariants}
                initial="hidden"
                animate="visible"
                className="flex flex-col gap-3 p-4"
              >
                {[
                  { id: 'name', label: 'Full Name', type: 'text', icon: null },
                  { id: 'phone', label: 'Phone Number', type: 'tel', icon: null },
                ].map((field) => (
                  <motion.div variants={inputVariants} key={field.id} className="relative">
                    <input 
                      type={field.type}
                      required
                      value={formData[field.id as keyof typeof formData]}
                      onChange={(e) => setFormData({...formData, [field.id]: e.target.value})}
                      placeholder=" "
                      className="peer w-full bg-[#F5F7FA] border border-[#E2E8F0] rounded-xl px-4 py-3 text-[14px] font-medium text-[#1A1A2E] focus:bg-white focus:ring-2 focus:ring-[#1A6B4A]/20 focus:border-[#1A6B4A] outline-none transition-all shadow-sm"
                    />
                    <label className="absolute left-4 top-3 text-[#4A5568] text-[14px] pointer-events-none transition-all peer-focus:text-[10px] peer-focus:-top-2 peer-focus:left-3 peer-focus:bg-white peer-focus:px-1 peer-focus:font-bold peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:-top-2 peer-[:not(:placeholder-shown)]:left-3 peer-[:not(:placeholder-shown)]:bg-white peer-[:not(:placeholder-shown)]:px-1 peer-[:not(:placeholder-shown)]:font-bold">
                      {field.label}
                    </label>
                  </motion.div>
                ))}

                <motion.div variants={inputVariants} className="relative">
                  <textarea 
                    required
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    placeholder=" "
                    className="peer w-full bg-[#F5F7FA] border border-[#E2E8F0] rounded-xl px-4 py-3 text-[14px] font-medium text-[#1A1A2E] focus:bg-white focus:ring-2 focus:ring-[#1A6B4A]/20 focus:border-[#1A6B4A] outline-none transition-all shadow-sm resize-none"
                  />
                  <label className="absolute left-4 top-3 text-[#4A5568] text-[14px] pointer-events-none transition-all peer-focus:text-[10px] peer-focus:-top-2 peer-focus:left-3 peer-focus:bg-white peer-focus:px-1 peer-focus:font-bold peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:-top-2 peer-[:not(:placeholder-shown)]:left-3 peer-[:not(:placeholder-shown)]:bg-white peer-[:not(:placeholder-shown)]:px-1 peer-[:not(:placeholder-shown)]:font-bold">
                    Message
                  </label>
                </motion.div>

                <motion.div variants={inputVariants} className="mt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full relative h-12 overflow-hidden rounded-xl bg-gradient-to-r from-[#1A6B4A] to-[#124b33] flex items-center justify-center shadow-[0_4px_12px_rgba(26,107,74,0.3)] disabled:opacity-70 transition-all active:scale-95"
                  >
                    <span className="flex items-center gap-2 text-[14px] font-bold text-white tracking-wide relative z-10">
                      {isSubmitting ? (
                        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
                          <AutorenewOutlinedIcon sx={{ fontSize: 20 }} />
                        </motion.div>
                      ) : (
                        <>Send Message <SendOutlinedIcon sx={{ fontSize: 18 }} /></>
                      )}
                    </span>
                  </button>
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