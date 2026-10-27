// microCMS (uzulab) の works / tags を JSON に書き出す。移行用の一時スクリプト
// usage: node --env-file=.env scripts/microcms-export.mjs
import { mkdir, writeFile } from 'node:fs/promises'

const SERVICE = 'uzulab'
const OUT_DIR = '.migration/microcms'
const apiKey = process.env.MICROCMS_API_KEY
if (!apiKey) throw new Error('MICROCMS_API_KEY is not set')

async function fetchAll(endpoint) {
  const items = []
  for (let offset = 0; ; offset += 100) {
    const res = await fetch(
      `https://${SERVICE}.microcms.io/api/v1/${endpoint}?limit=100&offset=${offset}`,
      { headers: { 'X-MICROCMS-API-KEY': apiKey } },
    )
    if (!res.ok) throw new Error(`${endpoint}: ${res.status} ${await res.text()}`)
    const json = await res.json()
    items.push(...json.contents)
    if (items.length >= json.totalCount) return items
  }
}

await mkdir(OUT_DIR, { recursive: true })
for (const endpoint of ['works', 'tags']) {
  const items = await fetchAll(endpoint)
  await writeFile(`${OUT_DIR}/${endpoint}.json`, JSON.stringify(items, null, 2))
  console.log(`${endpoint}: ${items.length}`)
}
