import { createGlobalStyle } from "styled-components";


const GlobalStyle  = createGlobalStyle`${({ theme }) => `
    :root {
        font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
        line-height: 1.5;
        font-weight: 400;

        color: ${theme.colors.text};
        background-color: ${theme.colors.background};

        font-synthesis: none;
        text-rendering: optimizeLegibility;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }
`}`;

export default GlobalStyle ;
