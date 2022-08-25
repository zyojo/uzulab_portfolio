import { fetchPosts } from './fetchPosts'

const handleTags = async () => {
  const apiUrl = 'https://ryotanakahara.jp/sys/?rest_route=/wp/v2/tags/'
  try {
    let data = await fetchPosts(apiUrl)
    return data.map((item: any) => {
      return { name: item.name, id: item.id }
    })
  } catch (error) {
    console.error(error)
  }
}

export { handleTags }
