import React from "react";
import { ThemeProvider } from 'styled-components';
import theme from '../src/appTheme';
import { GlobalStyle } from '../src/globalStyle';

export const decorators = [
  (Story) => (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Story />
    </ThemeProvider>
  ),
];

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
}

