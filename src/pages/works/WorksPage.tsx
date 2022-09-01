import type { NextPageWithLayout } from 'next'
import { useContext, useState } from 'react'
import styles from './WorksPage.module.scss'
import { ContactLink } from '@/components/Link/ContactLink/ContactLink'
import { TagList } from '@/components/Tag/TagList/TagList'
import { WorkList } from '@/components/Work/WorkList/WorkList'
import { AppContext } from '@/contexts/AppContext'

const WorksPage: NextPageWithLayout = () => {
  const { works, tags } = useContext(AppContext)
  const [selectedTagID, setSelectedTagID] = useState('all')
  const handleSelectedID = (selectedTagID: string) => {
    setSelectedTagID(selectedTagID)
  }

  return (
    <>
      <TagList tags={tags} selectedTagID={selectedTagID} handleSelectedID={handleSelectedID} />
      <WorkList works={works} selectedTagID={selectedTagID} />
      <ContactLink />
    </>
  )
}

export default WorksPage
