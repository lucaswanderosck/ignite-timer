import { differenceInSeconds } from 'date-fns'
import React from 'react'
import { CyclesContext } from '../../../../contexts/CyclesContext'
import { Container, Separator } from './styles'

export const CountDown: React.FC = () => {
  const {
    activeCycle,
    activeCycleId,
    markCurrentCycleAsFinished,
    secondsPassed,
    setSecondsPassedForActiveCycle,
  } = React.useContext(CyclesContext)

  const totalSeconds = activeCycle ? activeCycle.time * 60 : 0
  const currentSeconds = activeCycle ? totalSeconds - secondsPassed : 0

  const minutesAmount = Math.floor(currentSeconds / 60)
  const secondsAmount = currentSeconds % 60

  const minutes = String(minutesAmount).padStart(2, '0')
  const seconds = String(secondsAmount).padStart(2, '0')

  React.useEffect(() => {
    let interval: number

    if (activeCycle) {
      interval = setInterval(() => {
        const secondsDifference = differenceInSeconds(
          new Date(),
          new Date(activeCycle.startDate),
        )

        if (secondsDifference >= totalSeconds) {
          markCurrentCycleAsFinished()

          setSecondsPassedForActiveCycle(totalSeconds)

          clearInterval(interval)
        } else {
          setSecondsPassedForActiveCycle(secondsDifference)
        }
      }, 1000)
    }

    return () => {
      clearInterval(interval)
    }
  }, [
    activeCycle,
    totalSeconds,
    activeCycleId,
    markCurrentCycleAsFinished,
    setSecondsPassedForActiveCycle,
  ])

  React.useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}:${seconds} | Pomodoro`
    }
  }, [activeCycle, minutes, seconds])

  return (
    <Container>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <Separator>:</Separator>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </Container>
  )
}
