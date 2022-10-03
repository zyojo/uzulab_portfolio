import { StaticImageData } from 'next/image'
import { useState } from 'react'
import { WorkflowItem } from '../WorkflowItem/WorkflowItem'
import styles from './WorkflowTab.module.scss'

type Props = {
  flows: {
    index: number
    title: string
    imgs: StaticImageData[]
    desc: string
  }[]
  style?: {}
}

export const WorkflowTab = (props: Props) => {
  const [selectedFlow, setSelectedFlow] = useState(0)

  const handleSelectedFlow = (index: number) => {
    if (selectedFlow == index) {
      setSelectedFlow(0)
    } else {
      setSelectedFlow(index)
    }
  }
  return (
    <div className={styles.workflowTab} style={props.style}>
      {props.flows !== undefined &&
        props.flows.map((item, index) => {
          return (
            <WorkflowItem
              key={index}
              flow={item}
              length={props.flows.length}
              isSelected={selectedFlow == index + 1}
              handleSelectedFlow={handleSelectedFlow}
            />
          )
        })}
    </div>
  )
}
