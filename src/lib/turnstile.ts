import { env } from 'cloudflare:workers'

type SiteverifyResult = { success: boolean; action?: string; hostname?: string; 'error-codes'?: string[] }

/**
 * Cloudflare Turnstile のトークンを siteverify で検証する。
 * success に加えて action と、リクエストを受けたホスト名（本番・プレビュー・ローカルで自動的に変わる）が一致したときだけ通す。
 * siteverify に届かないなど判定できないときは通さない
 */
export async function verifyTurnstile(request: Request, token: unknown, action: string) {
  if (typeof token !== 'string' || token.length === 0 || token.length > 2048 || !env.TURNSTILE_SECRET) {
    return false
  }
  const body = new URLSearchParams({ secret: env.TURNSTILE_SECRET, response: token })
  const ip = request.headers.get('CF-Connecting-IP')
  if (ip) body.set('remoteip', ip)

  try {
    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body,
      signal: AbortSignal.timeout(10_000),
    })
    if (!res.ok) throw new Error(`siteverify ${res.status}`)
    const result = await res.json<SiteverifyResult>()
    const ok =
      result.success === true &&
      result.action === action &&
      result.hostname === new URL(request.url).hostname
    if (!ok) console.warn('turnstile rejected', result['error-codes'] ?? [], result.action, result.hostname)
    return ok
  } catch (error) {
    console.error('turnstile siteverify failed', error)
    return false
  }
}
