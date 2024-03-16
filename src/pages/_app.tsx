import type { AppProps } from 'next/app'
import { useEffect } from 'react'
import TagManager from 'react-gtm-module'
import { BaseLayout } from '@/layouts/Base/Base'
import { AppProvider } from '@/providers/AppContext'
import '@/styles/globals.scss'

export default function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    TagManager.initialize({ gtmId: process.env.NEXT_PUBLIC_GTM_ID ?? '' })
  }, [])
  return (
    <AppProvider>
      <BaseLayout>
        <Component {...pageProps} />
      </BaseLayout>
    </AppProvider>
  )
}
