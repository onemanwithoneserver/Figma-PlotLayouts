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
      backgroundColor: 'var(--color-input-background, var(--color-bg-white))',
      alignItems: 'center',
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
      fontWeight: 200, 
    },
    '& .MuiInputLabel-root': {
      color: 'var(--color-text-muted)', 
      fontWeight: 300, 
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
      <div className="p-6 flex flex-col items-center gap-3 text-center">
        <CheckCircleOutlineIcon sx={{ fontSize: 48, color: 'var(--color-accent)' }} />
        <Typography sx={{ fontWeight: 700, fontSize: '1rem', color: 'var(--color-text-primary)' }}>
          Request Received!
        </Typography>
        <Typography sx={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)' }}>
          Our team will call you back on <strong>{phone}</strong> shortly.
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
            '&:hover': { backgroundColor: 'var(--color-bg-mid)' }
          }}
          onClick={() => { setSubmitted(false); setName(''); setPhone(''); setQuestion(''); }}
        >
          Ask Another Question
        </Button>
      </div>
    );
  }

  return (
    <div className="p-4 flex flex-col gap-3">
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
              <PersonOutlinedIcon sx={{ fontSize: 18, color: 'var(--accent-primary)' }} />
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
              <PhoneOutlinedIcon sx={{ fontSize: 18, color: 'var(--accent-primary)' }} />
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
              <QuestionAnswerOutlinedIcon sx={{ fontSize: 18, color: 'var(--accent-primary)' }} />
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
        sx={{
          background: 'var(--gradient-primary)',
          color: 'var(--color-bg-white)',
          '&:hover': { 
            background: 'var(--gradient-accent)',
            boxShadow: '0 4px 24px var(--color-glow)' 
          },
          '&:disabled': { 
            background: 'var(--color-bg-mid)', 
            color: 'var(--color-text-muted)' 
          },
          borderRadius: '8px',
          textTransform: 'none',
          fontWeight: 600,
          py: 1.25,
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(255, 255, 255, 0.5)',
        }}
      >
        Request Call Back
      </Button>
    </div>
  );
};

export default SellerQueries;