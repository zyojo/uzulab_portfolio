import { NextApiResponse } from 'next'
import { getAboutLink, getContactLink, getWorkLink } from '@/lib/getLinks'
import { fetchWorks } from '@/repositories/handleWorks'
import { WorkType } from '@/types/Work'

const homepage = 'https://ryotanakahara.jp'

function generateSiteMap(paths: string[]) {
  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>${homepage}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
      </url>
      <url>
        <loc>${homepage}${getAboutLink()}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
      </url>
      <url>
        <loc>${homepage}${getContactLink()}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
      </url>
      ${paths
        ?.map((path: string) => {
          return `
            <url>
              <loc>${homepage}${path}</loc>
              <lastmod>${new Date().toISOString()}</lastmod>
            </url>
          `
        })
        .join('')}
    </urlset>
  `
}

export async function getServerSideProps({ res }: { res: NextApiResponse }) {
  const posts = await fetchWorks()
  const paths = posts.map((item: WorkType) => getWorkLink(item.id))
  const sitemap = generateSiteMap(paths)

  res.setHeader('Content-Type', 'text/xml')
  res.write(sitemap)
  res.end()

  return {
    props: {},
  }
}

export default function SiteMap() {}
