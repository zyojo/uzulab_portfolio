import Image from 'next/image'
import { useRouter } from 'next/router'
import { useContext, useEffect } from 'react'
import styles from './WorkPage.module.scss'
import { ContactLink } from '@/components/Link/ContactLink/ContactLink'
import { NextWorkLink } from '@/components/Link/NextWorkLink/NextWorkLink'
import { Tag } from '@/components/Tag/Tag/Tag'
import { Loader } from '@/components/common/Loader/Loader'
import { OpenIcon } from '@/image/OpenIcon'
import { setLoadFlg, translateEmbeddedEditor, translateWorkDuration } from '@/lib/functions'
import { getWorkLink } from '@/lib/getLinks'
import { AppContext } from '@/providers/AppContext'
import { fetchTags } from '@/repositories/handleTags'
import { fetchWork, fetchWorks } from '@/repositories/handleWorks'
import { TagType } from '@/types/Tag'
import { WorkType } from '@/types/Work'

export const getStaticPaths = async () => {
  const works = await fetchWorks()
  const paths = works.map(({ id }: { id: string }) => ({
    params: { work_id: id },
  }))
  return {
    paths: paths,
    fallback: false,
  }
}

export const getStaticProps = async ({ params }: { params: { work_id: string } }) => {
  const { work_id } = params
  const work = await fetchWork(work_id)
  const works = await fetchWorks()
  const tags = await fetchTags()
  return { props: { work, works, tags, workId: work_id } }
}

const WorkPage = ({
  work,
  works,
  tags,
  workId,
}: {
  work: WorkType
  works: WorkType[]
  tags: TagType[]
  workId: string
}) => {
  const { isMobile } = useContext(AppContext)
  const workIds = works.map((work) => work.id)
  const workOrder = work !== undefined ? workIds.indexOf(workId) : undefined

  useEffect(() => {
    // @ts-expect-error
    window.twttr?.widgets.load()
  }, [workId, works])

  const TopDescription = ({ forSP = false }: { forSP?: boolean }) => {
    return (
      <>
        {work !== undefined && (
          <div className={styles.workPage_top_info_right} data-sp={forSP}>
            <div className={styles.workPage_top_info_right_subtitle}>{work.summary_list}</div>
            <div
              className={styles.workPage_top_info_right_text}
              dangerouslySetInnerHTML={{ __html: work?.summary_top }}
            ></div>
          </div>
        )}
      </>
    )
  }

  return (
    <article className={styles.workPage}>
      <section className={styles.workPage_top}>
        <div className={styles.workPage_top_img}>
          <Loader />
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
            <div className={styles.workPage_top_info_left_titleContainer}>
              <h1 className={styles.workPage_top_info_left_title + ' avenir-bold'}>
                {work?.title}
              </h1>
              {work?.url !== undefined && (
                <div className={styles.workPage_top_info_left_websiteSP}>
                  <a
                    target='_blank'
                    href={work?.url}
                    rel='noreferrer'
                    className={styles.workPage_top_info_left_websiteSP_link}
                  >
                    Webサイトを開く
                    <OpenIcon className={styles.workPage_top_info_left_websiteSP_link_icon} />
                  </a>
                </div>
              )}
            </div>
            <TopDescription forSP={true} />
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
                {work?.url !== undefined && (
                  <>
                    <br />
                    <div className={styles.workPage_top_info_left_website}>
                      <a
                        target='_blank'
                        href={work?.url}
                        rel='noreferrer'
                        className={styles.workPage_top_info_left_website_link}
                      >
                        Webサイトを開く
                        <OpenIcon className={styles.workPage_top_info_left_website_link_icon} />
                      </a>
                    </div>
                  </>
                )}
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
          <TopDescription />
        </div>
      </section>
      <section className={styles.workPage_content}>
        {work !== undefined && (
          <section
            className={styles.workPage_content_container}
            dangerouslySetInnerHTML={{ __html: translateEmbeddedEditor(work.contents) }} // microCMSのフォーマットを配置
          ></section>
        )}

        {workOrder !== undefined && workOrder + 1 < works.length && (
          <NextWorkLink link={getWorkLink(works[workOrder + 1].id)} work={works[workOrder + 1]} />
        )}
        {workOrder !== undefined && workOrder - 1 >= 0 && (
          <NextWorkLink
            link={getWorkLink(works[workOrder - 1].id)}
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
