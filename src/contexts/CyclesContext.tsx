import React from 'react'

interface Cycle {
  id: string
  task: string
  time: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

interface CreateCycleData {
  task: string
  time: number
}

interface CyclesContextType {
  cycles: Cycle[]
  activeCycle: Cycle | undefined
  currentCycleId: string | null
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
  const [cycles, setCycles] = React.useState<Cycle[]>([])
  const [secondsPassed, setSecondsPassed] = React.useState(0)
  const [currentCycleId, setCurrentCycleId] = React.useState<string | null>(
    null,
  )

  const activeCycle = cycles.find((cycle) => cycle.id === currentCycleId)

  const createNewCycle = (data: CreateCycleData) => {
    const newCycle: Cycle = {
      id: String(new Date().getTime()),
      task: data.task,
      time: data.time,
      startDate: new Date(),
    }
    setCycles((state) => [...state, newCycle])
    setCurrentCycleId(newCycle.id)
    setSecondsPassed(0)
  }

  const interruptCycle = () => {
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

  return (
    <CyclesContext.Provider
      value={{
        cycles,
        activeCycle,
        currentCycleId,
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
