import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useContext } from 'react'
import styles from './Header.module.scss'
import { AppContext } from '@/contexts/AppContext'
import CONTACT_ICON from '@/image/contact_icon.svg'
import HEADER_LOGO from '@/image/uzulab.svg'
import HEADER_LOGO_LINE from '@/image/uzulab_h.svg'

export const Header = () => {
  const router = useRouter()
  const { isMobile } = useContext(AppContext)
  return (
    <header className={styles.header} data-is-mobile={isMobile}>
      <Link href='/works'>
        <a>
          <div className={styles.header_logo} data-is-mobile={isMobile}>
            <Image src={isMobile ? HEADER_LOGO_LINE : HEADER_LOGO} alt={'uzulab'} layout='fill' />
          </div>
        </a>
      </Link>
      <nav className={styles.header_links} aria-label='ヘッダーメニュー'>
        {!(isMobile && router.pathname.includes('about')) && (
          <Link href='/about'>
            <a
              className={styles.header_links_link + ' avenir-bold'}
              data-here={router.pathname.includes('about')}
            >
              about
            </a>
          </Link>
        )}
        {!(isMobile && router.pathname.includes('works')) && (
          <Link href='/works'>
            <a
              className={styles.header_links_link + ' avenir-bold'}
              data-here={router.pathname.includes('works') || router.pathname == '/'}
            >
              works
            </a>
          </Link>
        )}
        {!(isMobile && router.pathname.includes('contact')) && (
          <Link href='/contact'>
            <a
              className={styles.header_links_link}
              data-here={router.pathname.includes('contact')}
              data-is-mobile={isMobile}
              data-is-contact={true}
            >
              <div className={styles.header_links_link_container}>
                <Image src={CONTACT_ICON} alt={'contact'} layout='fill' />
              </div>
            </a>
          </Link>
        )}
      </nav>
    </header>
  )
}
