import Image from 'next/image'
import { useRouter } from 'next/router'
import { useContext } from 'react'
import styles from './WorkPage.module.scss'
import { ContactLink } from '@/components/Link/ContactLink/ContactLink'
import { NextWorkLink } from '@/components/Link/NextWorkLink/NextWorkLink'
import { Tag } from '@/components/Tag/Tag/Tag'
import { AppContext } from '@/contexts/AppContext'
import { translateEmbeddedEditor, translateWorkDuration } from '@/lib/functions'

const WorkPage = () => {
  const { works, tags, isMobile } = useContext(AppContext)
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
              src={isMobile ? work.header_sp.url : work.header_pc.url}
              alt={work.title}
              layout='fill'
              objectFit='cover'
              quality={100}
            />
          )}
        </div>
        <div className={styles.workPage_top_info}>
          <div className={styles.workPage_top_info_left}>
            <div className={styles.workPage_top_info_left_title + ' avenir-bold'}>
              {work?.title}
            </div>
            <div className={styles.workPage_top_info_left_details}>
              <div className={styles.workPage_top_info_left_details_tags}>
                {work?.tags.map((item, index) => {
                  const tagObj: any = tags.find((tag) => tag.id == item.id)
                  return (
                    tagObj !== undefined && (
                      <Tag
                        tag={tagObj}
                        key={index}
                        isSelectedStyle={true}
                        isLabelStyle={true}
                        styles={{
                          marginRight: '8px',
                          marginBottom: '8px',
                          backgroundColor: '#fff',
                          cursor: 'default',
                        }}
                      />
                    )
                  )
                })}
              </div>
              <div className={styles.workPage_top_info_left_details_data}>
                <div className={styles.workPage_top_info_left_details_data_item}>
                  <div>作業期間</div>
                  <div className='avenir'>
                    {translateWorkDuration(work?.start_date, work?.end_date)}
                  </div>
                </div>
                <div className={styles.workPage_top_info_left_details_data_item}>
                  <div>担当箇所</div>
                  <div>{work?.responsibility}</div>
                </div>
              </div>
            </div>
          </div>
          {work !== undefined && (
            <div className={styles.workPage_top_info_right}>
              <div className={styles.workPage_top_info_right_subtitle}>{work.summary_list}</div>
              <div dangerouslySetInnerHTML={{ __html: work?.summary_top }}></div>
            </div>
          )}
        </div>
      </div>
      <div className={styles.workPage_content}>
        {work !== undefined && (
          <section
            className={styles.workPage_content_container}
            dangerouslySetInnerHTML={{ __html: translateEmbeddedEditor(work.contents) }} // microCMSのフォーマットを配置
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
            styles={
              workOrder + 1 < works.length
                ? isMobile
                  ? { marginTop: '-176px' }
                  : { marginTop: '-96px' }
                : {}
            }
          />
        )}
      </div>
      <ContactLink />
    </>
  )
}

export default WorkPage
