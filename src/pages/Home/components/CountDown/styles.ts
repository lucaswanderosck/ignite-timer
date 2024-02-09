import { styled } from 'styled-components'

export const Container = styled.div`
  font-family: 'Roboto Mono', monospace;
  font-size: 10rem;
  line-height: 8rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors['gray-100']};
  display: flex;
  gap: 1rem;

  span {
    background-color: ${({ theme }) => theme.colors['gray-700']};
    padding: 2rem 1rem;
    border-radius: 8px;
  }

  @media (max-width: 768px) {
    font-size: 4rem;
    line-height: 4rem;
  }
`

export const Separator = styled.div`
  padding: 2rem 0;
  color: ${({ theme }) => theme.colors['green-500']};
  width: 4rem;
  overflow: hidden;
  display: flex;
  justify-content: center;

  @media (max-width: 768px) {
    width: 0.875rem;
  }
`
