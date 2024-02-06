import { zodResolver } from '@hookform/resolvers/zod'
import { Play } from 'phosphor-react'
import React from 'react'
import { useForm } from 'react-hook-form'
import 'react-toastify/dist/ReactToastify.css'
import * as zod from 'zod'
import {
  Container,
  Countdown,
  FormContainer,
  MinutsInput,
  Separator,
  StartCountdownButton,
  TaskInput,
} from './styles'

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'O nome do projeto é obrigatório'),
  time: zod.number().int().min(5).max(60),
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

export const Home: React.FC = () => {
  const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      time: 0,
    },
  })

  const handleCreateNewCycle = (data: NewCycleFormData) => {
    if (data.time === 0) {
      return
    }

    console.log(data)
    reset()
  }

  const task = watch('task')
  const isDisabled = !task

  return (
    <Container>
      <form action="" onSubmit={handleSubmit(handleCreateNewCycle)}>
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput
            type="text"
            id="task"
            placeholder="Dê um nome para o seu projeto"
            list="task-sugestions"
            {...register('task')}
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
            {...register('time', { valueAsNumber: true })}
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

        <StartCountdownButton type="submit" disabled={isDisabled}>
          <Play size={24} />
          Começar
        </StartCountdownButton>
      </form>
    </Container>
  )
}
