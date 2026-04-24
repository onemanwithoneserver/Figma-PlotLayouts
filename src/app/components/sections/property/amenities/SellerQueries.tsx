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
      <div className="p-6 flex flex-col items-center gap-4 text-center rounded-[8px] bg-[#ECECE8] shadow-[5px_5px_10px_#CBCBC7,-5px_-5px_10px_#FFFFFF] animate-fade-blur-in">
        <div className="w-14 h-14 rounded-[8px] bg-[#ECECE8] shadow-[3px_3px_6px_#CBCBC7,-3px_-3px_6px_#FFFFFF] flex items-center justify-center mb-2">
          <CheckCircleOutlineIcon sx={{ fontSize: 32, color: '#2F6F4E' }} />
        </div>
        
        <div className="space-y-1">
          <h3 className="font-bold text-[18px] text-[#1A2B22] tracking-tight m-0">
            Request Received
          </h3>
          <p className="text-[13px] text-[#3D5048] leading-relaxed m-0">
            We'll call you back on <span className="text-[#1A2B22] font-semibold">{phone}</span> shortly.
          </p>
        </div>
        
        <button
          className="w-full mt-4 bg-[#ECECE8] shadow-[3px_3px_6px_#CBCBC7,-3px_-3px_6px_#FFFFFF] active:shadow-[inset_2px_2px_4px_#CBCBC7,inset_-2px_-2px_4px_#FFFFFF] text-[#1A2B22] rounded-[8px] font-semibold text-[13px] py-3 transition-shadow duration-200"
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
      className="p-4 flex flex-col gap-4 rounded-[8px] bg-[#ECECE8]"
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
          className="peer w-full bg-[#ECECE8] shadow-[inset_3px_3px_6px_#CBCBC7,inset_-3px_-3px_6px_#FFFFFF] rounded-[8px] pt-6 pb-2 pl-11 pr-4 text-[13px] font-medium text-[#1A2B22] transition-shadow duration-200 focus:shadow-[inset_4px_4px_8px_#CBCBC7,inset_-4px_-4px_8px_#FFFFFF] focus:outline-none"
        />
        <label 
          htmlFor="seller-name"
          className="absolute left-11 top-4 text-[13px] font-medium text-[#5C6B63] transition-all duration-200 pointer-events-none peer-focus:top-1.5 peer-focus:text-[11px] peer-focus:text-[#2F6F4E] peer-[:not(:placeholder-shown)]:top-1.5 peer-[:not(:placeholder-shown)]:text-[11px]"
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
          className="peer w-full bg-[#ECECE8] shadow-[inset_3px_3px_6px_#CBCBC7,inset_-3px_-3px_6px_#FFFFFF] rounded-[8px] pt-6 pb-2 pl-11 pr-4 text-[13px] font-medium text-[#1A2B22] transition-shadow duration-200 focus:shadow-[inset_4px_4px_8px_#CBCBC7,inset_-4px_-4px_8px_#FFFFFF] focus:outline-none"
        />
        <label 
          htmlFor="seller-phone"
          className="absolute left-11 top-4 text-[13px] font-medium text-[#5C6B63] transition-all duration-200 pointer-events-none peer-focus:top-1.5 peer-focus:text-[11px] peer-focus:text-[#2F6F4E] peer-[:not(:placeholder-shown)]:top-1.5 peer-[:not(:placeholder-shown)]:text-[11px]"
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
          className="peer w-full resize-none overflow-hidden bg-[#ECECE8] shadow-[inset_3px_3px_6px_#CBCBC7,inset_-3px_-3px_6px_#FFFFFF] rounded-[8px] pt-6 pb-2 pl-11 pr-4 text-[13px] font-medium text-[#1A2B22] transition-shadow duration-200 focus:shadow-[inset_4px_4px_8px_#CBCBC7,inset_-4px_-4px_8px_#FFFFFF] focus:outline-none"
        />
        <label 
          htmlFor="seller-question"
          className="absolute left-11 top-4 text-[13px] font-medium text-[#5C6B63] transition-all duration-200 pointer-events-none peer-focus:top-1.5 peer-focus:text-[11px] peer-focus:text-[#2F6F4E] peer-[:not(:placeholder-shown)]:top-1.5 peer-[:not(:placeholder-shown)]:text-[11px]"
        >
          How can we help? (optional)
        </label>
      </div>
      
      <div className="animate-fade-blur-in opacity-0" style={{ animationDelay: '200ms' }}>
        <button
          type="submit"
          disabled={!name.trim() || !phone.trim()}
          className="group relative w-full flex items-center justify-center gap-2 neu-btn-green text-white rounded-[8px] font-bold text-[13px] py-3.5 overflow-hidden disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none"
        >
          <div className="absolute top-0 -left-[100%] w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-25deg] transition-all duration-700 ease-in-out group-hover:left-[200%] group-disabled:hidden" />
          <span className="relative z-10">Request Call Back</span>
          <SendOutlinedIcon sx={{ fontSize: 18 }} className="relative z-10 transition-transform group-hover:translate-x-1 group-hover:-translate-y-0.5" />
        </button>
      </div>


    </form>
  );
};

export default SellerQueries;