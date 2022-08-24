import Image from 'next/image'
import Link from 'next/link'
import { useContext } from 'react'
import styles from './Work.module.scss'
import { Tag } from '@/components/Tag/Tag/Tag'
import { AppContext } from '@/contexts/AppContext'
import { translateWorkDuration } from '@/lib/functions'
import { WorkType } from '@/types/Work'

type Prop = {
  work: WorkType
}

export const Work = (props: Prop) => {
  const { tags } = useContext(AppContext)
  return (
    <li className={styles.work}>
      <Link href={'/works/' + props.work.id}>
        <a className={styles.work_container}>
          <div className={styles.work_thumb}>
            <>
              {props.work.ACF.work_img !== '' && (
                <Image
                  src={props.work.ACF.work_img}
                  alt={props.work.title.rendered}
                  layout='fill'
                />
              )}
              <div className={styles.work_thumb_tags}>
                {props.work.tags.map((item, index) => {
                  const tagObj = tags.find((tag) => tag.id == item)
                  return (
                    tagObj !== undefined && (
                      <Tag
                        tag={tagObj}
                        key={index}
                        isSelectedStyle={true}
                        isLabelStyle={true}
                        styles={{ marginLeft: '8px' }}
                      />
                    )
                  )
                })}
              </div>
            </>
          </div>
          <div className={styles.work_info}>
            <div className={styles.work_info_title + ' avenir-bold'}>
              {props.work.title.rendered}
            </div>
            <div className={styles.work_info_date + ' avenir-italic'}>
              {translateWorkDuration(
                props.work.ACF.work_start_month,
                props.work.ACF.work_end_month,
              )}
            </div>
            <div className={styles.work_info_desc}>{props.work.ACF.work_summary_list}</div>
          </div>
        </a>
      </Link>
    </li>
  )
}
