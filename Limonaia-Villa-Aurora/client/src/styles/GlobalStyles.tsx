import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    margin: 0;
    font-family: ${({ theme }) => theme.fonts.body};
    font-weight: 400;
    color: ${({ theme }) => theme.colors.ink};
    background: ${({ theme }) => theme.colors.bg};
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
    transition: background-color 0.4s ${({ theme }) => theme.transition.smooth},
      color 0.4s ${({ theme }) => theme.transition.smooth};
  }

  img {
    max-width: 100%;
    display: block;
  }

  button {
    font-family: inherit;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  :focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.gold};
    outline-offset: 3px;
  }
`
