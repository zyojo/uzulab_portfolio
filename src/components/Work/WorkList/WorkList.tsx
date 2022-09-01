import { Work } from '../Work/Work'
import styles from './WorkList.module.scss'
import { WorkType } from '@/types/Work'

type Prop = {
  works: WorkType[]
  selectedTagID: string
}

export const WorkList = (props: Prop) => {
  return (
    <ul className={styles.workList}>
      {props.works &&
        props.works.map((item, index) => {
          return (
            (props.selectedTagID == 'all' ||
              item.tags.map((tag) => tag.id).includes(String(props.selectedTagID))) && (
              <Work work={item} key={index} />
            )
          )
        })}
    </ul>
  )
}
