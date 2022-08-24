import Image, { StaticImageData } from 'next/image'
import { useState } from 'react'
import styles from './WorkflowTab.module.scss'

type Props = {
  flows: {
    title: string
    imgs: StaticImageData[]
    desc: string
  }[]
  style?: {}
}

export const WorkflowTab = (props: Props) => {
  const [selectedFlow, setSelectedFlow] = useState(0)
  return (
    <div className={styles.workflowTab} style={props.style}>
      {props.flows !== undefined &&
        props.flows.map((item, index) => (
          <div
            className={styles.workflowTab_item}
            key={index}
            data-selected={selectedFlow == index + 1}
            onClick={() => {
              if (selectedFlow == index + 1) {
                setSelectedFlow(0)
              } else {
                setSelectedFlow(index + 1)
              }
            }}
          >
            <div className={styles.workflowTab_item_title}>
              <div className={styles.workflowTab_item_title_order + ' avenir'}>
                {index + 1} / {props.flows.length}
              </div>
              <div>{item.title}</div>
            </div>
            <div className={styles.workflowTab_item_content}>
              {item.imgs.length > 0 && (
                <div className={styles.workflowTab_item_content_imgs}>
                  {item.imgs.map((img, imgIndex) => {
                    return (
                      <div className={styles.workflowTab_item_content_imgs_img} key={imgIndex}>
                        <Image src={img} alt={item.title} layout='fill' />
                      </div>
                    )
                  })}
                </div>
              )}
              <div className={styles.workflowTab_item_content_desc}>{item.desc}</div>
            </div>
          </div>
        ))}
    </div>
  )
}
