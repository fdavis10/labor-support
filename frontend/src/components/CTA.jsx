import { useState } from 'react'
import { AnimatedSection } from './AnimatedSection'
import styles from './CTA.module.css'

const API_BASE = import.meta.env.VITE_API_URL || ''

export function CTA() {
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [form, setForm] = useState({ name: '', phone: '', comment: '' })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      const res = await fetch(`${API_BASE}/api/leads/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name.trim(),
          phone: form.phone.trim(),
          comment: (form.comment || '').trim(),
        }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.detail || data.message || `Ошибка ${res.status}`)
      }
      setSent(true)
      setForm({ name: '', phone: '', comment: '' })
    } catch (err) {
      setError(err.message || 'Не удалось отправить заявку. Попробуйте позже.')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <AnimatedSection id="contact" className={styles.section}>
      <div className={styles.bgShape} aria-hidden />
      <div className={styles.wrap}>
        <div className={styles.content}>
          <span className={styles.eyebrow}>Свяжитесь с нами</span>
          <h2 className={styles.heading}>Оставьте заявку</h2>
          <p className={styles.text}>
            Опишите задачу — подберём специалистов и перезвоним в течение рабочего дня.
          </p>
          <div className={styles.contacts}>
            <a href="tel:+78001234567" className={styles.phone}>8 800 123-45-67</a>
            <span className={styles.hint}>Бесплатно по России</span>
          </div>
        </div>
        <div className={styles.formWrap}>
          {sent ? (
            <p className={styles.success}>
              Заявка отправлена. Мы свяжемся с вами в ближайшее время.
            </p>
          ) : (
            <form className={styles.form} onSubmit={handleSubmit}>
              {error && <p className={styles.error}>{error}</p>}
              <label className={styles.label}>
                <span className={styles.labelText}>Имя</span>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className={styles.input}
                  placeholder="Как к вам обращаться"
                  required
                  disabled={loading}
                />
              </label>
              <label className={styles.label}>
                <span className={styles.labelText}>Телефон</span>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  className={styles.input}
                  placeholder="+7 (___) ___-__-__"
                  required
                  disabled={loading}
                />
              </label>
              <label className={styles.label}>
                <span className={styles.labelText}>Задача или комментарий</span>
                <textarea
                  name="comment"
                  value={form.comment}
                  onChange={handleChange}
                  className={styles.textarea}
                  placeholder="Специализация, срок, объём работ..."
                  rows={3}
                  disabled={loading}
                />
              </label>
              <button type="submit" className={styles.submit} disabled={loading}>
                {loading ? 'Отправка…' : 'Отправить заявку'}
              </button>
            </form>
          )}
        </div>
      </div>
    </AnimatedSection>
  )
}
