import styles from './Tag.module.scss'
import { SimpleTagType, TagType } from '@/types/Tag'

type Prop = {
  isAll?: boolean
  tag: TagType | SimpleTagType
  isSelected: boolean
  handleSelectedID?: (selectedTagID: number) => void
}

export const Tag = (props: Prop) => {
  return (
    <>
      {
        <div
          className={styles.tag + ' avenir'}
          data-selected={props.isSelected}
          onClick={() => {
            const tagID = props.tag.id
            props.handleSelectedID !== undefined && props.handleSelectedID(tagID)
          }}
        >
          {props.isAll ? 'all' : props.tag !== undefined && props.tag.name}
        </div>
      }
    </>
  )
}
