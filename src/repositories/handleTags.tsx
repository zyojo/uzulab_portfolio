import { client } from '@/lib/client'

const fetchTags = async () => {
  const res = await client.get({
    endpoint: 'tags',
  })
  return res.contents
}

export { fetchTags }
