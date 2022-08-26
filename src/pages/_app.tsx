import type { AppProps } from 'next/app'
import '@/styles/globals.scss'
import { useEffect, useState } from 'react'
import { AppContext } from '@/contexts/AppContext'
import { BaseLayout } from '@/layouts/Base/Base'
import { EMPTY_TAGS } from '@/lib/stub/dummyTags'
import { EMPTY_WORKS } from '@/lib/stub/dummyWorks'
import { handleTags } from '@/repositories/handleTags'
import { handleWorks } from '@/repositories/handleWorks'

export default function MyApp({ Component, pageProps }: AppProps) {
  const [works, setWorks] = useState(EMPTY_WORKS)
  const [tags, setTags] = useState(EMPTY_TAGS)
  const [windowWidth, setWindowWidth] = useState(1441)
  const [isMobile, setIsMobile] = useState(false)
  const fetchWorks = async () => {
    setWorks(await handleWorks())
  }
  const fetchTags = async () => {
    setTags(await handleTags())
  }
  const handleWindowResize = () => {
    setWindowWidth(window.innerWidth)
    window.innerWidth <= 450 ? setIsMobile(true) : setIsMobile(false)
  }
  useEffect(() => {
    fetchWorks()
    fetchTags()
    setWindowWidth(window.innerWidth)
    window.innerWidth <= 450 ? setIsMobile(true) : setIsMobile(false)
    window.addEventListener('resize', handleWindowResize)
  }, [])

  return (
    <AppContext.Provider value={{ works, tags, handleWorks, handleTags, windowWidth, isMobile }}>
      <BaseLayout>
        <Component {...pageProps} />
      </BaseLayout>
    </AppContext.Provider>
  )
}
