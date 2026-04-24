import React, { useState } from 'react';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import QuestionAnswerOutlinedIcon from '@mui/icons-material/QuestionAnswerOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const SellerQueries: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [question, setQuestion] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && phone.trim()) {
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <div className="p-8 flex flex-col items-center gap-4 text-center rounded-xl bg-white/70 backdrop-blur-2xl border border-white/60 shadow-xl animate-fade-blur-in">
        <div className="w-16 h-16 rounded-2xl bg-[#2F6F4E]/10 border border-[#2F6F4E]/20 flex items-center justify-center mb-2 animate-scale-in">
          <CheckCircleOutlineIcon sx={{ fontSize: 32, color: '#2F6F4E' }} />
        </div>
        
        <div className="space-y-1">
          <h3 className="font-bold text-xl text-[#1A1F24] tracking-tight m-0">
            Request Received
          </h3>
          <p className="text-sm text-[#4A5560] leading-relaxed m-0">
            We'll call you back on <span className="text-[#1A1F24] font-semibold">{phone}</span> shortly.
          </p>
        </div>
        
        <button
          className="w-full mt-4 bg-white/50 border border-white/80 text-[#1A1F24] rounded-lg font-semibold text-sm py-3 shadow-sm transition-all duration-300 hover:bg-white/90 hover:-translate-y-0.5 hover:shadow-md active:scale-95"
          onClick={() => { setSubmitted(false); setName(''); setPhone(''); setQuestion(''); }}
        >
          Ask Another Question
        </button>
      </div>
    );
  }

  return (
    <form 
      onSubmit={handleSubmit}
      className="p-5 flex flex-col gap-5 rounded-xl bg-white/40 border border-white/50 shadow-sm"
    >
      <div className="relative group animate-fade-blur-in opacity-0" style={{ animationDelay: '50ms' }}>
        <div className="absolute left-3.5 top-[13px] text-[#4A5560] transition-colors duration-300 group-focus-within:text-[#2F6F4E] pointer-events-none z-10">
          <PersonOutlinedIcon sx={{ fontSize: 20 }} />
        </div>
        <input
          type="text"
          id="seller-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder=" "
          className="peer w-full bg-white/70 backdrop-blur-md border border-white/60 rounded-lg pt-6 pb-2 pl-11 pr-4 text-sm font-medium text-[#1A1F24] transition-all duration-300 focus:bg-white/95 focus:border-[#2F6F4E] focus:ring-4 focus:ring-[#2F6F4E]/10 focus:outline-none"
        />
        <label 
          htmlFor="seller-name"
          className="absolute left-11 top-4 text-sm font-medium text-[#6B7280] transition-all duration-300 pointer-events-none peer-focus:top-1.5 peer-focus:text-[11px] peer-focus:text-[#2F6F4E] peer-[:not(:placeholder-shown)]:top-1.5 peer-[:not(:placeholder-shown)]:text-[11px]"
        >
          Full Name
        </label>
      </div>
      
      <div className="relative group animate-fade-blur-in opacity-0" style={{ animationDelay: '100ms' }}>
        <div className="absolute left-3.5 top-[13px] text-[#4A5560] transition-colors duration-300 group-focus-within:text-[#2F6F4E] pointer-events-none z-10">
          <PhoneOutlinedIcon sx={{ fontSize: 20 }} />
        </div>
        <input
          type="tel"
          id="seller-phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder=" "
          className="peer w-full bg-white/70 backdrop-blur-md border border-white/60 rounded-lg pt-6 pb-2 pl-11 pr-4 text-sm font-medium text-[#1A1F24] transition-all duration-300 focus:bg-white/95 focus:border-[#2F6F4E] focus:ring-4 focus:ring-[#2F6F4E]/10 focus:outline-none"
        />
        <label 
          htmlFor="seller-phone"
          className="absolute left-11 top-4 text-sm font-medium text-[#6B7280] transition-all duration-300 pointer-events-none peer-focus:top-1.5 peer-focus:text-[11px] peer-focus:text-[#2F6F4E] peer-[:not(:placeholder-shown)]:top-1.5 peer-[:not(:placeholder-shown)]:text-[11px]"
        >
          Phone Number
        </label>
      </div>
      
      <div className="relative group animate-fade-blur-in opacity-0" style={{ animationDelay: '150ms' }}>
        <div className="absolute left-3.5 top-[13px] text-[#4A5560] transition-colors duration-300 group-focus-within:text-[#2F6F4E] pointer-events-none z-10">
          <QuestionAnswerOutlinedIcon sx={{ fontSize: 20 }} />
        </div>
        <textarea
          id="seller-question"
          rows={3}
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder=" "
          className="peer w-full resize-none overflow-hidden bg-white/70 backdrop-blur-md border border-white/60 rounded-lg pt-6 pb-2 pl-11 pr-4 text-sm font-medium text-[#1A1F24] transition-all duration-300 focus:bg-white/95 focus:border-[#2F6F4E] focus:ring-4 focus:ring-[#2F6F4E]/10 focus:outline-none"
        />
        <label 
          htmlFor="seller-question"
          className="absolute left-11 top-4 text-sm font-medium text-[#6B7280] transition-all duration-300 pointer-events-none peer-focus:top-1.5 peer-focus:text-[11px] peer-focus:text-[#2F6F4E] peer-[:not(:placeholder-shown)]:top-1.5 peer-[:not(:placeholder-shown)]:text-[11px]"
        >
          How can we help? (optional)
        </label>
      </div>
      
      <div className="animate-fade-blur-in opacity-0" style={{ animationDelay: '200ms' }}>
        <button
          type="submit"
          disabled={!name.trim() || !phone.trim()}
          className="group relative w-full flex items-center justify-center gap-2 bg-[#2F6F4E] text-white rounded-lg font-bold text-sm py-3.5 shadow-lg shadow-[#2F6F4E]/20 transition-all duration-300 overflow-hidden hover:-translate-y-0.5 hover:shadow-[#2F6F4E]/30 active:scale-[0.98] disabled:bg-gray-200 disabled:text-gray-400 disabled:shadow-none disabled:transform-none disabled:cursor-not-allowed"
        >
          <div className="absolute top-0 -left-[100%] w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-25deg] transition-all duration-700 ease-in-out group-hover:left-[200%] group-disabled:hidden" />
          <span className="relative z-10">Request Call Back</span>
          <SendOutlinedIcon sx={{ fontSize: 18 }} className="relative z-10 transition-transform group-hover:translate-x-1 group-hover:-translate-y-0.5" />
        </button>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fadeBlurIn { 
          from { opacity: 0; filter: blur(8px); transform: translateY(10px); } 
          to { opacity: 1; filter: blur(0px); transform: translateY(0); } 
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-blur-in { animation: fadeBlurIn 0.4s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; }
        .animate-scale-in { animation: scaleIn 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; }
      `}} />
    </form>
  );
};

export default SellerQueries;