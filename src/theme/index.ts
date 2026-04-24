import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: '#F5F7FA',
      paper: 'rgba(255,255,255,0.72)',
    },
    text: {
      primary: '#1A1A2E',
      secondary: '#4A5568',
      disabled: '#718096',
    },
    primary: {
      main: '#1A6B4A',
      dark: '#145A3B',
      light: '#E8F8F1',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#F5A623',
      dark: '#E09316',
      contrastText: '#1A1A2E',
    },
    warning: {
      main: '#C05621',
    },
    error: {
      main: '#C53030',
    },
    divider: '#E2E8F0',
  },
  shape: {
    borderRadius: 8,
  },
  typography: {
    fontFamily: 'Outfit, sans-serif',
    h6: {
      fontWeight: 700,
      color: '#1A1A2E',
    },
    body1: {
      fontSize: '0.95rem',
      color: '#4A5568',
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          background: 'rgba(255,255,255,0.72)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255,255,255,0.5)',
          boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
          borderRadius: '8px',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '4px',
          minHeight: '44px',
          fontWeight: 600,
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
        containedPrimary: {
          backgroundColor: '#1A6B4A',
          '&:hover': {
            backgroundColor: '#145A3B',
          },
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          minHeight: '44px',
          color: '#718096',
          '&.Mui-selected': {
            color: '#1A6B4A',
            fontWeight: 700,
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '4px',
            '& fieldset': {
              borderColor: '#E2E8F0',
            },
            '&:hover fieldset': {
              borderColor: '#C9D4E2',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#1A6B4A',
            },
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: '6px',
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          borderRadius: '4px',
          backgroundColor: '#E8F8F1',
        },
        bar: {
          borderRadius: '4px',
          backgroundColor: '#1A6B4A',
        },
      },
    },
  },
});
