import type { NextPageWithLayout } from 'next'
import { useContext, useEffect, useState } from 'react'
import styles from './ContactPage.module.scss'
import { AppContext } from '@/contexts/AppContext'
import { handleSubmit } from '@/repositories/handleSubmit'

const ContactPage: NextPageWithLayout = () => {
  const [form, setForm] = useState({
    name: '',
    company: '',
    customer_email: '',
    message: '',
  })
  const { isMobile } = useContext(AppContext)
  const [disabled, setDisabled] = useState(false)
  const [sent, setSent] = useState(false)
  const [filled, setFilled] = useState(false)

  useEffect(() => {
    form.name.length == 0 || form.customer_email.length == 0 || form.message.length == 0
      ? setFilled(false)
      : setFilled(true)
  }, [form.name, form.customer_email, form.message])

  return (
    <section className={styles.contact}>
      <h1 className={styles.contact_title}>お問い合わせ{sent && '完了'}</h1>
      {sent ? (
        <div className={styles.contact_complete}>
          お客様のメールアドレスに間違いがなければ、送信完了メールが届きます。
          {!isMobile && <br />}
          お問合せいただきありがとうございました。
        </div>
      ) : (
        <>
          <div className={styles.contact_desc}>
            ご相談・お問い合わせは以下のフォームからご連絡ください。
            {!isMobile && <br />}
            2～3営業日以内にメールにてご返信いたします。
          </div>
          <form className={styles.contact_form}>
            <div className={styles.contact_form_item}>
              <label className='avenir-bold' data-required={true}>
                Your Name
              </label>
              <input
                onChange={(e) => {
                  const val = e.currentTarget.value
                  setForm((props) => ({
                    ...props,
                    name: val !== null ? val : '',
                  }))
                }}
                value={form.name}
                name='name'
                type='text'
                className='feedback-input'
                placeholder='姓名'
                required={true}
              />
            </div>
            <div className={styles.contact_form_item}>
              <label className='avenir-bold'>Company Name</label>
              <input
                onChange={(e) => {
                  const val = e.currentTarget.value
                  setForm((props) => ({
                    ...props,
                    company: val !== null ? val : '',
                  }))
                }}
                name='company'
                type='text'
                className='feedback-input'
                placeholder='ウズラボ'
              />
            </div>
            <div className={styles.contact_form_item}>
              <label className='avenir-bold' data-required={true}>
                Email
              </label>
              <input
                onChange={(e) => {
                  const val = e.currentTarget.value
                  setForm((props) => ({
                    ...props,
                    customer_email: val !== null ? val : '',
                  }))
                }}
                name='customer_email'
                type='text'
                className='feedback-input'
                placeholder='example@uzulab.com'
                required={true}
              />
            </div>
            <div className={styles.contact_form_item}>
              <label className='avenir-bold' data-required={true}>
                Inquery
              </label>
              <textarea
                onChange={(e) => {
                  const val = e.currentTarget.value
                  setForm((props) => ({
                    ...props,
                    message: val !== null ? val : '',
                  }))
                }}
                name='text'
                rows={5}
                className='feedback-input'
                placeholder='ご要望、ご質問など、お気軽にお問い合わせください。'
                required={true}
              ></textarea>
              <input
                onClick={async (e) => {
                  setDisabled(true)
                  await handleSubmit(e, form)
                  setSent(true)
                }}
                className='avenir-bold'
                type='submit'
                value='Submit'
                disabled={!filled || disabled}
              />
            </div>
          </form>
        </>
      )}
    </section>
  )
}
export default ContactPage
