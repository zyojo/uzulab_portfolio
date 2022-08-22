import Image from 'next/image'
import Link from 'next/link'
import styles from './Header.module.scss'
import CONTACT_ICON from '@/image/contact_icon.svg'
import HEADER_LOGO from '@/image/uzulab.svg'

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.header_logo}>
        <Image src={HEADER_LOGO} alt={'uzulab'} layout='fill' />
      </div>
      <div className={styles.header_links}>
        <Link href='/about'>
          <a className={styles.header_links_link + ' avenir-bold'}>about</a>
        </Link>
        <Link href='/works'>
          <a className={styles.header_links_link + ' avenir-bold'}>works</a>
        </Link>
        <Link href='/contact'>
          <a className={styles.header_links_link}>
            <Image src={CONTACT_ICON} alt={'contact'} layout='fill' />
          </a>
        </Link>
      </div>
    </header>
  )
}
