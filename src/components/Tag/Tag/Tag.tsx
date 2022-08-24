import styles from './Tag.module.scss'
import { SimpleTagType, TagType } from '@/types/Tag'

type Prop = {
  isAll?: boolean
  tag: TagType | SimpleTagType
  isSelectedStyle: boolean
  isLabelStyle?: boolean
  handleSelectedID?: (selectedTagID: number) => void
  styles?: {}
}

export const Tag = (props: Prop) => {
  return (
    <>
      {
        <div
          className={styles.tag + (props.isLabelStyle ? ' avenir-bold' : ' avenir')}
          data-selected={props.isSelectedStyle}
          data-label={props.isLabelStyle}
          onClick={() => {
            const tagID = props.tag.id
            props.handleSelectedID !== undefined && props.handleSelectedID(tagID)
          }}
          style={props.styles}
        >
          {props.isAll ? 'all' : props.tag !== undefined && props.tag.name}
        </div>
      }
    </>
  )
}
