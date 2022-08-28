import { client } from '@/lib/client'

const handleTags = async () => {
  return client.get({
    endpoint: 'tags',
  })
}

export { handleTags }
