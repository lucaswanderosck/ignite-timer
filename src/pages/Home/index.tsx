import { Play } from 'phosphor-react'
import React from 'react'
import {
  Container,
  Countdown,
  FormContainer,
  MinutsInput,
  Separator,
  StartCountdownButton,
  TaskInput,
} from './styles'

export const Home: React.FC = () => {
  return (
    <Container>
      <form action="">
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput
            type="text"
            id="task"
            placeholder="Dê um nome para o seu projeto"
            list="task-sugestions"
          />

          <datalist id="task-sugestions">
            <option value="Projeto 1" />
            <option value="Projeto 2" />
            <option value="Projeto 3" />
            <option value="Projeto 4" />
            <option value="Projeto 5" />
          </datalist>

          <label htmlFor="time">Durante</label>
          <MinutsInput
            type="number"
            id="time"
            placeholder="00"
            min={5}
            max={60}
            step={5}
          />

          <span>Minutos.</span>
        </FormContainer>

        <Countdown>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </Countdown>

        <StartCountdownButton type="submit">
          <Play size={24} />
          Começar
        </StartCountdownButton>
      </form>
    </Container>
  )
}
