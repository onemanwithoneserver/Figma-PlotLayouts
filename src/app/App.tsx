import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { theme } from '../theme';
import { ThemeProvider } from './context/ThemeContext';
import PropertyDetails from './components/sections/PropertyDetails';

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <ThemeProvider>
        <PropertyDetails />
      </ThemeProvider>
    </MuiThemeProvider>
  );
}

export default App;



