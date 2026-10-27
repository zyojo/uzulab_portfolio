import { getEmDashCollection, getTaxonomyTerms, getTermsForEntries } from 'emdash'

/** 全作品を表示順で取得し、各作品のタグを付けて返す（作品数は少ないので全件取得） */
export async function getWorks() {
  const result = await getEmDashCollection('projects', { orderBy: { sort_order: 'asc' } })
  if (result.error) return { error: result.error, works: [], cacheHint: result.cacheHint }

  const [tagsByEntry, allTags] = await Promise.all([
    getTermsForEntries(
      'projects',
      result.entries.map((entry) => entry.data.id),
      'tag',
    ),
    getTaxonomyTerms('tag'),
  ])
  // タグは絞り込みボタンと同じ並び（タクソノミーの登録順）にそろえる
  const tagOrder = allTags.map((t) => t.slug)
  const works = result.entries.map((entry) => ({
    entry,
    tags: (tagsByEntry.get(entry.data.id) ?? [])
      .map((t) => ({ slug: t.slug, label: t.label }))
      .sort((a, b) => tagOrder.indexOf(a.slug) - tagOrder.indexOf(b.slug)),
  }))
  return { error: null, works, cacheHint: result.cacheHint }
}

export type Work = Awaited<ReturnType<typeof getWorks>>['works'][number]
