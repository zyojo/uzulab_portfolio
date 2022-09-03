import { Tag } from '../Tag/Tag'
import styles from './TagList.module.scss'
import { TagType } from '@/types/Tag'

type Prop = {
  tags: TagType[]
  selectedTagID: string
  handleSelectedID: (selectedTagID: string) => void
}

export const TagList = (props: Prop) => {
  return (
    <div className={styles.tagList} data-loading={props.tags.length > 1}>
      <Tag
        isAll={true}
        tag={{ id: '0', name: 'all' }}
        isSelectedStyle={props.selectedTagID == 'all'}
        handleSelectedID={() => {
          props.handleSelectedID('all')
        }}
      />
      {props.tags &&
        props.tags.map((item, index) => (
          <Tag
            tag={item}
            key={index}
            isSelectedStyle={props.selectedTagID == item.id}
            handleSelectedID={() => {
              console.log(item.id)
              props.handleSelectedID(item.id)
            }}
          />
        ))}
    </div>
  )
}
