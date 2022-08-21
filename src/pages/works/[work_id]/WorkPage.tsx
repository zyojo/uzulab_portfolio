import { useContext } from 'react'
import { AppContext } from '@/contexts/AppContext'
import { Work } from '@/types/Work'

type Props = {
  works: Work[]
}

export const WorkPage = (props: Props) => {
  const { works } = useContext(AppContext)
  return <>{works && works.map((item, index) => <div key={index}>{item.title.rendered}</div>)}</>
}
