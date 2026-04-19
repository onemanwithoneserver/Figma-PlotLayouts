import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { muiTheme } from './theme/muiTheme';
import { ThemeProvider } from './context/ThemeContext';
import PropertyDetails from './components/sections/PropertyDetails';

function App() {
  return (
    <MuiThemeProvider theme={muiTheme}>
      <CssBaseline />
      <ThemeProvider>
        <PropertyDetails />
      </ThemeProvider>
    </MuiThemeProvider>
  );
}

export default App;



