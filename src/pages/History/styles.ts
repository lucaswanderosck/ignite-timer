import styled from 'styled-components'

export const Container = styled.main`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 3.5rem;

  h1 {
    font-size: 1.5rem;
    color: ${({ theme }) => theme.colors['gray-100']};
  }
`

export const HistoryList = styled.div`
  flex: 1;
  overflow: auto;
  margin-top: 2rem;

  table {
    width: 100%;
    border-collapse: collapse;
    min-width: 600px;

    th {
      padding: 1rem;
      background: ${({ theme }) => theme.colors['gray-600']};
      text-align: left;
      font-size: 0.875rem;
      color: ${({ theme }) => theme.colors['gray-100']};
      line-height: 1.6;

      &:first-child {
        border-top-left-radius: 0.5rem;
        padding-left: 1.5rem;
      }

      &:last-child {
        border-top-right-radius: 0.5rem;
        padding-right: 1.5rem;
      }
    }

    td {
      padding: 1rem;
      background: ${({ theme }) => theme.colors['gray-700']};
      border-top: 4px solid ${({ theme }) => theme.colors['gray-800']};
      font-size: 0.875rem;
      color: ${({ theme }) => theme.colors['gray-100']};
      line-height: 1.6;

      &:first-child {
        padding-left: 1.5rem;
        width: 50%;
      }

      &:last-child {
        padding-right: 1.5rem;
      }
    }
  }
`

const STATUS_COLORS = {
  yellow: 'yellow-500',
  green: 'green-500',
  red: 'red-500',
} as const

interface StatusProps {
  status: keyof typeof STATUS_COLORS
}

export const Status = styled.span<StatusProps>`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &::before {
    content: '';
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
    background: ${({ theme, status }) => theme.colors[STATUS_COLORS[status]]};
  }
`
