import { zodResolver } from '@hookform/resolvers/zod'
import { HandPalm, Play } from 'phosphor-react'
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import 'react-toastify/dist/ReactToastify.css'
import * as zod from 'zod'
import { CountDown } from './components/CountDown'
import { NewCycleForm } from './components/NewCycleForm'
import { Container, StartCountdownButton } from './styles'

interface Cycle {
  id: string
  task: string
  time: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

interface NewCycleFormType {
  activeCycle: Cycle | undefined
  currentCycleId: string | null
  secondsPassed: number
  setSecondsPassedForActiveCycle: (seconds: number) => void
  markCurrentCycleAsFinished: () => void
}

export const CyclesContext = React.createContext({} as NewCycleFormType)

export const Home: React.FC = () => {
  const [cycles, setCycles] = React.useState<Cycle[]>([])
  const [secondsPassed, setSecondsPassed] = React.useState(0)
  const [currentCycleId, setCurrentCycleId] = React.useState<string | null>(
    null,
  )

  const newCycleFormValidationSchema = zod.object({
    task: zod.string().min(1, 'O nome do projeto é obrigatório'),
    time: zod.number().int().min(5).max(60),
  })

  type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      time: 0,
    },
  })

  const activeCycle = cycles.find((cycle) => cycle.id === currentCycleId)
  const { handleSubmit, reset, watch } = newCycleForm

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

  const handleInterruptCycle = () => {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === currentCycleId) {
          return {
            ...cycle,
            interruptedDate: new Date(),
          }
        } else {
          return cycle
        }
      }),
    )

    setCurrentCycleId(null)
  }

  const markCurrentCycleAsFinished = () => {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === currentCycleId) {
          return {
            ...cycle,
            finishedDate: new Date(),
          }
        } else {
          return cycle
        }
      }),
    )
  }

  const setSecondsPassedForActiveCycle = (seconds: number) => {
    setSecondsPassed(seconds)
  }

  const task = watch('task')
  const isDisabled = !task

  return (
    <Container>
      <form action="" onSubmit={handleSubmit(handleCreateNewCycle)}>
        <CyclesContext.Provider
          value={{
            activeCycle,
            currentCycleId,
            markCurrentCycleAsFinished,
            secondsPassed,
            setSecondsPassedForActiveCycle,
          }}
        >
          <FormProvider {...newCycleForm}>
            <NewCycleForm />
          </FormProvider>

          <CountDown />
        </CyclesContext.Provider>

        {activeCycle ? (
          <StartCountdownButton
            color="red"
            onClick={handleInterruptCycle}
            type="button"
          >
            <HandPalm size={24} />
            Interromper
          </StartCountdownButton>
        ) : (
          <StartCountdownButton
            color="green"
            type="submit"
            disabled={isDisabled}
          >
            <Play size={24} />
            Começar
          </StartCountdownButton>
        )}
      </form>
    </Container>
  )
}
