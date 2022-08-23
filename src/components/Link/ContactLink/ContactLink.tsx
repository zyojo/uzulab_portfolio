import Link from 'next/link'
import styles from './ContactLink.module.scss'

export const ContactLink = () => {
  return (
    <>
      {
        <Link href={'/contact'}>
          <a>
            <div className={styles.contactLink}>
              <div className={styles.contactLink_title + ' avenir-bold'}>contact</div>
              <div className={styles.contactLink_desc}>
                webに関することでも、
                <br />
                それ以外のことでも
                <br />
                お気軽にご連絡ください。
              </div>
            </div>
          </a>
        </Link>
      }
    </>
  )
}
