import { createTheme } from '@mui/material/styles';

export const muiTheme = createTheme({
  palette: {
    primary: {
      main: '#0f5c30',
      light: '#22a050',
      dark: '#1e3326',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#1a7a42',
      contrastText: '#ffffff',
    },
    background: {
      default: '#ffffff',
      paper: '#ffffff',
    },
    text: {
      primary: '#0a1a10',
      secondary: '#5a7a65',
    },
    divider: '#c8e8d6',
    success: { main: '#2dbd60' },
  },
  shape: { borderRadius: 8 },
  typography: {
    fontFamily: "'Outfit', sans-serif",
    h5: { fontWeight: 700, color: 'var(--text-color)' },
    h6: { fontWeight: 700, color: 'var(--text-color)' },
    subtitle1: { fontWeight: 600 },
    subtitle2: { fontWeight: 600 },
    body2: { fontSize: '0.8125rem' },
    caption: { fontSize: '0.75rem' },
  },
  shadows: [
    'none',
    '0 4px 12px rgba(15, 92, 48, 0.05)',
    '0 8px 24px rgba(15, 92, 48, 0.08)',
    ...Array(22).fill('none'),
  ] as any,
  components: {
    MuiCard: {
      defaultProps: { elevation: 0 },
      styleOverrides: {
        root: {
          border: '1px solid var(--glass-border)',
          borderRadius: 12,
          backgroundColor: 'var(--glass-bg)',
          backdropFilter: 'blur(var(--glass-blur))',
          WebkitBackdropFilter: 'blur(var(--glass-blur))',
          boxShadow: 'var(--glass-shadow)',
          overflow: 'hidden',
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: 16,
          '&:last-child': { paddingBottom: 16 },
        },
      },
    },
    MuiButton: {
      defaultProps: { disableElevation: true, disableRipple: false },
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          borderRadius: 8,
          boxShadow: 'none',
          transition: 'all 0.3s ease',
          '&:hover': { boxShadow: 'none' },
        },
        containedPrimary: {
          background: 'var(--gradient-primary)',
          color: 'var(--text-on-accent)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid rgba(255, 255, 255, 0.5)',
          boxShadow: '0 4px 24px rgba(15, 92, 48, 0.25)',
          '&:hover': {
            background: 'var(--gradient-accent)',
            boxShadow: '0 6px 28px rgba(15, 92, 48, 0.35)',
          },
        },
        outlinedPrimary: {
          borderColor: 'var(--accent-primary)',
          color: 'var(--accent-primary)',
          backgroundColor: 'rgba(255, 255, 255, 0.5)',
          backdropFilter: 'blur(8px)',
          '&:hover': {
            backgroundColor: 'var(--primary-alpha-12)',
            borderColor: 'var(--accent-secondary)'
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          fontWeight: 500,
          fontSize: '0.75rem',
          height: 28,
          backgroundColor: 'var(--glass-bg)',
          border: '1px solid var(--glass-border)',
          backdropFilter: 'blur(8px)',
        },
        colorPrimary: {
          backgroundColor: 'var(--primary-alpha-12)',
          color: 'var(--accent-secondary)',
          border: '1px solid var(--primary-alpha-25)',
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          minHeight: 40,
          fontSize: '0.8125rem',
          color: 'var(--text-color-muted)',
          transition: 'color 0.3s ease',
          '&.Mui-selected': { color: 'var(--accent-primary)' },
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        indicator: {
          height: 3,
          borderRadius: '3px 3px 0 0',
          backgroundColor: 'var(--accent-primary)',
          boxShadow: '0 -2px 8px var(--green-glow)',
        },
      },
    },
    MuiTextField: {
      defaultProps: { size: 'small', variant: 'outlined' },
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
            backgroundColor: 'var(--input-background)',
            backdropFilter: 'blur(8px)',
            transition: 'all 0.3s ease',
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: 'var(--accent-primary)',
              boxShadow: '0 0 0 2px var(--primary-alpha-12)',
            },
          },
          '& .MuiInputLabel-root.Mui-focused': {
            color: 'var(--accent-primary)',
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: 'var(--accent-primary)',
          },
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: { borderColor: 'var(--border-color)' },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          backgroundColor: 'var(--border-color-subtle)',
          overflow: 'hidden',
        },
        bar: {
          borderRadius: 4,
          background: 'var(--gradient-primary)',
        },
      },
    },
  },
});