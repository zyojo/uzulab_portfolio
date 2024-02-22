import { MailType } from '@/types/Mail'

export const handleSubmit = async (e: React.FormEvent<HTMLInputElement>, form: MailType) => {
  e.preventDefault()

  await fetch('/api/MailAPI', {
    method: 'POST',
    body: JSON.stringify({
      name: form.name,
      customer_email: form.customer_email,
      message: form.message,
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
