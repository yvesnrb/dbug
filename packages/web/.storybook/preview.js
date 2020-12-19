import React from "react";
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import theme from '../src/appTheme';
import { GlobalStyle } from '../src/globalStyle';

export const decorators = [
  (Story) => (
    <ThemeProvider theme={theme}>
      <Router>
        <GlobalStyle />
        <Story />
      </Router>
    </ThemeProvider>
  ),
];

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
}

