// microCMS の書き出し（.migration/microcms/*.json）を EmDash の seed/seed.json の content に変換する。移行用の一時スクリプト
// usage: node scripts/microcms-export.mjs で書き出した後に node scripts/microcms-to-seed.mjs
import { readFile, writeFile } from 'node:fs/promises'

const SEED_PATH = 'seed/seed.json'
const DUMP_DIR = '.migration/microcms'

const works = JSON.parse(await readFile(`${DUMP_DIR}/works.json`, 'utf8'))
const tags = JSON.parse(await readFile(`${DUMP_DIR}/tags.json`, 'utf8'))
const seed = JSON.parse(await readFile(SEED_PATH, 'utf8'))

let keyCounter = 0
const key = () => `k${(keyCounter++).toString(36)}`

const decodeEntities = (s) =>
  s
    .replace(/&nbsp;/g, ' ')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&mdash;/g, '—')
    .replace(/&amp;/g, '&')
    .replace(/﻿/g, '')

const attr = (attrs, name) => attrs.match(new RegExp(`${name}="([^"]*)"`))?.[1]

const stripTags = (html) => decodeEntities(html.replace(/<br\s*\/?>/g, '\n').replace(/<[^>]+>/g, '')).trim()

const media = (url, alt) => ({
  $media: { url, alt, filename: decodeURIComponent(new URL(url).pathname.split('/').pop()) },
})

// <p> / <h2> の中身を Portable Text の span 列に変換する（a / strong / br のみ意味を持つ）
function inlineToChildren(html) {
  const children = []
  const markDefs = []
  const marks = []
  const tokenRe = /<(\/?)(a|strong|b|em|span|br)\b([^>]*)>|([^<]+)/g
  let m
  while ((m = tokenRe.exec(html))) {
    const [, closing, tag, attrs, text] = m
    if (text !== undefined) {
      const value = decodeEntities(text)
      if (value) children.push({ _type: 'span', _key: key(), text: value, marks: [...marks] })
    } else if (tag === 'br') {
      children.push({ _type: 'span', _key: key(), text: '\n', marks: [...marks] })
    } else if (tag === 'a') {
      if (closing) marks.pop()
      else {
        const href = decodeEntities(attr(attrs, 'href') ?? '').replace(/[?&]fbclid=[^&]*$/, '')
        let def = markDefs.find((d) => d.href === href)
        if (!def) markDefs.push((def = { _type: 'link', _key: key(), href, blank: true }))
        marks.push(def._key)
      }
    } else if (tag === 'strong' || tag === 'b' || tag === 'em') {
      const mark = tag === 'em' ? 'em' : 'strong'
      if (closing) marks.splice(marks.lastIndexOf(mark), 1)
      else marks.push(mark)
    }
    // span は装飾（色指定）のみなので無視する
  }
  // 同じ marks が続く span を結合する
  const merged = []
  for (const child of children) {
    const prev = merged.at(-1)
    if (prev && prev.marks.join() === child.marks.join()) prev.text += child.text
    else merged.push(child)
  }
  return { children: merged.filter((c) => c.text.trim() || c.text === '\n'), markDefs }
}

function richToBlocks(html) {
  const blocks = []
  for (const [, tag, inner] of html.matchAll(/<(h2|p)\b[^>]*>([\s\S]*?)<\/\1>/g)) {
    const { children, markDefs } = inlineToChildren(inner)
    if (!children.some((c) => c.text.trim())) continue
    blocks.push({ _type: 'block', _key: key(), style: tag === 'h2' ? 'h2' : 'normal', markDefs, children })
  }
  return blocks
}

// HTML 埋め込みブロック: 画像 / 画像の横並び(div) / 注記(small) / ツイート
function embedToBlocks(html, title) {
  if (html.includes('twitter-tweet')) {
    const blockquote = html.match(/<blockquote[\s\S]*?<\/blockquote>/)?.[0] ?? ''
    const url = blockquote.match(/href="(https:\/\/twitter\.com\/[^/"]+\/status\/\d+)[^"]*"/)?.[1]
    return [{ _type: 'embed', _key: key(), url, provider: 'twitter', html: blockquote }]
  }
  const blocks = []
  const image = (attrs) => {
    const src = attr(attrs, 'src')
    const alt = decodeEntities(attr(attrs, 'alt') ?? title)
    return { _type: 'image', _key: key(), asset: media(src, alt), alt }
  }
  const tokenRe = /<div\b[^>]*>([\s\S]*?)<\/div>|<img\b([^>]*)\/?>|<small\b[^>]*>([\s\S]*?)<\/small>/g
  for (const [, divInner, imgAttrs, small] of html.matchAll(tokenRe)) {
    if (divInner !== undefined) {
      const images = [...divInner.matchAll(/<img\b([^>]*)\/?>/g)].map(([, a]) => image(a))
      blocks.push({ _type: 'gallery', _key: key(), columns: images.length, images })
    } else if (imgAttrs !== undefined) {
      blocks.push(image(imgAttrs))
    } else if (small !== undefined) {
      // 直前の画像の注記はキャプションにする
      const prev = blocks.at(-1)
      if (prev?._type === 'image') prev.caption = stripTags(small)
      else blocks.push({ _type: 'block', _key: key(), style: 'normal', markDefs: [], children: [{ _type: 'span', _key: key(), text: stripTags(small), marks: ['em'] }] })
    }
  }
  return blocks
}

const toIso = (d) => (d ? new Date(d).toISOString() : undefined)

const projects = works.map((work, index) => ({
  id: `work-${work.urn}`,
  slug: work.urn,
  status: 'published',
  data: {
    title: work.title,
    featured_image: media(work.thumbnail.url, work.title),
    ...(work.header_pc && { header_pc: media(work.header_pc.url, work.title) }),
    ...(work.header_sp && { header_sp: media(work.header_sp.url, work.title) }),
    subtitle: work.summary_list,
    summary: stripTags(work.summary_top ?? ''),
    start_date: toIso(work.start_date),
    end_date: toIso(work.end_date),
    responsibility: work.responsibility?.trim(),
    url: work.url ?? undefined,
    sort_order: index + 1,
    content: work.contents.flatMap((c) => [
      ...(c.richEditor ? richToBlocks(c.richEditor) : []),
      ...(c.HTML ? embedToBlocks(c.HTML, work.title) : []),
    ]),
  },
  taxonomies: { tag: work.tags.map((t) => t.name) },
}))

seed.content = { projects }
const tagTaxonomy = seed.taxonomies.find((t) => t.name === 'tag')
tagTaxonomy.terms = tags.map((t) => ({ slug: t.name, label: t.name }))
// 旧 URL（/work/{microCMS の ID}）から新 URL（/work/{urn}）へ
seed.redirects = works.map((w) => ({ source: `/work/${w.id}`, destination: `/work/${w.urn}`, type: 301 }))

await writeFile(SEED_PATH, `${JSON.stringify(seed, null, '\t')}\n`)
console.log(`projects: ${projects.length}, terms: ${tagTaxonomy.terms.length}, redirects: ${seed.redirects.length}`)
