import Head from 'next/head'
import { useRouter } from 'next/router'
import Script from 'next/script'
import { ReactElement, useContext, useRef } from 'react'
import styles from './Base.module.scss'
import { Footer } from '@/components/common/Footer/Footer'
import { Header } from '@/components/common/Header/Header'
import { MAIN_URL, metaData } from '@/lib/constants'
import { AppContext } from '@/providers/AppContext'
import { googleTagManagerId } from '@/types/gtm'

type LayoutProps = Required<{
  readonly children: ReactElement
}>

export const BaseLayout = ({ children }: LayoutProps) => {
  const { hasChangedEvent, handleChangeEvent } = useContext(AppContext)
  const router = useRouter()
  const mainRef = useRef<HTMLDivElement>(null)
  const handleChangeRoute = () => {
    handleChangeEvent()
    mainRef.current?.scrollTo({ top: 0, behavior: 'auto' })
  }
  router.events !== undefined &&
    !hasChangedEvent &&
    router.events.on('routeChangeComplete', handleChangeRoute)
  return (
    <>
      <Head>
        <title>{metaData.title}</title>
        <link rel='icon' href={metaData.favicon.src} />
        {router.pathname == '/work' && <link rel='canonical' href={MAIN_URL} />}
        <meta name='description' content={metaData.description} />
        <meta property='og:url' content={metaData.url} />
        <meta property='og:title' content={metaData.title} />
        <meta property='og:site_name' content={metaData.title} />
        <meta property='og:description' content={metaData.description} />
        <meta property='og:type' content='website' />
        <meta property='og:image' content={metaData.ogp.src} />
        <meta property='og:image:width' content={String(metaData.ogp.width)} />
        <meta property='og:image:height' content={String(metaData.ogp.width)} />
        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:title' content={metaData.title} />
        <meta name='twitter:description' content={metaData.description} />
        <meta property='twitter:image' content={metaData.ogp.src} />
        <meta name='theme-color' content='#f8f5f1'></meta>
      </Head>
      <Script src='https://platform.twitter.com/widgets.js' strategy='lazyOnload' />
      <Header />
      <main className={styles.main} ref={mainRef}>
        {children}
        <Footer />
      </main>
    </>
  )
}
