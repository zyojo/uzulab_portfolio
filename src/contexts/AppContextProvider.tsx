import { ReactNode, useEffect, useState } from 'react'
import { AppContext } from './AppContext'
import { DUMMY_TAGS, EMPTY_TAGS } from '@/lib/stub/dummyTags'
import { DUMMY_WORKS, EMPTY_WORKS } from '@/lib/stub/dummyWorks'

type Props = {
  children: ReactNode
}

export const AppContextProvider = ({ children }: Props) => {
  const [works, setWorks] = useState(EMPTY_WORKS)
  const [tags, setTags] = useState(EMPTY_TAGS)
  const handleWorks = () => {
    setWorks(DUMMY_WORKS)
  }
  const handleTags = () => {
    setTags(DUMMY_TAGS)
  }
  return (
    <>
      <AppContext.Provider value={{ works, handleWorks, tags, handleTags }}>
        {children}
      </AppContext.Provider>
    </>
  )
}
