import type { NextPageWithLayout } from 'next'
import { FormEvent, useContext, useEffect, useState } from 'react'
import styles from './ContactPage.module.scss'
import { AppContext } from '@/providers/AppContext'
import { handleSubmit } from '@/repositories/handleSubmit'

const ContactPage: NextPageWithLayout = () => {
  const [form, setForm] = useState({
    name: '',
    company: '',
    customer_email: '',
    message: '',
  })
  const [error, setError] = useState({
    name: false,
    customer_email: false,
    message: false,
  })
  const { isMobile } = useContext(AppContext)
  const [disabled, setDisabled] = useState(true)
  const [sent, setSent] = useState(false)

  useEffect(() => {
    if (form.name === '' || form.customer_email === '' || form.message === '') {
      setDisabled(true)
      return
    }
    setDisabled(false)
  }, [form.name, form.customer_email, form.message])

  const initForm = () => {
    setForm({
      name: '',
      company: '',
      customer_email: '',
      message: '',
    })
  }

  const onChangeName = (e: FormEvent<HTMLInputElement>) => {
    const val = e.currentTarget.value
    setForm((props) => ({
      ...props,
      name: val ? val : '',
    }))
    setError((props) => ({
      ...props,
      name: val === '',
    }))
  }

  const onChangeCompany = (e: FormEvent<HTMLInputElement>) => {
    const val = e.currentTarget.value
    setForm((props) => ({
      ...props,
      company: val ? val : '',
    }))
  }

  const onChangeEmail = (e: FormEvent<HTMLInputElement>) => {
    const val = e.currentTarget.value
    setForm((props) => ({
      ...props,
      customer_email: val ? val : '',
    }))
    setError((props) => ({
      ...props,
      customer_email: !val.match(/.+@.+\..+/),
    }))
  }

  const onChangeMessage = (e: FormEvent<HTMLTextAreaElement>) => {
    const val = e.currentTarget.value
    setForm((props) => ({
      ...props,
      message: val ? val : '',
    }))
    setError((props) => ({
      ...props,
      message: val === '',
    }))
  }

  const onClickSubmit = async (e: FormEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (disabled) return
    if (window.confirm('お問い合わせを送信します。よろしいですか？')) {
      initForm()
      await handleSubmit(e, form)
      setSent(true)
    }
  }

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
              <label className='avenir-bold' data-required={true} htmlFor='name'>
                お名前
              </label>
              <input
                onChange={(e) => {
                  onChangeName(e)
                }}
                value={form.name}
                id='name'
                name='name'
                type='text'
                placeholder='姓名'
                required={true}
                data-error={error.name}
              />
              {error.name && (
                <div className={styles.contact_form_item_error}>お名前を入力してください。</div>
              )}
            </div>
            <div className={styles.contact_form_item}>
              <label className='avenir-bold' htmlFor='company'>
                お勤め先
              </label>
              <input
                onChange={(e) => {
                  onChangeCompany(e)
                }}
                id='company'
                name='company'
                type='text'
                placeholder='ウズラボ'
              />
            </div>
            <div className={styles.contact_form_item}>
              <label className='avenir-bold' data-required={true} htmlFor='customer_email'>
                メールアドレス
              </label>
              <input
                onChange={(e) => {
                  onChangeEmail(e)
                }}
                id='customer_email'
                name='customer_email'
                type='text'
                placeholder='uzulab@example.com'
                required={true}
                data-error={error.customer_email}
              />
              {error.customer_email && (
                <div className={styles.contact_form_item_error}>
                  正しいメールアドレスを入力してください。
                </div>
              )}
            </div>
            <div className={styles.contact_form_item}>
              <label className='avenir-bold' data-required={true} htmlFor='message'>
                お問い合わせ内容
              </label>
              <textarea
                onChange={(e) => {
                  onChangeMessage(e)
                }}
                id='message'
                name='message'
                rows={5}
                placeholder='ご要望、ご質問など、お気軽にお問い合わせください。'
                required={true}
                data-error={error.message}
              ></textarea>
              {error.message && (
                <div className={styles.contact_form_item_error}>
                  お問い合わせ内容を入力してください。
                </div>
              )}
              <input
                onClick={async (e) => {
                  onClickSubmit(e)
                }}
                className='avenir-bold'
                type='submit'
                value='送信する'
                disabled={disabled}
              />
            </div>
          </form>
        </>
      )}
    </section>
  )
}
export default ContactPage
