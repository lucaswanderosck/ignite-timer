import { zodResolver } from '@hookform/resolvers/zod'
import { differenceInSeconds } from 'date-fns'
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

interface Cycle {
  id: string
  task: string
  time: number
  startDate: Date
}

export const Home: React.FC = () => {
  const [cycles, setCycles] = React.useState<Cycle[]>([])
  const [currentCycleId, setCurrentCycleId] = React.useState<string | null>(
    null,
  )
  const [secondsPassed, setSecondsPassed] = React.useState(0)

  const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      time: 0,
    },
  })

  const handleCreateNewCycle = (data: NewCycleFormData) => {
    const newCycle: Cycle = {
      id: String(new Date().getTime()),
      task: data.task,
      time: data.time,
      startDate: new Date(),
    }
    setCycles((state) => [...state, newCycle])
    setCurrentCycleId(newCycle.id)
    setSecondsPassed(0)

    reset()
  }

  const activeCycle = cycles.find((cycle) => cycle.id === currentCycleId)

  React.useEffect(() => {
    let interval: number

    if (activeCycle) {
      interval = setInterval(() => {
        setSecondsPassed(differenceInSeconds(new Date(), activeCycle.startDate))
      }, 1000)
    }

    return () => {
      clearInterval(interval)
    }
  }, [activeCycle])

  const totalSeconds = activeCycle ? activeCycle.time * 60 : 0
  const currentSeconds = activeCycle ? totalSeconds - secondsPassed : 0

  const minutesAmount = Math.floor(currentSeconds / 60)
  const secondsAmount = currentSeconds % 60

  const minutes = String(minutesAmount).padStart(2, '0')
  const seconds = String(secondsAmount).padStart(2, '0')

  React.useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}:${seconds} | Pomodoro`
    }
  }, [activeCycle, minutes, seconds])

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
          <span>{minutes[0]}</span>
          <span>{minutes[1]}</span>
          <Separator>:</Separator>
          <span>{seconds[0]}</span>
          <span>{seconds[1]}</span>
        </Countdown>

        <StartCountdownButton type="submit" disabled={isDisabled}>
          <Play size={24} />
          Começar
        </StartCountdownButton>
      </form>
    </Container>
  )
}
