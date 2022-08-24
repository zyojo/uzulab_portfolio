import Image from 'next/image'
import { useRouter } from 'next/router'
import { useContext } from 'react'
import styles from './WorkPage.module.scss'
import { ContactLink } from '@/components/Link/ContactLink/ContactLink'
import { NextWorkLink } from '@/components/Link/NextWorkLink/NextWorkLink'
import { Tag } from '@/components/Tag/Tag/Tag'
import { AppContext } from '@/contexts/AppContext'
import { translateWorkDuration } from '@/lib/functions'

const WorkPage = () => {
  const { works, tags } = useContext(AppContext)
  const router = useRouter()
  const { work_id } = router.query
  const work = works.find((work) => String(work.id) == work_id)
  const workOrder = work !== undefined ? works.indexOf(work) : undefined
  return (
    <>
      <div className={styles.workPage_top}>
        <div className={styles.workPage_top_img}>
          {work !== undefined && (
            <Image
              src={work.ACF.work_header_pc}
              alt={work.title.rendered}
              layout='fill'
              objectFit='cover'
            />
          )}
        </div>
        <div className={styles.workPage_top_info}>
          <div className={styles.workPage_top_info_left}>
            <div className={styles.workPage_top_info_left_title + ' avenir-bold'}>
              {work?.title.rendered}
            </div>
            <div className={styles.workPage_top_info_left_details}>
              <div className={styles.workPage_top_info_left_details_tags}>
                {work?.tags.map((item, index) => {
                  const tagObj = tags.find((tag) => tag.id == item)
                  return (
                    tagObj !== undefined && (
                      <Tag
                        tag={tagObj}
                        key={index}
                        isSelectedStyle={true}
                        isLabelStyle={true}
                        styles={{ marginRight: '8px', backgroundColor: '#fff', cursor: 'default' }}
                      />
                    )
                  )
                })}
              </div>
              <div className={styles.workPage_top_info_left_details_data}>
                <div>作業期間</div>
                <div className='avenir'>
                  {translateWorkDuration(work?.ACF.work_start_month, work?.ACF.work_end_month)}
                </div>
              </div>
              <div className={styles.workPage_top_info_left_details_data}>
                <div>担当箇所</div>
                <div>{work?.ACF.work_responsibility}</div>
              </div>
            </div>
          </div>
          {work !== undefined && (
            <div
              className={styles.workPage_top_info_right}
              dangerouslySetInnerHTML={{ __html: work?.ACF.work_summary_top }}
            ></div>
          )}
        </div>
      </div>
      <div className={styles.workPage_content}>
        {work !== undefined && (
          <section
            className={styles.workPage_content_container}
            dangerouslySetInnerHTML={{ __html: work?.content.rendered }} // WPのフォーマットを配置
          ></section>
        )}

        {workOrder !== undefined && workOrder + 1 < works.length && (
          <NextWorkLink link={'/works/' + works[workOrder + 1].id} work={works[workOrder + 1]} />
        )}
        {workOrder !== undefined && workOrder - 1 >= 0 && (
          <NextWorkLink
            link={'/works/' + works[workOrder - 1].id}
            work={works[workOrder - 1]}
            isPrev={true}
            styles={workOrder + 1 < works.length ? { marginTop: '-96px' } : {}}
          />
        )}
      </div>
      <ContactLink />
    </>
  )
}

export default WorkPage
