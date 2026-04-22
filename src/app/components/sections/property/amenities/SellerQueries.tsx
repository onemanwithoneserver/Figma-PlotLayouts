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
        <CheckCircleOutlineIcon sx={{ fontSize: 48, color: 'var(--accent-green-dark)' }} />
        <Typography sx={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-color)' }}>
          Request Received!
        </Typography>
        <Typography sx={{ fontSize: '0.8125rem', color: 'var(--text-color-muted)' }}>
          Our team will call you back on <strong>{phone}</strong> shortly.
        </Typography>
        <Button
          variant="outlined"
          size="small"
          sx={{ mt: 1, borderColor: 'var(--accent-green-dark)', color: 'var(--accent-green-dark)', borderRadius: '4px', textTransform: 'none' }}
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
              <PersonOutlinedIcon sx={{ fontSize: 18, color: 'var(--accent-green-dark)' }} />
            </InputAdornment>
          ),
        }}
        sx={{ '& .MuiOutlinedInput-root.Mui-focused fieldset': { borderColor: 'var(--accent-green-dark)' }, '& label.Mui-focused': { color: 'var(--accent-green-dark)' } }}
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
              <PhoneOutlinedIcon sx={{ fontSize: 18, color: 'var(--accent-green-dark)' }} />
            </InputAdornment>
          ),
        }}
        sx={{ '& .MuiOutlinedInput-root.Mui-focused fieldset': { borderColor: 'var(--accent-green-dark)' }, '& label.Mui-focused': { color: 'var(--accent-green-dark)' } }}
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
              <QuestionAnswerOutlinedIcon sx={{ fontSize: 18, color: 'var(--accent-green-dark)' }} />
            </InputAdornment>
          ),
        }}
        sx={{ '& .MuiOutlinedInput-root.Mui-focused fieldset': { borderColor: 'var(--accent-green-dark)' }, '& label.Mui-focused': { color: 'var(--accent-green-dark)' } }}
      />
      <Button
        variant="contained"
        fullWidth
        disableElevation
        endIcon={<SendOutlinedIcon />}
        onClick={handleSubmit}
        disabled={!name.trim() || !phone.trim()}
        sx={{
          bgcolor: 'var(--accent-green-dark)',
          '&:hover': { bgcolor: 'var(--success-color-dark)' },
          '&:disabled': { bgcolor: 'var(--border-color)', color: 'var(--text-gray-light)' },
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
