import React from 'react'
import { Outlet } from 'react-router-dom'
import { Header } from '../../components/Header'
import { Container } from './styles'

export const DefaultLayout: React.FC = () => {
  return (
    <Container>
      <Header />
      <Outlet />
    </Container>
  )
}
