import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Save, ArrowLeft } from 'lucide-react'
import { fetchNews, createNews, updateNews } from './api'
import { ADMIN_PATH } from '../../config'
import styles from './Admin.module.css'

function toInputDate(dt) {
  if (!dt) return ''
  const d = new Date(dt)
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

export function NewsForm() {
  const navigate = useNavigate()
  const { id } = useParams()
  const isEdit = id && id !== 'new'
  const [loading, setLoading] = useState(isEdit)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    title: '',
    excerpt: '',
    published_at: toInputDate(new Date()),
    is_published: true,
    image: null,
  })
  const [imagePreview, setImagePreview] = useState(null)

  useEffect(() => {
    if (!isEdit) return
    let cancelled = false
    async function load() {
      try {
        const data = await fetchNews(id)
        if (cancelled) return
        setForm({
          title: data.title || '',
          excerpt: data.excerpt || '',
          published_at: toInputDate(data.published_at) || toInputDate(new Date()),
          is_published: data.is_published !== false,
          image: null,
        })
        if (data.image_url) setImagePreview(data.image_url)
      } catch (e) {
        if (e.message === 'UNAUTHORIZED') {
          navigate(`/${ADMIN_PATH}/login`, { replace: true })
          return
        }
        setError(e.message || 'Ошибка загрузки')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    load()
    return () => { cancelled = true }
  }, [id, isEdit, navigate])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleImageChange = (e) => {
    const file = e.target.files?.[0]
    if (!file) {
      setForm((prev) => ({ ...prev, image: null }))
      setImagePreview(null)
      return
    }
    setForm((prev) => ({ ...prev, image: file }))
    setImagePreview(URL.createObjectURL(file))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSaving(true)
    try {
      if (form.image) {
        const fd = new FormData()
        fd.append('title', form.title)
        fd.append('excerpt', form.excerpt)
        fd.append('published_at', `${form.published_at}T12:00:00`)
        fd.append('is_published', form.is_published)
        fd.append('image', form.image)
        if (isEdit) {
          await updateNews(id, fd)
        } else {
          await createNews(fd)
        }
      } else {
        const payload = {
          title: form.title,
          excerpt: form.excerpt,
          published_at: `${form.published_at}T12:00:00`,
          is_published: form.is_published,
        }
        if (isEdit) {
          await updateNews(id, payload)
        } else {
          await createNews(payload)
        }
      }
      navigate(`/${ADMIN_PATH}`, { replace: true })
    } catch (e) {
      if (e.message === 'UNAUTHORIZED') {
        navigate(`/${ADMIN_PATH}/login`, { replace: true })
        return
      }
      setError(e.message || 'Ошибка сохранения')
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <div className={styles.page}><p className={styles.alert}>Загрузка…</p></div>

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <button
          type="button"
          className={styles.backBtn}
          onClick={() => navigate(`/${ADMIN_PATH}`)}
        >
          <ArrowLeft size={18} />
          Назад
        </button>
        <h1 className={styles.pageTitle}>{isEdit ? 'Редактировать новость' : 'Новая новость'}</h1>
      </div>
      <form className={styles.form} onSubmit={handleSubmit}>
        {error && <p className={styles.formError}>{error}</p>}
        <label className={styles.label}>
          <span className={styles.labelText}>Заголовок *</span>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            className={styles.input}
            required
          />
        </label>
        <label className={styles.label}>
          <span className={styles.labelText}>Краткое описание (анонс) *</span>
          <textarea
            name="excerpt"
            value={form.excerpt}
            onChange={handleChange}
            className={styles.textarea}
            rows={4}
            required
          />
        </label>
        <label className={styles.label}>
          <span className={styles.labelText}>Дата публикации *</span>
          <input
            type="date"
            name="published_at"
            value={form.published_at}
            onChange={handleChange}
            className={styles.input}
            required
          />
        </label>
        <label className={styles.checkLabel}>
          <input
            type="checkbox"
            name="is_published"
            checked={form.is_published}
            onChange={handleChange}
          />
          <span>Опубликовано (показывать на сайте)</span>
        </label>
        <label className={styles.label}>
          <span className={styles.labelText}>Изображение</span>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className={styles.fileInput}
          />
          {imagePreview && (
            <div className={styles.imagePreview}>
              <img src={imagePreview} alt="" />
            </div>
          )}
        </label>
        <div className={styles.formActions}>
          <button type="submit" className={styles.primaryBtn} disabled={saving}>
            <Save size={18} />
            {saving ? 'Сохранение…' : 'Сохранить'}
          </button>
          <button
            type="button"
            className={styles.secondaryBtn}
            onClick={() => navigate(`/${ADMIN_PATH}`)}
          >
            Отмена
          </button>
        </div>
      </form>
    </div>
  )
}
