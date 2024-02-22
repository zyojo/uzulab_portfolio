import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useContext } from 'react'
import styles from './Header.module.scss'
import CONTACT_ICON from '@/image/contact_icon_w.svg'
import HEADER_LOGO_LINE from '@/image/uzulab_h_w.svg'
import HEADER_LOGO from '@/image/uzulab_w.svg'
import { getAboutLink, getContactLink, getHomeLink, getWorksLink } from '@/lib/getLinks'
import { AppContext } from '@/providers/AppContext'

export const Header = () => {
  const router = useRouter()
  const { isMobile } = useContext(AppContext)
  return (
    <header className={styles.header} data-is-mobile={isMobile}>
      <Link href={getHomeLink()}>
        <div className={styles.header_logo} data-is-mobile={isMobile}>
          <Image src={isMobile ? HEADER_LOGO_LINE : HEADER_LOGO} alt={'uzulab'} layout='fill' />
        </div>
      </Link>
      <nav className={styles.header_links} aria-label='ヘッダーメニュー'>
        {!(isMobile && router.pathname.includes('about')) && (
          <Link
            href={getAboutLink()}
            className={styles.header_links_link + ' avenir-bold'}
            data-here={router.pathname.includes('about')}
          >
            about
          </Link>
        )}
        {!(isMobile && (router.pathname.includes('works') || router.pathname == '/')) && (
          <Link
            href={getWorksLink()}
            className={styles.header_links_link + ' avenir-bold'}
            data-here={router.pathname.includes('works') || router.pathname == '/'}
          >
            works
          </Link>
        )}
        {!(isMobile && router.pathname.includes('contact')) && (
          <Link
            href={getContactLink()}
            className={styles.header_links_link}
            data-here={router.pathname.includes('contact')}
            data-is-mobile={isMobile}
            data-is-contact={true}
          >
            <div className={styles.header_links_link_container}>
              <Image src={CONTACT_ICON} alt={'contact'} layout='fill' />
            </div>
          </Link>
        )}
      </nav>
    </header>
  )
}
