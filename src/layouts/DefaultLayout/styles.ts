import styled from 'styled-components'

export const Container = styled.div`
  max-width: 74rem;
  height: calc(100vh - 10rem);
  margin: 5rem auto;
  padding: 2.5rem;
  background: ${({ theme }) => theme.colors['gray-800']};
  border-radius: 8px;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    height: 100vh;
    margin: 0;
    border-radius: 0;
  }
`
