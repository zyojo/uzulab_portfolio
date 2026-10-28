// wrangler secret put で登録するシークレット（wrangler types は vars しか拾わないため補う）
declare namespace Cloudflare {
  interface Env {
    AWS_ACCESS_KEY_ID: string
    AWS_SECRET_ACCESS_KEY: string
    TURNSTILE_SECRET: string
  }
}
