import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import QuestionAnswerOutlinedIcon from '@mui/icons-material/QuestionAnswerOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import InputAdornment from '@mui/material/InputAdornment';

const SellerQueries: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [question, setQuestion] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (name.trim() && phone.trim()) {
      setSubmitted(true);
    }
  };

  const textFieldStyles = {
    '& .MuiOutlinedInput-root': {
      borderRadius: '8px',
      backgroundColor: 'var(--color-bg-soft)',
      alignItems: 'center',
      transition: 'border-color 0.2s, background-color 0.2s, box-shadow 0.2s',
    },
    '& .MuiOutlinedInput-root.MuiInputBase-multiline': {
      alignItems: 'flex-start',
    },
    '& .MuiInputBase-input': {
      color: 'var(--color-text-primary)',
      paddingTop: '8.5px',
      paddingBottom: '8.5px',
    },
    '& .MuiInputBase-input::placeholder': {
      color: 'var(--color-text-muted)',
      opacity: 0.8,
      fontWeight: 400,
    },
    '& .MuiInputLabel-root': {
      color: 'var(--color-text-muted)',
      fontWeight: 400,
    },
    '& .MuiOutlinedInput-root.Mui-focused': {
      backgroundColor: 'var(--color-bg-white)',
      boxShadow: '0 0 0 3px rgba(34,160,80,.08)'
    },
    '& .MuiOutlinedInput-root.Mui-focused fieldset': {
      borderColor: 'var(--color-accent)'
    },
    '& label.Mui-focused': {
      color: 'var(--color-accent)'
    }
  };

  if (submitted) {
    return (
      <div className="p-6 flex flex-col items-center gap-3 text-center font-outfit animate-scale-in">
        <CheckCircleOutlineIcon sx={{ fontSize: 48, color: 'var(--color-accent)' }} />
        <Typography sx={{ fontWeight: 700, fontSize: '1rem', color: 'var(--color-text-primary)', fontFamily: "'Outfit', sans-serif" }}>
          Request Received!
        </Typography>
        <Typography sx={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', fontFamily: "'Outfit', sans-serif" }}>
          Our team will call you back on <strong className="text-[var(--color-text-primary)]">{phone}</strong> shortly.
        </Typography>
        <Button
          variant="outlined"
          size="small"
          sx={{
            mt: 1,
            borderColor: 'var(--color-accent)',
            color: 'var(--color-accent)',
            borderRadius: '8px',
            textTransform: 'none',
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 600,
            transition: 'all 0.2s',
            '&:hover': { backgroundColor: 'var(--color-bg-soft)', borderColor: 'var(--color-accent)' }
          }}
          onClick={() => { setSubmitted(false); setName(''); setPhone(''); setQuestion(''); }}
        >
          Ask Another Question
        </Button>
      </div>
    );
  }

  return (
    <div className="p-4 flex flex-col gap-3 font-outfit">
      <TextField
        label="Your Name"
        placeholder="Enter your name"
        variant="outlined"
        size="small"
        fullWidth
        value={name}
        onChange={(e) => setName(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start" sx={{ mt: 0, display: 'flex', alignItems: 'center' }}>
              <PersonOutlinedIcon sx={{ fontSize: 18, color: 'var(--color-accent)' }} />
            </InputAdornment>
          ),
        }}
        sx={textFieldStyles}
      />
      <TextField
        label="Phone Number"
        placeholder="Enter your phone number"
        variant="outlined"
        size="small"
        fullWidth
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start" sx={{ mt: 0, display: 'flex', alignItems: 'center' }}>
              <PhoneOutlinedIcon sx={{ fontSize: 18, color: 'var(--color-accent)' }} />
            </InputAdornment>
          ),
        }}
        sx={textFieldStyles}
      />
      <TextField
        label="Your Question (optional)"
        placeholder="How can we help you?"
        variant="outlined"
        size="small"
        fullWidth
        multiline
        rows={3}
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start" sx={{ alignSelf: 'flex-start', mt: 1 }}>
              <QuestionAnswerOutlinedIcon sx={{ fontSize: 18, color: 'var(--color-accent)' }} />
            </InputAdornment>
          ),
        }}
        sx={textFieldStyles}
      />
      <Button
        variant="contained"
        fullWidth
        disableElevation
        endIcon={<SendOutlinedIcon />}
        onClick={handleSubmit}
        disabled={!name.trim() || !phone.trim()}
        className="glass-cta hover-lift"
        sx={{
          background: 'linear-gradient(135deg, var(--color-primary), var(--color-accent))',
          color: 'var(--color-bg-white)',
          '&:hover': {
            background: 'linear-gradient(135deg, var(--color-secondary), var(--color-highlight))',
            boxShadow: 'var(--glass-shadow-hover)'
          },
          '&:disabled': {
            background: 'var(--color-bg-mid)',
            color: 'var(--color-text-muted)',
            borderColor: 'transparent',
            boxShadow: 'none'
          },
          borderRadius: '8px',
          textTransform: 'none',
          fontFamily: "'Outfit', sans-serif",
          fontWeight: 600,
          py: 1.25,
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(255, 255, 255, 0.4)',
          transition: 'all 0.2s',
        }}
      >
        Request Call Back
      </Button>
    </div>
  );
};

export default SellerQueries;