import { StaticImageData } from 'next/image'
import styles from './WorkflowImg.module.scss'

type Props = {
  flows: {
    title: string
    imgs: StaticImageData[]
    desc: string
  }[]
  style?: {}
}

export const WorkflowImg = (props: Props) => {
  return (
    <div className={styles.workflowImg} style={props.style}>
      {props.flows !== undefined &&
        props.flows.map((item, index) => (
          <div className={styles.workflowImg_item} key={index}>
            {item.title}
          </div>
        ))}
    </div>
  )
}
