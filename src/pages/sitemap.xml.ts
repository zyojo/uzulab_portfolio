import type { APIRoute } from 'astro'
import { getWorks } from '../lib/works'

export const GET: APIRoute = async ({ url }) => {
  const { works } = await getWorks()
  const urls: { path: string; lastmod?: Date }[] = [
    { path: '/' },
    { path: '/about' },
    { path: '/contact' },
    ...works.map(({ entry }) => ({ path: `/work/${entry.id}`, lastmod: entry.data.updatedAt })),
  ]
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    ({ path, lastmod }) =>
      `  <url><loc>${new URL(path, url.origin).href}</loc>${lastmod ? `<lastmod>${new Date(lastmod).toISOString()}</lastmod>` : ''}</url>`,
  )
  .join('\n')}
</urlset>`
  return new Response(body, { headers: { 'Content-Type': 'application/xml' } })
}
