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
  const fetchWorks = async () => {
    setWorks(await handleWorks())
  }
  const fetchTags = async () => {
    setTags(await handleTags())
  }
  useEffect(() => {
    fetchWorks()
    fetchTags()
  }, [])
  return (
    <AppContext.Provider value={{ works, tags, handleWorks, handleTags }}>
      <BaseLayout>
        <Component {...pageProps} />
      </BaseLayout>
    </AppContext.Provider>
  )
}
