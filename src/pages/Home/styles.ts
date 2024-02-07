import styled from 'styled-components'

export const Container = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  user-select: none;

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3.5rem;
  }
`

interface ButtonColorProps {
  color: 'red' | 'green'
}

export const StartCountdownButton = styled.button<ButtonColorProps>`
  width: 100%;
  padding: 1rem;
  border: 0;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors['gray-100']};
  background-color: ${({ theme, color }) =>
    theme.colors[color === 'red' ? 'red-500' : 'green-500']};

  cursor: pointer;
  transition: background-color 0.2s;

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  &:not(:disabled):hover {
    background-color: ${({ theme, color }) =>
      theme.colors[color === 'red' ? 'red-700' : 'green-700']};
  }
`
