import React from 'react'
import { Container, HistoryList, Status } from './styles'

export const History: React.FC = () => {
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
            <tr>
              <td>Estudar React</td>
              <td>1h</td>
              <td>10:00</td>
              <td>
                <Status status="red">Interrompido</Status>
              </td>
            </tr>
            <tr>
              <td>Estudar Typescript</td>
              <td>2h</td>
              <td>14:00</td>
              <td>
                <Status status="yellow">Em Andamento</Status>
              </td>
            </tr>
            <tr>
              <td>Estudar Node</td>
              <td>3h</td>
              <td>18:00</td>
              <td>
                <Status status="green">Concluido</Status>
              </td>
            </tr>
            <tr>
              <td>Estudar Java</td>
              <td>30min</td>
              <td>8:00</td>
              <td>
                <Status status="green">Concluido</Status>
              </td>
            </tr>
          </tbody>
        </table>
      </HistoryList>
    </Container>
  )
}
