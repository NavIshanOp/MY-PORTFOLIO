import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  /* CSS Reset */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  html, body {
    background: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text};
    font-family: 'Inter', sans-serif;
    scroll-behavior: smooth;
    overflow-x: hidden;
  }
  a {
    text-decoration: none;
    color: inherit;
  }
`;