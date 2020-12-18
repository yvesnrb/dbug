import React from 'react';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from './globalStyle';
import theme from './appTheme';

const App: React.FC = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <h1>Hello from dbug!</h1>
        <p>Hello from Digital Ocean CI solution!</p>
      </ThemeProvider>
    </>
  );
};

export default App;
