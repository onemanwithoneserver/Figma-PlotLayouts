import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: '#F5F7FA', // Page bg
      paper: 'rgba(255, 255, 255, 0.72)', // Glass surface
    },
    text: {
      primary: '#1A1A2E', // Text primary
      secondary: '#4A5568', // Text secondary (Passes 7.3:1)
      disabled: '#94A3B8', 
    },
    primary: {
      main: '#1A6B4A', // Primary brand green
      dark: '#145A3B',
      light: '#D4F5E7', // Primary tint
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#F5A623', // Accent/CTA
      dark: '#E09316',
      contrastText: '#1A1A2E',
    },
    warning: {
      main: '#C05621',
    },
    error: {
      main: '#C53030',
    },
    divider: '#E2E8F0', // Border/divider
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
      lineHeight: 1.6,
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
          background: 'rgba(255, 255, 255, 0.72)',
          backdropFilter: 'blur(12px)',
          border: '1px solid #E2E8F0', // Using explicit divider color
          boxShadow: '0 4px 24px rgba(26, 107, 74, 0.06)', // Subtle brand-tinted shadow
          borderRadius: '8px',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.04)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '6px',
          minHeight: '44px',
          padding: '8px 20px',
          transition: 'all 0.2s ease-in-out',
          '&:active': {
            transform: 'scale(0.98)',
          },
        },
        containedPrimary: {
          boxShadow: '0 4px 12px rgba(26, 107, 74, 0.2)',
          '&:hover': {
            boxShadow: '0 6px 16px rgba(26, 107, 74, 0.3)',
          },
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          minHeight: '44px',
          color: '#4A5568', // Using Secondary Text for unselected
          fontSize: '14px',
          '&.Mui-selected': {
            color: '#1A6B4A', // Using Primary Green for selected
            fontWeight: 700,
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            backgroundColor: 'rgba(255, 255, 255, 0.4)',
            '& fieldset': {
              borderColor: '#E2E8F0',
            },
            '&:hover fieldset': {
              borderColor: '#CBD5E1',
            },
            '&.Mui-focused fieldset': {
              borderWidth: '1.5px',
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
          fontWeight: 600,
          backgroundColor: '#F1F5F9',
        },
        colorPrimary: {
          backgroundColor: '#D4F5E7',
          color: '#1A6B4A',
        },
      },
    },
  },
});