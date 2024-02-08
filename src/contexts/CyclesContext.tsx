import React from 'react'
import {
  addNewCycleAction,
  interruptCycleAction,
  markCycleAsFinishedAction,
} from '../reducers/cycles/actions'
import { Cycle, cyclesReducer } from '../reducers/cycles/reducer'

interface CreateCycleData {
  task: string
  time: number
}

interface CyclesContextType {
  cycles: Cycle[]
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  secondsPassed: number
  setSecondsPassedForActiveCycle: (seconds: number) => void
  markCurrentCycleAsFinished: () => void
  createNewCycle: (data: CreateCycleData) => void
  interruptCycle: () => void
}

interface Props {
  children: React.ReactNode
}

export const CyclesContext = React.createContext({} as CyclesContextType)

export const CyclesContextProvider: React.FC<Props> = ({ children }) => {
  const [cyclesState, dispatch] = React.useReducer(
    cyclesReducer,

    {
      cycles: [],
      activeCycleId: null,
    },
  )

  const [secondsPassed, setSecondsPassed] = React.useState(0)

  const { cycles, activeCycleId } = cyclesState
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  const createNewCycle = (data: CreateCycleData) => {
    const newCycle: Cycle = {
      id: String(new Date().getTime()),
      task: data.task,
      time: data.time,
      startDate: new Date(),
    }

    dispatch(addNewCycleAction(newCycle))
    setSecondsPassed(0)
  }

  const interruptCycle = () => {
    dispatch(interruptCycleAction())
  }

  const markCurrentCycleAsFinished = () => {
    dispatch(markCycleAsFinishedAction())
  }

  const setSecondsPassedForActiveCycle = (seconds: number) => {
    setSecondsPassed(seconds)
  }

  return (
    <CyclesContext.Provider
      value={{
        cycles,
        activeCycle,
        activeCycleId,
        secondsPassed,
        setSecondsPassedForActiveCycle,
        markCurrentCycleAsFinished,
        createNewCycle,
        interruptCycle,
      }}
    >
      {children}
    </CyclesContext.Provider>
  )
}
