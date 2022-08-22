import type { AppProps } from 'next/app'
import '@/styles/globals.scss'
import { useEffect, useState } from 'react'
import { AppContext } from '@/contexts/AppContext'
import { BaseLayout } from '@/layouts/Base/Base'
import { EMPTY_TAGS } from '@/lib/stub/dummyTags'
import { EMPTY_WORKS } from '@/lib/stub/dummyWorks'
import { fetchTags } from '@/repositories/fetchTags'
import { fetchWorks } from '@/repositories/fetchWorks'

export default function MyApp({ Component, pageProps }: AppProps) {
  const [works, setWorks] = useState(EMPTY_WORKS)
  const [tags, setTags] = useState(EMPTY_TAGS)
  const handleWorks = async () => {
    setWorks(await fetchWorks())
  }
  const handleTags = async () => {
    setTags(await fetchTags())
  }
  useEffect(() => {
    handleWorks()
    handleTags()
  }, [])
  return (
    <AppContext.Provider value={{ works, tags, handleWorks, handleTags }}>
      <BaseLayout>
        <Component {...pageProps} />
      </BaseLayout>
    </AppContext.Provider>
  )
}
