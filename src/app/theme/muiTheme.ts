import { createTheme } from '@mui/material/styles';

export const muiTheme = createTheme({
  palette: {
    primary: {
      main: 'var(--accent-green-dark)',
      light: 'var(--success-color-alt)',
      dark: 'var(--success-color-darker)',
      contrastText: 'var(--background-color)',
    },
    secondary: {
      main: 'var(--success-color-alt)',
      contrastText: 'var(--background-color)',
    },
    background: {
      default: 'var(--bg-muted)',
      paper: 'var(--background-color)',
    },
    text: {
      primary: 'var(--text-color)',
      secondary: 'var(--text-color-muted)',
    },
    divider: 'var(--border-color)',
    success: { main: 'var(--accent-green-dark)' },
  },
  shape: { borderRadius: 4 },
  typography: {
    fontFamily: "'Outfit', 'Inter', sans-serif",
    h5: { fontWeight: 700, color: 'var(--text-color)' },
    h6: { fontWeight: 700, color: 'var(--text-color)' },
    subtitle1: { fontWeight: 600 },
    subtitle2: { fontWeight: 600 },
    body2: { fontSize: '0.8125rem' },
    caption: { fontSize: '0.75rem' },
  },
  shadows: [
    'none',
    '0 1px 3px var(--overlay-dark-8)',
    '0 2px 6px var(--overlay-dark-10)',
    ...Array(22).fill('none'),
  ] as any,
  components: {
    MuiCard: {
      defaultProps: { elevation: 0 },
      styleOverrides: {
        root: {
          border: '1px solid var(--border-color)',
          borderRadius: 8,
          backgroundColor: 'var(--background-color)',
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
          borderRadius: 4,
          boxShadow: 'none',
          '&:hover': { boxShadow: 'none' },
        },
        containedPrimary: {
          backgroundColor: 'var(--accent-green-dark)',
          '&:hover': { backgroundColor: 'var(--success-color-darker)' },
        },
        outlinedPrimary: {
          borderColor: 'var(--accent-green-dark)',
          color: 'var(--accent-green-dark)',
          '&:hover': { backgroundColor: 'var(--primary-alpha-6)' },
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
        },
        colorPrimary: {
          backgroundColor: 'var(--border-color-subtle)',
          color: 'var(--accent-green-dark)',
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
          '&.Mui-selected': { color: 'var(--accent-green-dark)' },
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        indicator: {
          height: 2,
          borderRadius: 1,
          backgroundColor: 'var(--accent-green-dark)',
        },
      },
    },
    MuiTextField: {
      defaultProps: { size: 'small', variant: 'outlined' },
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 4,
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: 'var(--accent-green-dark)',
            },
          },
          '& .MuiInputLabel-root.Mui-focused': {
            color: 'var(--accent-green-dark)',
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: 'var(--accent-green-dark)',
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
          backgroundColor: 'var(--border-color)',
        },
        bar: {
          borderRadius: 4,
          backgroundColor: 'var(--accent-green-dark)',
        },
      },
    },
  },
});
