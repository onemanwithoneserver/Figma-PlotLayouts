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

  if (submitted) {
    return (
      <div className="p-6 flex flex-col items-center gap-3 text-center">
        <CheckCircleOutlineIcon sx={{ fontSize: 48, color: '#1F7A63' }} />
        <Typography sx={{ fontWeight: 700, fontSize: '1rem', color: '#1A1A1A' }}>
          Request Received!
        </Typography>
        <Typography sx={{ fontSize: '0.8125rem', color: '#666666' }}>
          Our team will call you back on <strong>{phone}</strong> shortly.
        </Typography>
        <Button
          variant="outlined"
          size="small"
          sx={{ mt: 1, borderColor: '#1F7A63', color: '#1F7A63', borderRadius: '4px', textTransform: 'none' }}
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
        variant="outlined"
        size="small"
        fullWidth
        value={name}
        onChange={(e) => setName(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <PersonOutlinedIcon sx={{ fontSize: 18, color: '#1F7A63' }} />
            </InputAdornment>
          ),
        }}
        sx={{ '& .MuiOutlinedInput-root.Mui-focused fieldset': { borderColor: '#1F7A63' }, '& label.Mui-focused': { color: '#1F7A63' } }}
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
            <InputAdornment position="start">
              <PhoneOutlinedIcon sx={{ fontSize: 18, color: '#1F7A63' }} />
            </InputAdornment>
          ),
        }}
        sx={{ '& .MuiOutlinedInput-root.Mui-focused fieldset': { borderColor: '#1F7A63' }, '& label.Mui-focused': { color: '#1F7A63' } }}
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
            <InputAdornment position="start" sx={{ alignSelf: 'flex-start', mt: 1.5 }}>
              <QuestionAnswerOutlinedIcon sx={{ fontSize: 18, color: '#1F7A63' }} />
            </InputAdornment>
          ),
        }}
        sx={{ '& .MuiOutlinedInput-root.Mui-focused fieldset': { borderColor: '#1F7A63' }, '& label.Mui-focused': { color: '#1F7A63' } }}
      />
      <Button
        variant="contained"
        fullWidth
        disableElevation
        endIcon={<SendOutlinedIcon />}
        onClick={handleSubmit}
        disabled={!name.trim() || !phone.trim()}
        sx={{
          bgcolor: '#1F7A63',
          '&:hover': { bgcolor: '#195f4e' },
          '&:disabled': { bgcolor: '#E0E0E0', color: '#9E9E9E' },
          borderRadius: '4px',
          textTransform: 'none',
          fontWeight: 600,
          py: 1.25,
        }}
      >
        Request Call Back
      </Button>
    </div>
  );
};

export default SellerQueries;
