import type { APIRoute } from 'astro'
import { env } from 'cloudflare:workers'
import { sendMail } from '../../lib/mail'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const MAX_LENGTH = { name: 100, company: 100, customer_email: 254, message: 5000 }

const field = (form: FormData, name: keyof typeof MAX_LENGTH) =>
  String(form.get(name) ?? '').trim().slice(0, MAX_LENGTH[name])

export const POST: APIRoute = async ({ request }) => {
  const form = await request.formData().catch(() => null)
  if (!form) return Response.json({ success: false }, { status: 400 })

  // bot 対策のダミー項目。人間には見えないので、値が入っていたら送信したことにして捨てる
  if (form.get('website')) return Response.json({ success: true })

  const name = field(form, 'name')
  const company = field(form, 'company')
  const email = field(form, 'customer_email')
  const message = field(form, 'message')
  if (!name || !message || !EMAIL_PATTERN.test(email)) {
    return Response.json({ success: false }, { status: 400 })
  }

  const text = `
以下の内容でお問い合わせを受け付けました。
通常、２〜３営業日以内にご返信いたします。


Your Name
${name}

Company Name
${company || '記入なし'}

Email
${email}

Inquiry
${message}


---

uzulab 中原 良太
${env.MAIL_FROM}
`
  const subject = 'お問い合わせありがとうございました。'

  try {
    // お客様への控えと、自分への通知（返信先はお客様）
    await sendMail({ to: email, subject, text })
    await sendMail({ to: env.MAIL_TO, subject: `[uzulab] お問い合わせ: ${name}`, text, replyTo: email })
  } catch (error) {
    console.error('contact mail failed', error)
    return Response.json({ success: false }, { status: 502 })
  }
  return Response.json({ success: true })
}
