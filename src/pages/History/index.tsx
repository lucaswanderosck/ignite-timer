import { formatDistanceToNow } from 'date-fns/formatDistanceToNow'
import { ptBR } from 'date-fns/locale/pt-BR'
import React from 'react'
import { CyclesContext } from '../../contexts/CyclesContext'
import { Container, HistoryList, Status } from './styles'

export const History: React.FC = () => {
  const { cycles } = React.useContext(CyclesContext)

  return (
    <Container>
      <h1>Meus Histórico</h1>
      <HistoryList>
        <table>
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Duração</th>
              <th>Início</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {cycles.map((cycle) => (
              <tr key={cycle.id}>
                <td>{cycle.task}</td>
                <td>{cycle.time}min</td>
                <td>
                  {formatDistanceToNow(cycle.startDate, {
                    addSuffix: true,
                    locale: ptBR,
                  })}
                </td>
                <td>
                  {cycle.interruptedDate ? (
                    <Status status="red">Interrompido</Status>
                  ) : cycle.finishedDate ? (
                    <Status status="green">Concluido</Status>
                  ) : (
                    <Status status="yellow">Em Andamento</Status>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </HistoryList>
    </Container>
  )
}
