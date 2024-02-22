import { client } from '@/lib/client'

const fetchTags = async () => {
  const res = client.get({
    endpoint: 'tags',
  })
  return res
}

export { fetchTags }
