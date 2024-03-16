import Image from 'next/image'
import Link from 'next/link'
import { useContext, useEffect, useRef, useState } from 'react'
import styles from './Work.module.scss'
import { Tag } from '@/components/Tag/Tag/Tag'
import { Loader } from '@/components/common/Loader/Loader'
import { setLoadFlg, translateWorkDuration } from '@/lib/functions'
import { getWorkLink } from '@/lib/getLinks'
import { AppContext } from '@/providers/AppContext'
import { WorkType } from '@/types/Work'

type Prop = {
  work: WorkType
}

export const Work = (props: Prop) => {
  const { tags, isMobile } = useContext(AppContext)
  const [grayRate, setGrayRate] = useState(1) // 0: active, 1: inactive(grayed)
  const workItemRef = useRef<HTMLLIElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (workItemRef.current === null) {
        return
      }
      const windowHeight = window.innerHeight
      const workItemTop = workItemRef.current.getBoundingClientRect().top
      setGrayRate(getGrayedRate(workItemTop, windowHeight, isMobile))
    }

    const scrollElement = document.getElementsByTagName('main')[0]
    handleScroll()
    scrollElement.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const getGrayedRate = (workItemTop: number, windowHeight: number, isMobile: boolean = false) => {
    const activeZoneTop = isMobile ? windowHeight * -0.05 : windowHeight * -0.2
    const activeZoneBottom = windowHeight * 0.6
    const speedToActivate = 5
    if (workItemTop < activeZoneBottom && activeZoneTop < workItemTop) {
      return 0
    } else if (activeZoneTop > workItemTop) {
      const rate = ((activeZoneTop - workItemTop) / windowHeight) * speedToActivate
      return Math.min(1, rate)
    } else if (activeZoneBottom < workItemTop) {
      const rate = ((workItemTop - activeZoneBottom) / windowHeight) * speedToActivate
      return Math.min(1, rate)
    } else {
      return 1
    }
  }

  const getThumbGrayedStyles = (rate: number = 0) => ({
    opacity: 0.6 + (1 - rate) * 0.3,
    grayscale: rate * 0.5,
    sepia: rate * 0.05,
  })

  return (
    <li
      className={styles.work}
      ref={workItemRef}
      style={{
        backgroundColor: `rgba(255,255,255,${getThumbGrayedStyles(grayRate).opacity * 0.5})`,
      }}
    >
      <Link href={getWorkLink(props.work.id)} className={styles.work_container}>
        <div className={styles.work_thumb}>
          {props.work.thumbnail.url !== '' && (
            <>
              <Loader />
              <Image
                src={props.work.thumbnail.url}
                alt={props.work.title}
                layout='fill'
                onLoad={setLoadFlg}
                style={{
                  filter: `opacity(${getThumbGrayedStyles(grayRate).opacity}) grayscale(${
                    getThumbGrayedStyles(grayRate).grayscale
                  }) sepia(${getThumbGrayedStyles(grayRate).sepia})`,
                }}
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
                    styles={{ marginLeft: '8px', opacity: getThumbGrayedStyles(grayRate).opacity }}
                  />
                )
              )
            })}
          </div>
        </div>
        <div className={styles.work_info}>
          <h2
            className={styles.work_info_title + ' avenir-bold'}
            style={{ opacity: 1 - grayRate * 0.4 }}
          >
            {props.work.title}
          </h2>
          <div
            className={styles.work_info_duration + ' avenir-italic'}
            style={{ opacity: 1 - grayRate * 0.4 }}
          >
            {translateWorkDuration(props.work.start_date, props.work.end_date)}
          </div>
          <div className={styles.work_info_desc} style={{ opacity: 1 - grayRate * 0.4 }}>
            {props.work.summary_list}
          </div>
        </div>
      </Link>
    </li>
  )
}
