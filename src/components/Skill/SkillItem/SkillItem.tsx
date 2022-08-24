import Image from 'next/image'
import styles from './SkillItem.module.scss'

type Prop = {
  skill: {
    title: string
    image: any
    desc: string
    skill: string
  }
  style?: {}
}

export const SkillItem = (props: Prop) => {
  return (
    <div className={styles.skillItem} style={props.style}>
      <div className={styles.skillItem_img}>
        <Image src={props.skill.image} alt={props.skill.title} />
      </div>
      <div className={styles.skillItem_title}>{props.skill.title}</div>
      <div className={styles.skillItem_desc}>{props.skill.desc}</div>
      <div className={styles.skillItem_skill + ' avenir-bold'}>{props.skill.skill}</div>
    </div>
  )
}
