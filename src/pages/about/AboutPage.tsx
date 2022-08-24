import type { NextPageWithLayout } from 'next'
import Image from 'next/image'
import styles from './AboutPage.module.scss'
import { ContactLink } from '@/components/Link/ContactLink/ContactLink'
import { SkillItem } from '@/components/Skill/SkillItem/SkillItem'
import { WorkflowImg } from '@/components/Workflow/WorkflowImg/WorkflowImg'
import { WorkflowTab } from '@/components/Workflow/WorkflowTab/WorkflowTab'
import PROFILE_IMG from '@/image/zyojo.png'
import { SKILLS_DATA, WORKFLOW_DATA } from '@/lib/constants'

const AboutPage: NextPageWithLayout = () => {
  return (
    <div className={styles.about}>
      <div className={styles.about_top}>
        <div className={styles.about_top_img}>
          <Image src={PROFILE_IMG} alt='RyotaNakahara' />
        </div>
        <div className={styles.about_top_title + ' avenir-italic'}>Ryota Nakahara</div>
        <div className={styles.about_top_subtitle + ' avenir-italic'}>
          UI/UX Designer, WEB Developer
        </div>
        <div className={styles.about_top_desc}>
          通信技術の進歩やツールの発達により、ユーザー体験の可能性はディスプレイ上にとどまらず日々拡大しています。それを利用することで私たちは、自らの色をより表現しやすく、またそれに共鳴する仲間とより繋がりやすくなりました。
          <br />
          Web開発者としての知識とデザインの力を使って、より良い未来の姿を一緒に考え作リ上げるお手伝いをします。
        </div>
      </div>
      <div className={styles.about_skills}>
        {SKILLS_DATA.map((item, index) => (
          <SkillItem skill={item} key={index} style={index == 1 ? { margin: '80px 0 0' } : {}} />
        ))}
      </div>
      <div className={styles.about_flow}>
        <div className={styles.about_flow_title}>制作の流れ</div>
        <div className={styles.about_flow_desc}>
          デザインは、頭の中に存在する理想を明確な「かたち」へと作り上げていくプロセスです。
          <br />
          対話を重ねながら目的を掘り下げ、成果物の解像度を上げていきます。
        </div>
        <WorkflowImg flows={WORKFLOW_DATA} style={{ marginBottom: '104px' }} />
        <WorkflowTab flows={WORKFLOW_DATA} style={{}} />
      </div>
      <ContactLink />
    </div>
  )
}

export default AboutPage
