import { createTheme } from '@mui/material/styles';

export const muiTheme = createTheme({
  palette: {
    primary: {
      main: '#1F7A63',
      light: '#4CAF50',
      dark: '#145a47',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#4CAF50',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#F5F5F5',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#1A1A1A',
      secondary: '#666666',
    },
    divider: '#E0E0E0',
    success: { main: '#1F7A63' },
  },
  shape: { borderRadius: 4 },
  typography: {
    fontFamily: "'Outfit', 'Inter', sans-serif",
    h5: { fontWeight: 700, color: '#1A1A1A' },
    h6: { fontWeight: 700, color: '#1A1A1A' },
    subtitle1: { fontWeight: 600 },
    subtitle2: { fontWeight: 600 },
    body2: { fontSize: '0.8125rem' },
    caption: { fontSize: '0.75rem' },
  },
  shadows: [
    'none',
    '0 1px 3px rgba(0,0,0,0.08)',
    '0 2px 6px rgba(0,0,0,0.10)',
    ...Array(22).fill('none'),
  ] as any,
  components: {
    MuiCard: {
      defaultProps: { elevation: 0 },
      styleOverrides: {
        root: {
          border: '1px solid #E0E0E0',
          borderRadius: 8,
          backgroundColor: '#FFFFFF',
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
          backgroundColor: '#1F7A63',
          '&:hover': { backgroundColor: '#145a47' },
        },
        outlinedPrimary: {
          borderColor: '#1F7A63',
          color: '#1F7A63',
          '&:hover': { backgroundColor: 'rgba(31,122,99,0.06)' },
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
          backgroundColor: '#E8F5E9',
          color: '#1F7A63',
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
          color: '#666666',
          '&.Mui-selected': { color: '#1F7A63' },
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        indicator: {
          height: 2,
          borderRadius: 1,
          backgroundColor: '#1F7A63',
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
              borderColor: '#1F7A63',
            },
          },
          '& .MuiInputLabel-root.Mui-focused': {
            color: '#1F7A63',
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#1F7A63',
          },
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: { borderColor: '#E0E0E0' },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          backgroundColor: '#E0E0E0',
        },
        bar: {
          borderRadius: 4,
          backgroundColor: '#1F7A63',
        },
      },
    },
  },
});
