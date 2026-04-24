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
      <div className="p-6 flex flex-col items-center gap-3 text-center rounded-[8px] bg-[rgba(255,255,255,0.65)] backdrop-blur-[20px] border border-[rgba(255,255,255,0.6)] shadow-[0_8px_24px_rgba(0,0,0,0.08)] animate-fade-blur-in">
        <div className="w-16 h-16 rounded-[8px] bg-[rgba(47,111,78,0.1)] border border-[rgba(47,111,78,0.2)] flex items-center justify-center mb-2 animate-scale-in">
          <CheckCircleOutlineIcon sx={{ fontSize: 32, color: '#2F6F4E' }} />
        </div>
        
        <h3 className="font-bold text-[18px] text-[#1A1F24] tracking-tight m-0">
          Request Received!
        </h3>
        
        <p className="text-[14px] text-[#4A5560] mb-2 leading-relaxed m-0">
          Our team will call you back on <strong className="text-[#1A1F24] font-bold">{phone}</strong> shortly.
        </p>
        
        <button
          className="w-full mt-2 bg-[rgba(255,255,255,0.5)] border border-[rgba(255,255,255,0.8)] text-[#1A1F24] rounded-[8px] font-semibold text-[14px] py-2.5 shadow-[0_2px_4px_rgba(0,0,0,0.02)] transition-all duration-[280ms] ease-[cubic-bezier(0.4,0,0.2,1)] hover:bg-[rgba(255,255,255,0.9)] hover:-translate-y-[2px] hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)] active:scale-97"
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
      className="p-4 flex flex-col gap-4 rounded-[8px] bg-[rgba(255,255,255,0.4)] border border-[rgba(255,255,255,0.5)] shadow-inner"
    >
      {/* Name Input */}
      <div className="relative group animate-fade-blur-in opacity-0" style={{ animationDelay: '40ms' }}>
        <div className="absolute left-3 top-[11px] text-[#4A5560] transition-colors duration-[280ms] group-focus-within:text-[#2F6F4E] pointer-events-none z-10">
          <PersonOutlinedIcon sx={{ fontSize: 18 }} />
        </div>
        <input
          type="text"
          id="seller-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder=" "
          className="peer w-full bg-[rgba(255,255,255,0.7)] backdrop-blur-[12px] border border-[rgba(255,255,255,0.6)] shadow-[inset_0_1px_2px_rgba(0,0,0,0.02)] rounded-[8px] pt-5 pb-1.5 pl-[36px] pr-3 text-[14px] font-medium text-[#1A1F24] transition-all duration-[280ms] ease-[cubic-bezier(0.4,0,0.2,1)] hover:bg-[rgba(255,255,255,0.85)] hover:border-[rgba(255,255,255,0.8)] focus:bg-[rgba(255,255,255,0.95)] focus:border-[#2F6F4E] focus:ring-[3px] focus:ring-[rgba(47,111,78,0.35)] focus:outline-none"
        />
        <label 
          htmlFor="seller-name"
          className="absolute left-[36px] top-3 text-[14px] font-medium text-[#6B7280] transition-all duration-[280ms] pointer-events-none peer-focus:top-[4px] peer-focus:text-[10px] peer-focus:text-[#2F6F4E] peer-[:not(:placeholder-shown)]:top-[4px] peer-[:not(:placeholder-shown)]:text-[10px]"
        >
          Your Name
        </label>
      </div>
      
      {/* Phone Input */}
      <div className="relative group animate-fade-blur-in opacity-0" style={{ animationDelay: '80ms' }}>
        <div className="absolute left-3 top-[11px] text-[#4A5560] transition-colors duration-[280ms] group-focus-within:text-[#2F6F4E] pointer-events-none z-10">
          <PhoneOutlinedIcon sx={{ fontSize: 18 }} />
        </div>
        <input
          type="tel"
          id="seller-phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder=" "
          className="peer w-full bg-[rgba(255,255,255,0.7)] backdrop-blur-[12px] border border-[rgba(255,255,255,0.6)] shadow-[inset_0_1px_2px_rgba(0,0,0,0.02)] rounded-[8px] pt-5 pb-1.5 pl-[36px] pr-3 text-[14px] font-medium text-[#1A1F24] transition-all duration-[280ms] ease-[cubic-bezier(0.4,0,0.2,1)] hover:bg-[rgba(255,255,255,0.85)] hover:border-[rgba(255,255,255,0.8)] focus:bg-[rgba(255,255,255,0.95)] focus:border-[#2F6F4E] focus:ring-[3px] focus:ring-[rgba(47,111,78,0.35)] focus:outline-none"
        />
        <label 
          htmlFor="seller-phone"
          className="absolute left-[36px] top-3 text-[14px] font-medium text-[#6B7280] transition-all duration-[280ms] pointer-events-none peer-focus:top-[4px] peer-focus:text-[10px] peer-focus:text-[#2F6F4E] peer-[:not(:placeholder-shown)]:top-[4px] peer-[:not(:placeholder-shown)]:text-[10px]"
        >
          Phone Number
        </label>
      </div>
      
      {/* Question Textarea */}
      <div className="relative group animate-fade-blur-in opacity-0" style={{ animationDelay: '120ms' }}>
        <div className="absolute left-3 top-[11px] text-[#4A5560] transition-colors duration-[280ms] group-focus-within:text-[#2F6F4E] pointer-events-none z-10">
          <QuestionAnswerOutlinedIcon sx={{ fontSize: 18 }} />
        </div>
        <textarea
          id="seller-question"
          rows={3}
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder=" "
          className="peer w-full resize-none bg-[rgba(255,255,255,0.7)] backdrop-blur-[12px] border border-[rgba(255,255,255,0.6)] shadow-[inset_0_1px_2px_rgba(0,0,0,0.02)] rounded-[8px] pt-5 pb-2 pl-[36px] pr-3 text-[14px] font-medium text-[#1A1F24] transition-all duration-[280ms] ease-[cubic-bezier(0.4,0,0.2,1)] hover:bg-[rgba(255,255,255,0.85)] hover:border-[rgba(255,255,255,0.8)] focus:bg-[rgba(255,255,255,0.95)] focus:border-[#2F6F4E] focus:ring-[3px] focus:ring-[rgba(47,111,78,0.35)] focus:outline-none"
        />
        <label 
          htmlFor="seller-question"
          className="absolute left-[36px] top-3 text-[14px] font-medium text-[#6B7280] transition-all duration-[280ms] pointer-events-none peer-focus:top-[4px] peer-focus:text-[10px] peer-focus:text-[#2F6F4E] peer-[:not(:placeholder-shown)]:top-[4px] peer-[:not(:placeholder-shown)]:text-[10px]"
        >
          Your Question (optional)
        </label>
      </div>
      
      {/* Submit Button */}
      <div className="animate-fade-blur-in opacity-0" style={{ animationDelay: '160ms' }}>
        <button
          type="submit"
          disabled={!name.trim() || !phone.trim()}
          className="group relative w-full flex items-center justify-center gap-2 bg-[#2F6F4E] text-[#FFFFFF] rounded-[8px] font-semibold text-[14px] py-3 border border-[rgba(255,255,255,0.2)] shadow-[0_4px_12px_rgba(47,111,78,0.2)] transition-all duration-[280ms] ease-[cubic-bezier(0.4,0,0.2,1)] overflow-hidden hover:bg-[#2F6F4E] hover:-translate-y-[2px] hover:shadow-[0_8px_24px_rgba(47,111,78,0.3)] active:scale-[0.97] disabled:bg-[rgba(0,0,0,0.06)] disabled:text-[#6B7280] disabled:border-[rgba(0,0,0,0.05)] disabled:shadow-none disabled:transform-none disabled:cursor-not-allowed"
        >
          {/* Button Light Sweep (Hidden when disabled) */}
          <div className="absolute top-0 -left-[100%] w-[50%] h-full bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.2)] to-transparent skew-x-[-20deg] transition-all duration-[600ms] ease-in-out group-hover:left-[200%] pointer-events-none group-disabled:hidden" />
          
          <span className="relative z-10">Request Call Back</span>
          <SendOutlinedIcon sx={{ fontSize: 18 }} className="relative z-10" />
        </button>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fadeBlurIn { 
          from { opacity: 0; filter: blur(6px); transform: translateY(12px); } 
          to { opacity: 1; filter: blur(0px); transform: translateY(0); } 
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-blur-in { animation: fadeBlurIn 0.28s cubic-bezier(0.4, 0, 0.2, 1) forwards; }
        .animate-scale-in { animation: scaleIn 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards; }
      `}} />
    </form>
  );
};

export default SellerQueries;