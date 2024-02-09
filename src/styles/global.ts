import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    background-color: ${({ theme }) => theme.colors['gray-900']};
    color: ${({ theme }) => theme.colors['gray-300']};
    -webkit-font-smoothing: antialiased;
  }

    body, input, button, textarea {
        font-family: "Roboto", sans-serif;
        font-weight: 400;
        font-size: 1rem;

        @media (max-width: 768px) {
            font-size: 0.875rem;
        }
    }
    
`
