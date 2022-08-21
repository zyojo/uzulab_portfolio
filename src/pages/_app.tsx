import type { AppProps } from 'next/app'
import '@/styles/globals.scss'
import { useEffect, useState } from 'react'
import { AppContext } from '@/contexts/AppContext'
import { BaseLayout } from '@/layouts/Base/Base'
import { EMPTY_WORKS } from '@/lib/stub/dummyWorks'
import { fetchWorks } from '@/repositories/fetchWorks'

export default function MyApp({ Component, pageProps }: AppProps) {
  const [works, setWorks] = useState(EMPTY_WORKS)
  const handleWorks = async () => {
    setWorks(await fetchWorks())
  }
  useEffect(() => {
    handleWorks()
  }, [])
  return (
    <AppContext.Provider value={{ works, handleWorks }}>
      <BaseLayout>
        <Component {...pageProps} />
      </BaseLayout>
    </AppContext.Provider>
  )
}
