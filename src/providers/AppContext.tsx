import React, { useEffect, useState } from 'react'
import { usePageView } from '@/hooks/usePageView'
import { EMPTY_TAGS } from '@/lib/stub/dummyTags'
import { EMPTY_WORKS } from '@/lib/stub/dummyWorks'
import { handleTags } from '@/repositories/handleTags'
import { handleWorks } from '@/repositories/handleWorks'
import { TagType } from '@/types/Tag'
import { WorkType } from '@/types/Work'

type AppContextType = {
  works: WorkType[]
  tags: TagType[]
  windowWidth: number
  isMobile: boolean
  hasChangedEvent: boolean
  handleChangeEvent: () => void
}
export const AppContext = React.createContext({} as AppContextType)

export const AppProvider = (props: any) => {
  const { children } = props
  const [works, setWorks] = useState(EMPTY_WORKS)
  const [tags, setTags] = useState(EMPTY_TAGS)
  const [windowWidth, setWindowWidth] = useState(1441)
  const [isMobile, setIsMobile] = useState(false)
  const [hasChangedEvent, setHasChangedEvent] = useState(false)

  const fetchWorks = async () => {
    const data = await handleWorks()
    setWorks(data.contents)
  }
  const fetchTags = async () => {
    const data = await handleTags()
    setTags(data.contents)
  }
  const handleWindowResize = () => {
    setWindowWidth(window.innerWidth)
    window.innerWidth <= 450 ? setIsMobile(true) : setIsMobile(false)
  }
  const handleChangeEvent = () => {
    setHasChangedEvent(true)
  }
  usePageView()

  useEffect(() => {
    fetchWorks()
    fetchTags()
    setWindowWidth(window.innerWidth)
    window.innerWidth <= 450 ? setIsMobile(true) : setIsMobile(false)
    window.addEventListener('resize', handleWindowResize)
  }, [])

  return (
    <AppContext.Provider
      value={{
        works,
        tags,
        windowWidth,
        isMobile,
        hasChangedEvent,
        handleChangeEvent,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
