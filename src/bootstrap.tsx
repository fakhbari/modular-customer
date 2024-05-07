import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { createTheme, ThemeProvider } from '@mui/material';
import App from './App';

const theme = createTheme({
    typography: {
        fontFamily: [
            'IRANSans',
        ].join(','),
    },});

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <StrictMode>
        <ThemeProvider theme={theme}>
            <App />
        </ThemeProvider>
    </StrictMode>
);