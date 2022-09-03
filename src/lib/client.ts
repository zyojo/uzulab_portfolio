import { createClient } from 'microcms-js-sdk'

export const client = createClient({
  serviceDomain: 'uzulab',
  apiKey: String(process.env.NEXT_PUBLIC_X_MICROCMS_API_KEY),
})
