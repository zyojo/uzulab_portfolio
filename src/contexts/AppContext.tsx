import React from 'react'
import { EMPTY_WORKS } from '@/lib/stub/dummyWorks'
import { Work } from '@/types/Work'

export const AppContext = React.createContext({
  works: EMPTY_WORKS,
  handleWorks: () => {},
} as {
  works: Work[]
  handleWorks: () => void
})
