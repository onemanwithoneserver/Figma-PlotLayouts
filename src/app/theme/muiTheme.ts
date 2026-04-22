import { createTheme } from '@mui/material/styles';

/**
 * MUI Palette requires RAW color values (#hex, rgb, etc.) 
 * because it uses JavaScript to calculate contrast, hover states, and variants.
 * CSS variables (var(--...)) will cause 'decomposeColor' errors.
 */
const COLORS = {
  emeraldDark: '#1F7A63',    // Matches --accent-green-dark
  emeraldMain: '#4CAF50',    // Matches --success-color-alt
  emeraldDarker: '#145A47',  // Matches --success-color-darker
  background: '#FFFFFF',     // Matches --background-color
  bgMuted: '#F5F5F5',        // Matches --bg-muted
  textPrimary: '#1A1A1A',    // Matches --text-color
  textMuted: '#666666',      // Matches --text-color-muted
  borderColor: '#E0E0E0',    // Matches --border-color
};

export const muiTheme = createTheme({
  palette: {
    primary: {
      main: COLORS.emeraldDark,
      light: COLORS.emeraldMain,
      dark: COLORS.emeraldDarker,
      contrastText: COLORS.background,
    },
    secondary: {
      main: COLORS.emeraldMain,
      contrastText: COLORS.background,
    },
    background: {
      default: COLORS.bgMuted,
      paper: COLORS.background,
    },
    text: {
      primary: COLORS.textPrimary,
      secondary: COLORS.textMuted,
    },
    divider: COLORS.borderColor,
    success: { main: COLORS.emeraldDark },
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
    '0 1px 3px rgba(0,0,0,0.08)',
    '0 2px 6px rgba(0,0,0,0.10)',
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
