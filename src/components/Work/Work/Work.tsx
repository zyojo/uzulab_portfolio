import styles from './Work.module.scss'
import { WorkType } from '@/types/Work'

type Prop = {
  work: WorkType
}

export const Work = (props: Prop) => {
  return <li>{props.work.title.rendered}</li>
}
