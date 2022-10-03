import Head from 'next/head'
import { useRouter } from 'next/router'
import { ReactElement, useContext, useRef } from 'react'
import styles from './Base.module.scss'
import { Footer } from '@/components/common/Footer/Footer'
import { Header } from '@/components/common/Header/Header'
import { metaData } from '@/lib/constants'
import { AppContext } from '@/providers/AppContext'

type LayoutProps = Required<{
  readonly children: ReactElement
}>

export const BaseLayout = ({ children }: LayoutProps) => {
  const { hasChangedEvent, handleChangeEvent } = useContext(AppContext)
  const router = useRouter()
  const mainRef = useRef<HTMLDivElement>(null)
  const handleChangeRoute = () => {
    handleChangeEvent()
    mainRef.current?.scrollTo({ top: 0, behavior: 'smooth' })
  }
  router.events !== undefined &&
    !hasChangedEvent &&
    router.events.on('routeChangeComplete', handleChangeRoute)
  return (
    <>
      <Head>
        <title>{metaData.title}</title>
        <link rel='icon' href={metaData.favicon.src} />
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
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');`,
          }}
        />
      </Head>
      <Header />
      <main className={styles.main} ref={mainRef}>
        {children}
        <Footer />
      </main>
    </>
  )
}
