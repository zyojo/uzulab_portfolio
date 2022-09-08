import Image, { StaticImageData } from 'next/image'
import { useRef, useState } from 'react'
import styles from './WorkflowItem.module.scss'
import { setLoadFlg } from '@/lib/functions'

type Props = {
  flow: {
    index: number
    title: string
    imgs: StaticImageData[]
    desc: string
  }
  length: number
  isSelected: boolean
  handleSelectedFlow: (index: number) => void
  style?: {}
}

export const WorkflowItem = (props: Props) => {
  const [outerHeight, setOuterHeight] = useState(0)
  const innerRef = useRef<HTMLDivElement>(null)
  const outerRef = useRef<HTMLDivElement>(null)
  return (
    <div
      className={styles.workflowItem}
      onClick={() => {
        props.handleSelectedFlow(props.flow.index)
        innerRef.current !== null && setOuterHeight(innerRef.current?.clientHeight + 50)
      }}
      data-selected={props.isSelected}
    >
      <div className={styles.workflowItem_title}>
        <div className={styles.workflowItem_title_order + ' avenir'}>
          {props.flow.index} / {props.length}
        </div>
        <div>{props.flow.title}</div>
      </div>
      <div
        className={styles.workflowItem_content}
        ref={outerRef}
        style={props.isSelected ? { height: outerHeight + 'px' } : { height: 0 }}
      >
        <div className={styles.workflowItem_content_inner} ref={innerRef}>
          {props.flow.imgs.length > 0 && (
            <div className={styles.workflowItem_content_inner_imgs}>
              {props.flow.imgs.map((img, imgIndex) => {
                return (
                  <div className={styles.workflowItem_content_inner_imgs_img} key={imgIndex}>
                    <div className='loader'></div>
                    <Image
                      src={img}
                      alt={props.flow.title}
                      layout='fill'
                      onLoad={setLoadFlg}
                      style={{ zIndex: 2 }}
                    />
                  </div>
                )
              })}
            </div>
          )}
          <div className={styles.workflowItem_content_inner_desc}>{props.flow.desc}</div>
        </div>
      </div>
    </div>
  )
}
