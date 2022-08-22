import { Work } from '../Work/Work'
import styles from './WorkList.module.scss'
import { WorkType } from '@/types/Work'

type Prop = {
  works: WorkType[]
}

export const WorkList = (props: Prop) => {
  return (
    <ul className={styles.workList}>
      {props.works && props.works.map((item, index) => <Work work={item} key={index} />)}
    </ul>
  )
}
