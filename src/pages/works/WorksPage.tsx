import type { NextPageWithLayout } from 'next'
import { useContext, useState } from 'react'
import styles from './WorksPage.module.scss'
import { TagList } from '@/components/Tag/TagList/TagList'
import { WorkList } from '@/components/Work/WorkList/WorkList'
import { AppContext } from '@/contexts/AppContext'

const WorksPage: NextPageWithLayout = () => {
  const { works, tags } = useContext(AppContext)
  const [selectedTagID, setSelectedTagID] = useState(0)
  const handleSelectedID = (selectedTagID: number) => {
    setSelectedTagID(selectedTagID)
  }

  return (
    <>
      <TagList tags={tags} selectedTagID={selectedTagID} handleSelectedID={handleSelectedID} />
      <WorkList works={works} />
    </>
  )
}

export default WorksPage
