import React from 'react';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter as Router } from 'react-router-dom';
import { GlobalStyle } from './globalStyle';
import { AuthProvider } from './context/AuthContext';
import theme from './appTheme';
import Routes from './routes';

const App: React.FC = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <AuthProvider>
          <Router>
            <Routes />
          </Router>
        </AuthProvider>
      </ThemeProvider>
    </>
  );
};

export default App;
