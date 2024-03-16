import { MailType } from '@/types/Mail'

export const handleSubmit = async (e: React.FormEvent<HTMLInputElement>, data: MailType) => {
  e.preventDefault()

  await fetch('/api/MailAPI', {
    method: 'POST',
    body: JSON.stringify({
      name: data.name,
      company_name: data.company,
      customer_email: data.customer_email,
      message: data.message,
    }),
  })
    .then((res) => {
      console.log('Response received')
      if (res.status === 200) {
        console.log('Response succeeded!')
      } else {
        console.log(`Error: Status Code ${res.status}`)
      }
    })
    .catch((e) => {
      console.log(`Error: ${e}`)
    })
}
