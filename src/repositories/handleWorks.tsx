import { fetchPosts } from './fetchPosts'
import { WorkType } from '@/types/Work'

const handleWorks = async (tagID = '') => {
  const apiUrl =
    'https://ryotanakahara.jp/sys/?rest_route=/wp/v2/posts' + (tagID !== '' ? '?tags=' + tagID : '')
  try {
    const data = await fetchPosts(apiUrl)
    // startMonthが新しい順に並び替え
    const alignedData = data.sort((a: WorkType, b: WorkType) => {
      if (a.ACF.work_start_month > b.ACF.work_start_month) {
        return -1
      } else {
        return 1
      }
    })
    return alignedData
  } catch (error) {
    console.error(error)
  }
}

export { handleWorks }
