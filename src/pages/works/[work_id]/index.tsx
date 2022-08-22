import type { NextPageWithLayout } from 'next'
import { useContext } from 'react'
import WorkPage from './WorkPage'
import { AppContext } from '@/contexts/AppContext'

const Index: NextPageWithLayout = () => {
  const { works } = useContext(AppContext)
  return <WorkPage />
}

export default Index
