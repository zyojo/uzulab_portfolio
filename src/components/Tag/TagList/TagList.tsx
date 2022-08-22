import { Tag } from '../Tag/Tag'
import styles from './TagList.module.scss'
import { TagType } from '@/types/Tag'

type Prop = {
  tags: TagType[]
  selectedTagID: number
  handleSelectedID: (selectedTagID: number) => void
}

export const TagList = (props: Prop) => {
  return (
    <div className={styles.tagList}>
      <Tag
        isAll={true}
        tag={{ id: 0, name: 'all' }}
        isSelected={props.selectedTagID == 0}
        handleSelectedID={() => {
          props.handleSelectedID(0)
        }}
      />
      {props.tags &&
        props.tags.map((item, index) => (
          <Tag
            tag={item}
            key={index}
            isSelected={props.selectedTagID == item.id}
            handleSelectedID={() => {
              props.handleSelectedID(item.id)
            }}
          />
        ))}
    </div>
  )
}
