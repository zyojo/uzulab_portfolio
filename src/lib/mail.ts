import { AwsClient } from 'aws4fetch'
import { env } from 'cloudflare:workers'

type Mail = { to: string; subject: string; text: string; replyTo?: string }

/** Amazon SES (v2 API) でテキストメールを送る */
export async function sendMail({ to, subject, text, replyTo }: Mail) {
  const aws = new AwsClient({
    accessKeyId: env.AWS_ACCESS_KEY_ID,
    secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
    region: env.AWS_REGION,
    service: 'ses',
  })
  const res = await aws.fetch(`https://email.${env.AWS_REGION}.amazonaws.com/v2/email/outbound-emails`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      FromEmailAddress: env.MAIL_FROM,
      Destination: { ToAddresses: [to] },
      ...(replyTo && { ReplyToAddresses: [replyTo] }),
      Content: {
        Simple: {
          Subject: { Data: subject, Charset: 'UTF-8' },
          Body: { Text: { Data: text, Charset: 'UTF-8' } },
        },
      },
    }),
  })
  if (!res.ok) throw new Error(`SES ${res.status}: ${await res.text()}`)
}
