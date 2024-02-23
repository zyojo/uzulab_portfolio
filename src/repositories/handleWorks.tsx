import { client } from '@/lib/client'

const fetchWorks = async () => {
  const res = await client.get({
    endpoint: 'works',
  })
  return res.contents
}

const fetchWork = async (contentId: string) => {
  const res = await client.get({
    endpoint: 'works',
    contentId,
  })
  return res
}

export { fetchWorks, fetchWork }
