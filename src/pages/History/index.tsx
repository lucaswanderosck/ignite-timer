import { formatDistanceToNow } from 'date-fns/formatDistanceToNow'
import { ptBR } from 'date-fns/locale/pt-BR'
import React from 'react'
import { PiBroom } from 'react-icons/pi'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { CyclesContext } from '../../contexts/CyclesContext'
import { Container, HistoryList, Status } from './styles'

export const History: React.FC = () => {
  const { cycles } = React.useContext(CyclesContext)

  const handleClearHistory = () => {
    if (cycles.length === 0) {
      toast.warn('Não há histórico para limpar')
    } else {
      localStorage.removeItem('@ignite-timer:cycles-state-1.0.0')
      window.location.reload()
    }
  }

  return (
    <Container>
      <h1>
        Meus Histórico
        <PiBroom
          onClick={handleClearHistory}
          size={24}
          title="Limpar histórico"
        />
      </h1>

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
                  {formatDistanceToNow(new Date(cycle.startDate), {
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
      <ToastContainer autoClose={2000} theme="dark" />
    </Container>
  )
}
