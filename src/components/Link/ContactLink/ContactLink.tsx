import Link from 'next/link'
import styles from './ContactLink.module.scss'
import { getContactLink } from '@/lib/getLinks'

export const ContactLink = () => {
  return (
    <>
      {
        <Link href={getContactLink()}>
          <div className={styles.contactLink}>
            <h2 className={styles.contactLink_title + ' avenir-bold'}>contact</h2>
            <div className={styles.contactLink_desc}>
              webに関することでも、
              <br />
              それ以外のことでも
              <br />
              お気軽にご連絡ください。
            </div>
          </div>
        </Link>
      }
    </>
  )
}
