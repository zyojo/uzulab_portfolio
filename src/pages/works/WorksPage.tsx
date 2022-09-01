import type { NextPageWithLayout } from 'next'
import { useContext, useEffect, useState } from 'react'
import styles from './WorksPage.module.scss'
import { ContactLink } from '@/components/Link/ContactLink/ContactLink'
import { TagList } from '@/components/Tag/TagList/TagList'
import { WorkList } from '@/components/Work/WorkList/WorkList'
import { AppContext } from '@/contexts/AppContext'

const WorksPage: NextPageWithLayout = () => {
  const { works, tags } = useContext(AppContext)
  const [isLoading, setIsLoading] = useState(true)
  const [selectedTagID, setSelectedTagID] = useState('all')
  const handleSelectedID = (selectedTagID: string) => {
    setIsLoading(true)
    setTimeout(() => {
      setSelectedTagID(selectedTagID)
    }, 500)
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }
  useEffect(() => {
    setIsLoading(false)
  }, [])

  return (
    <>
      <TagList tags={tags} selectedTagID={selectedTagID} handleSelectedID={handleSelectedID} />
      <WorkList works={works} isLoading={isLoading} selectedTagID={selectedTagID} />
      <ContactLink />
    </>
  )
}

export default WorksPage
