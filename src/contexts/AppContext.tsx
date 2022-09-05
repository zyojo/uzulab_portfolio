import React from 'react'
import { EMPTY_TAGS } from '@/lib/stub/dummyTags'
import { EMPTY_WORKS } from '@/lib/stub/dummyWorks'
import { TagType } from '@/types/Tag'
import { WorkType } from '@/types/Work'

export const AppContext = React.createContext({
  works: EMPTY_WORKS,
  tags: EMPTY_TAGS,
  handleWorks: () => {},
  handleTags: () => {},
  windowWidth: 1441,
  isMobile: false,
  hasChangedEvent: false,
  handleChangeEvent: () => {},
} as {
  works: WorkType[]
  tags: TagType[]
  handleWorks: () => void
  handleTags: () => void
  windowWidth: number
  isMobile: boolean
  hasChangedEvent: boolean
  handleChangeEvent: () => void
})
