import { useState } from 'react'
import { ContactLink } from '@/components/Link/ContactLink/ContactLink'
import { TagList } from '@/components/Tag/TagList/TagList'
import { WorkList } from '@/components/Work/WorkList/WorkList'
import { EMPTY_TAGS } from '@/lib/stub/dummyTags'
import { EMPTY_WORKS } from '@/lib/stub/dummyWorks'
import { fetchTags } from '@/repositories/handleTags'
import { fetchWorks } from '@/repositories/handleWorks'
import { TagType } from '@/types/Tag'
import { WorkType } from '@/types/Work'

export const getStaticProps = async () => {
  const worksData = await fetchWorks()
  const tagsData = await fetchTags()
  return { props: { works: worksData, tags: tagsData } }
}

const WorksPage = ({
  works = EMPTY_WORKS,
  tags = EMPTY_TAGS,
}: {
  works: WorkType[]
  tags: TagType[]
}) => {
  const [isLoading, setIsLoading] = useState(false)
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
