import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import theme from '../src/appTheme';
import { GlobalStyle } from '../src/globalStyle';

export const decorators = [
  Story => (
    <ThemeProvider theme={theme}>
      <Router>
        <GlobalStyle />
        <Story />
      </Router>
    </ThemeProvider>
  ),
];

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  viewport: {
    viewports: {
      small: {
        name: 'Small',
        styles: {
          width: '576px',
          height: '800px',
        },
      },
      medium: {
        name: 'Medium',
        styles: {
          width: '768px',
          height: '900px',
        },
      },
      large: {
        name: 'Large',
        styles: {
          width: '992px',
          height: '720px',
        },
      },
      xLarge: {
        name: 'Extra Large',
        styles: {
          width: '1200px',
          height: '900px',
        },
      },
      xxLarge: {
        name: 'Extra Extra Large',
        styles: {
          width: '1400px',
          height: '1000px',
        },
      },
    },
  },
};
