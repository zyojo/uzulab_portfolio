import Image from 'next/image'
import Link from 'next/link'
import styles from './NextWorkLink.module.scss'
import { WorkType } from '@/types/Work'

type Props = {
  link: string
  isPrev?: boolean
  work: WorkType
  styles?: {}
}

export const NextWorkLink = (props: Props) => {
  return (
    <>
      {
        <Link href={props.link} scroll={true}>
          <a className={styles.nextWorkLink} data-isprev={props.isPrev} style={props.styles}>
            <div className={styles.nextWorkLink_img}>
              <Image src={props.work.thumbnail.url} alt={props.work.title} layout='fill' />
            </div>
            <div className={styles.nextWorkLink_info}>
              <div className={styles.nextWorkLink_info_title + ' avenir-bold'}>
                {props.work.title}
              </div>
              <div className={styles.nextWorkLink_info_arrow + ' avenir-bold'}>
                {props.isPrev ? 'prev' : 'next'}
              </div>
            </div>
          </a>
        </Link>
      }
    </>
  )
}
