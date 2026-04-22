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
      backgroundColor: '#EEF4F0',
      alignItems: 'center',
      transition: 'border-color 0.2s, background-color 0.2s, box-shadow 0.2s',
    },
    '& .MuiOutlinedInput-root.MuiInputBase-multiline': {
      alignItems: 'flex-start',
    },
    '& .MuiInputBase-input': {
      color: '#0B1F17',
      paddingTop: '8.5px',
      paddingBottom: '8.5px',
    },
    '& .MuiInputBase-input::placeholder': {
      color: '#64786D',
      opacity: 0.8,
      fontWeight: 400,
    },
    '& .MuiInputLabel-root': {
      color: '#64786D',
      fontWeight: 400,
    },
    '& .MuiOutlinedInput-root.Mui-focused': {
      backgroundColor: '#ffffff',
      boxShadow: '0 0 0 3px rgba(21,101,58,.08)'
    },
    '& .MuiOutlinedInput-root.Mui-focused fieldset': {
      borderColor: '#15653A'
    },
    '& label.Mui-focused': {
      color: '#15653A'
    }
  };

  if (submitted) {
    return (
      <div className="p-6 flex flex-col items-center gap-3 text-center font-outfit animate-scale-in">
        <CheckCircleOutlineIcon sx={{ fontSize: 48, color: '#15653A' }} />
        <Typography sx={{ fontWeight: 700, fontSize: '1rem', color: '#0B1F17', fontFamily: "'Outfit', sans-serif" }}>
          Request Received!
        </Typography>
        <Typography sx={{ fontSize: '0.8125rem', color: '#64786D', fontFamily: "'Outfit', sans-serif" }}>
          Our team will call you back on <strong className="text-[#0B1F17]">{phone}</strong> shortly.
        </Typography>
        <Button
          variant="outlined"
          size="small"
          sx={{
            mt: 1,
            borderColor: '#15653A',
            color: '#15653A',
            borderRadius: '8px',
            textTransform: 'none',
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 600,
            transition: 'all 0.2s',
            '&:hover': { backgroundColor: '#EEF4F0', borderColor: '#15653A' }
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
        variant="outlined"
        size="small"
        fullWidth
        value={name}
        onChange={(e) => setName(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start" sx={{ mt: 0, display: 'flex', alignItems: 'center' }}>
              <PersonOutlinedIcon sx={{ fontSize: 18, color: '#15653A' }} />
            </InputAdornment>
          ),
        }}
        sx={textFieldStyles}
      />
      <TextField
        label="Phone Number"
        variant="outlined"
        size="small"
        fullWidth
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start" sx={{ mt: 0, display: 'flex', alignItems: 'center' }}>
              <PhoneOutlinedIcon sx={{ fontSize: 18, color: '#15653A' }} />
            </InputAdornment>
          ),
        }}
        sx={textFieldStyles}
      />
      <TextField
        label="Your Question (optional)"
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
              <QuestionAnswerOutlinedIcon sx={{ fontSize: 18, color: '#15653A' }} />
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
          background: 'linear-gradient(135deg, #15653A, #2F7D4E)',
          color: '#ffffff',
          '&:hover': {
            background: 'linear-gradient(135deg, #2F7D4E, #49A36B)',
            boxShadow: '0 6px 16px rgba(21,101,58,0.18)'
          },
          '&:disabled': {
            background: '#C8DBCF',
            color: '#64786D',
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