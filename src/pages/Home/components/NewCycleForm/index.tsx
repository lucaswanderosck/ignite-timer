import React from 'react'
import { useFormContext } from 'react-hook-form'
import { CyclesContext } from '../../../../contexts/CyclesContext'
import { Container, MinutsInput, TaskInput } from './styles'

export const NewCycleForm: React.FC = () => {
  const { activeCycle } = React.useContext(CyclesContext)
  const { register } = useFormContext()

  return (
    <Container>
      <label htmlFor="task">Vou trabalhar em</label>
      <TaskInput
        type="text"
        id="task"
        placeholder="Dê um nome para o seu projeto"
        list="task-sugestions"
        {...register('task')}
        disabled={!!activeCycle}
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
        min={1}
        max={60}
        step={5}
        {...register('time', { valueAsNumber: true })}
        disabled={!!activeCycle}
      />

      <span>Minutos.</span>
    </Container>
  )
}
