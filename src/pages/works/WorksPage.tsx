import type { NextPageWithLayout } from 'next'
import { useContext, useEffect, useState } from 'react'
import styles from './WorksPage.module.scss'
import { ContactLink } from '@/components/Link/ContactLink/ContactLink'
import { TagList } from '@/components/Tag/TagList/TagList'
import { WorkList } from '@/components/Work/WorkList/WorkList'
import { AppContext } from '@/providers/AppContext'

const WorksPage: NextPageWithLayout = () => {
  const { works, tags } = useContext(AppContext)
  const [isLoading, setIsLoading] = useState(true)
  const [selectedTagID, setSelectedTagID] = useState('all')
  const handleSelectedID = (selectedTagID: string) => {
    setIsLoading(true)
    setTimeout(() => {
      setSelectedTagID(selectedTagID)
    }, 300)
    setTimeout(() => {
      setIsLoading(false)
    }, 800)
  }
  useEffect(() => {
    setIsLoading(false)
  }, [])

  return (
    <article>
      <section>
        <TagList tags={tags} selectedTagID={selectedTagID} handleSelectedID={handleSelectedID} />
      </section>
      <section>
        <WorkList works={works} isLoading={isLoading} selectedTagID={selectedTagID} />
      </section>
      <aside>
        <ContactLink />
      </aside>
    </article>
  )
}

export default WorksPage
