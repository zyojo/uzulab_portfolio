import type { AppProps } from 'next/app'
import Analytics from '@/components/common/Analytics'
import { BaseLayout } from '@/layouts/Base/Base'
import { AppProvider } from '@/providers/AppContext'
import '@/styles/globals.scss'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppProvider>
      <BaseLayout>
        <>
          <Analytics />
          <Component {...pageProps} />
        </>
      </BaseLayout>
    </AppProvider>
  )
}
