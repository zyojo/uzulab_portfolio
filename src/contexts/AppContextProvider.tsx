import { ReactNode, useEffect, useState } from 'react'
import { AppContext } from './AppContext'
import { DUMMY_WORKS, EMPTY_WORKS } from '@/lib/stub/dummyWorks'
import { Work } from '@/types/Work'

type Props = {
  children: ReactNode
}

export const AppContextProvider = ({ children }: Props) => {
  const [works, setWorks] = useState(EMPTY_WORKS)
  const handleWorks = () => {
    console.log('set')
    setWorks(DUMMY_WORKS)
  }
  return (
    <>
      <AppContext.Provider value={{ works, handleWorks }}>{children}</AppContext.Provider>
    </>
  )
}
