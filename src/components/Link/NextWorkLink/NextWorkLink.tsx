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
        <Link href={props.link}>
          <a className={styles.nextWorkLink} data-isprev={props.isPrev} style={props.styles}>
            <div className={styles.nextWorkLink_img}>
              <Image src={props.work.ACF.work_img} alt={props.work.title.rendered} layout='fill' />
            </div>
            <div className={styles.nextWorkLink_info}>
              <div className={styles.nextWorkLink_info_title + ' avenir'}>
                {props.work.title.rendered}
              </div>
              <div className={styles.nextWorkLink_info_arrow + ' avenir'}>
                {props.isPrev ? 'prev' : 'next'}
              </div>
            </div>
          </a>
        </Link>
      }
    </>
  )
}
