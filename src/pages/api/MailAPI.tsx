import type { NextApiRequest, NextApiResponse } from 'next'
import { createTransport } from 'nodemailer'

const MailAPI = async (req: NextApiRequest, res: NextApiResponse) => {
  const transporter = createTransport({
    port: 465,
    host: 'smtp.gmail.com',
    secure: true,
    auth: {
      user: process.env.NEXT_PUBLIC_MAIL_USER,
      pass: process.env.NEXT_PUBLIC_MAIL_PASS,
    },
  })

  const data: {
    name: string
    company_name?: string
    customer_email: string
    message: string
  } = JSON.parse(req.body)
  const mailObj = (toEmail: string) => {
    return {
      from: process.env.NEXT_PUBLIC_MAIL_USER,
      to: toEmail,
      subject: 'お問い合わせありがとうございました。',
      text: `
  以下の内容でお問い合わせを受け付けました。
  通常、２〜３営業日以内にご返信いたします。
  
  
  Your Name
  ${data.name}
  
  Company Name
  ${data.company_name ? data.company_name : '記入なし'}
      
  Email
  ${data.customer_email}
      
  Inquiry
  ${data.message}
  
  
  ---
  
  uzulab 中原 良太
  info@ryotanakahara.jp
      `,
    }
  }
  await transporter.sendMail(mailObj(data.customer_email))
  process.env.NEXT_PUBLIC_MAIL_USER !== undefined &&
    (await transporter.sendMail(mailObj(process.env.NEXT_PUBLIC_MAIL_USER)))

  res.status(200).json({
    success: true,
  })
}
export default MailAPI
