import { zodResolver } from '@hookform/resolvers/zod'
import { HandPalm, Play } from 'phosphor-react'
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import * as zod from 'zod'
import { CyclesContext } from '../../contexts/CyclesContext'
import { CountDown } from './components/CountDown'
import { NewCycleForm } from './components/NewCycleForm'
import { Container, StartCountdownButton } from './styles'

export const Home: React.FC = () => {
  const { activeCycle, createNewCycle, interruptCycle } =
    React.useContext(CyclesContext)

  const newCycleFormValidationSchema = zod.object({
    task: zod.string().min(1, 'O nome do projeto é obrigatório'),
    time: zod.number().int().min(1).max(60),
  })

  type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      time: 0,
    },
  })

  const { handleSubmit, reset, watch } = newCycleForm

  const handleCreateNewCycle = (data: NewCycleFormData) => {
    createNewCycle(data)
    reset()
  }

  const task = watch('task')
  const isDisabled = !task

  return (
    <Container>
      <form action="" onSubmit={handleSubmit(handleCreateNewCycle)}>
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>
        <CountDown />

        {activeCycle ? (
          <StartCountdownButton
            color="red"
            onClick={interruptCycle}
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
