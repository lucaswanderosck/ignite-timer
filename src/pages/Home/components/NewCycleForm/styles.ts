import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  color: ${({ theme }) => theme.colors['gray-100']};
  font-size: 1.125rem;
  font-weight: bold;
  flex-wrap: wrap;
`

const BaseInput = styled.input`
  height: 2.5rem;
  padding: 0 0.5rem;
  border: 0;
  outline: 0;
  border-bottom: 2px solid ${({ theme }) => theme.colors['gray-500']};
  //background-color: ${({ theme }) => theme.colors['gray-700']};
  background: transparent;
  color: ${({ theme }) => theme.colors['gray-100']};
  font-size: 1.125rem;
  font-weight: bold;
  transition: background-color 0.2s;

  &::placeholder {
    color: ${({ theme }) => theme.colors['gray-500']};
  }

  &:focus {
    box-shadow: none;
    border-color: ${({ theme }) => theme.colors['green-500']};
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`
export const TaskInput = styled(BaseInput)`
  flex: 1;

  &::-webkit-calendar-picker-indicator {
    display: none !important;
  }
`
export const MinutsInput = styled(BaseInput)`
  width: 4rem;
  text-align: center;

  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`
