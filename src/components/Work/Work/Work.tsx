import Image from 'next/image'
import Link from 'next/link'
import { useContext } from 'react'
import styles from './Work.module.scss'
import { Tag } from '@/components/Tag/Tag/Tag'
import { Loader } from '@/components/common/Loader/Loader'
import { setLoadFlg, translateWorkDuration } from '@/lib/functions'
import { AppContext } from '@/providers/AppContext'
import { WorkType } from '@/types/Work'

type Prop = {
  work: WorkType
}

export const Work = (props: Prop) => {
  const { tags } = useContext(AppContext)
  return (
    <li className={styles.work}>
      <Link href={'/works/' + props.work.urn} className={styles.work_container}>
        <div className={styles.work_thumb}>
          {props.work.thumbnail.url !== '' && (
            <>
              <Loader />
              <Image
                src={props.work.thumbnail.url}
                alt={props.work.title}
                layout='fill'
                onLoad={setLoadFlg}
              />
            </>
          )}
          <div className={styles.work_thumb_tags}>
            {props.work.tags.map((item, index) => {
              const tagObj = tags.find((tag) => tag.id == item.id)
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
        </div>
        <div className={styles.work_info}>
          <h2 className={styles.work_info_title + ' avenir-bold'}>{props.work.title}</h2>
          <div className={styles.work_info_duration + ' avenir-italic'}>
            {translateWorkDuration(props.work.start_date, props.work.end_date)}
          </div>
          <div className={styles.work_info_desc}>{props.work.summary_list}</div>
        </div>
      </Link>
    </li>
  )
}
