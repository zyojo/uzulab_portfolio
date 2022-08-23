import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import styles from './Header.module.scss'
import CONTACT_ICON from '@/image/contact_icon.svg'
import HEADER_LOGO from '@/image/uzulab.svg'

export const Header = () => {
  const router = useRouter()
  console.log(router.pathname)
  return (
    <header className={styles.header}>
      <Link href='/works'>
        <a>
          <div className={styles.header_logo}>
            <Image src={HEADER_LOGO} alt={'uzulab'} layout='fill' />
          </div>
        </a>
      </Link>
      <div className={styles.header_links}>
        <Link href='/about'>
          <a
            className={styles.header_links_link + ' avenir-bold'}
            data-here={router.pathname.includes('about')}
          >
            about
          </a>
        </Link>
        <Link href='/works'>
          <a
            className={styles.header_links_link + ' avenir-bold'}
            data-here={router.pathname.includes('works') || router.pathname == '/'}
          >
            works
          </a>
        </Link>
        <Link href='/contact'>
          <a className={styles.header_links_link} data-here={router.pathname.includes('contact')}>
            <Image src={CONTACT_ICON} alt={'contact'} layout='fill' />
          </a>
        </Link>
      </div>
    </header>
  )
}
