export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: {
          app: '#F5F7FA',
          section: '#FDFDFD',
        },
        text: {
          primary: '#1A1A2E',
          secondary: '#4A5568',
          muted: '#718096',
        },
        primary: {
          DEFAULT: '#1A6B4A',
          hover: '#145A3B',
          soft: '#E8F8F1',
          tint: '#D4F5E7',
        },
        secondary: {
          DEFAULT: '#F5A623',
          dark: '#E09316',
        },
        status: {
          success: '#1A6B4A',
          warning: '#C05621',
          error: '#C53030',
        },
        border: {
          soft: '#E2E8F0',
        },
      },
      borderRadius: {
        sm: '4px',
        md: '6px',
        lg: '8px',
      },
      boxShadow: {
        glass: '0 4px 24px rgba(0,0,0,0.06)',
        elevated: '0 8px 40px rgba(0,0,0,0.10)',
        float: '0 16px 56px rgba(0,0,0,0.14)',
      },
      backdropBlur: {
        glass: '12px',
        elevated: '20px',
        float: '24px',
      },
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],
      },
      spacing: {
        11: '44px',
      },
    },
  },
  plugins: [],
};
