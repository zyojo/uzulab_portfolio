import { useContext } from 'react'
import { AppContext } from '@/contexts/AppContext'

const WorkPage = () => {
  const { works, tags } = useContext(AppContext)
  return (
    <>
      {tags && tags.map((item, index) => <div key={index}>{item.name}</div>)}
      {works && works.map((item, index) => <div key={index}>{item.title.rendered}</div>)}
    </>
  )
}

export default WorkPage
