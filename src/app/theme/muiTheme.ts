import { createTheme } from '@mui/material/styles';

export const muiTheme = createTheme({
  palette: {
    primary: {
      main: '#1A6B4A',
      light: '#D4F5E7',
      dark: '#155A3D',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#F5A623',
      contrastText: '#ffffff',
    },
    background: {
      default: '#F5F7FA',
      paper: '#ffffff',
    },
    text: {
      primary: '#1A1A2E',
      secondary: '#4A5568',
    },
    divider: '#E2E8F0',
    success: { main: '#1A6B4A' },
  },
  shape: { borderRadius: 4 },
  typography: {
    fontFamily: '"Outfit", sans-serif',
    h1: { fontSize: '2rem', fontWeight: 600, color: '#1A1A2E' },
    h2: { fontSize: '1.375rem', fontWeight: 600, color: '#1A1A2E' },
    h3: { fontSize: '1.125rem', fontWeight: 500, color: '#1A1A2E' },
    h4: { fontSize: '0.9375rem', fontWeight: 500, color: '#1A1A2E' },
    h5: { fontWeight: 600, color: '#1A1A2E' },
    h6: { fontWeight: 600, color: '#1A1A2E' },
    subtitle1: { fontWeight: 500 },
    subtitle2: { fontWeight: 500 },
    body1: { fontSize: '0.875rem', fontWeight: 400 },
    body2: { fontSize: '0.75rem', fontWeight: 400 },
    caption: { fontSize: '0.6875rem', fontWeight: 500, color: '#4A5568' },
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
          border: '1px solid rgba(255, 255, 255, 0.5)',
          borderRadius: 8,
          backgroundColor: 'rgba(255, 255, 255, 0.72)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          boxShadow: '0 4px 24px rgba(0, 0, 0, 0.06)',
          overflow: 'hidden',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          background: 'rgba(255, 255, 255, 0.72)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: '1px solid rgba(255, 255, 255, 0.5)',
          boxShadow: '0 4px 24px rgba(0, 0, 0, 0.06)',
          borderRadius: 8,
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 8,
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderRadius: '8px 0 0 8px',
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
          fontWeight: 500,
          borderRadius: 4,
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
          borderRadius: 4,
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
          borderRadius: 4,
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
            borderRadius: 4,
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
          borderRadius: 4,
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
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          borderRadius: 4,
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          borderRadius: 2,
          backgroundColor: 'var(--border-color-subtle)',
          overflow: 'hidden',
        },
        bar: {
          borderRadius: 2,
          background: 'var(--gradient-primary)',
        },
      },
    },
  },
});