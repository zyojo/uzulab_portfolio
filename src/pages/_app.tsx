import type { AppProps } from 'next/app'
import '@/styles/globals.scss'
import { BaseLayout } from '@/layouts/Base/Base'
import { AppProvider } from '@/providers/AppContext'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppProvider>
      <BaseLayout>
        <Component {...pageProps} />
      </BaseLayout>
    </AppProvider>
  )
}
