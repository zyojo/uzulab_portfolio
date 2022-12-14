import Image from 'next/image'
import { useRouter } from 'next/router'
import { useContext, useState } from 'react'
import styles from './WorkPage.module.scss'
import { ContactLink } from '@/components/Link/ContactLink/ContactLink'
import { NextWorkLink } from '@/components/Link/NextWorkLink/NextWorkLink'
import { Tag } from '@/components/Tag/Tag/Tag'
import { setLoadFlg, translateEmbeddedEditor, translateWorkDuration } from '@/lib/functions'
import { AppContext } from '@/providers/AppContext'

const WorkPage = () => {
  const { works, tags, isMobile } = useContext(AppContext)
  const router = useRouter()
  const { work_id } = router.query
  const work = works.find((work) => String(work.urn) == work_id)
  const workOrder = work !== undefined ? works.indexOf(work) : undefined

  return (
    <article className={styles.workPage}>
      <section className={styles.workPage_top}>
        <div className={styles.workPage_top_img}>
          <div className='loader'></div>
          {work !== undefined && (
            <Image
              src={isMobile ? work.header_sp.url : work.header_pc.url}
              alt={work.title}
              layout='fill'
              objectFit='cover'
              quality={100}
              loading='eager'
              onLoad={setLoadFlg}
            />
          )}
        </div>
        <div className={styles.workPage_top_info}>
          <div className={styles.workPage_top_info_left}>
            <h1 className={styles.workPage_top_info_left_title + ' avenir-bold'}>{work?.title}</h1>
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
                  <div>????????????</div>
                  <div className='avenir'>
                    {translateWorkDuration(work?.start_date, work?.end_date)}
                  </div>
                </div>
                <div className={styles.workPage_top_info_left_details_data_item}>
                  <div>????????????</div>
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
      </section>
      <section className={styles.workPage_content}>
        {work !== undefined && (
          <section
            className={styles.workPage_content_container}
            dangerouslySetInnerHTML={{ __html: translateEmbeddedEditor(work.contents) }} // microCMS??????????????????????????????
          ></section>
        )}

        {workOrder !== undefined && workOrder + 1 < works.length && (
          <NextWorkLink link={'/works/' + works[workOrder + 1].urn} work={works[workOrder + 1]} />
        )}
        {workOrder !== undefined && workOrder - 1 >= 0 && (
          <NextWorkLink
            link={'/works/' + works[workOrder - 1].urn}
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
      </section>
      <aside>
        <ContactLink />
      </aside>
    </article>
  )
}

export default WorkPage
