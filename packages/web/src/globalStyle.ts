import { createGlobalStyle } from 'styled-components';

interface Props {
  theme: { [index: string]: string };
}

export const GlobalStyle = createGlobalStyle<Props>`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-size: 10px;
    font-family: Roboto, sans-serif;
  }

  body {
    color: ${props => props.theme.foreground};
    background: ${props => props.theme.background};
  }
`;
