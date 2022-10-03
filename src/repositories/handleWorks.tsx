import { client } from '@/lib/client'

const handleWorks = async () => {
  return client.get({
    endpoint: 'works',
  })
}

export { handleWorks }
