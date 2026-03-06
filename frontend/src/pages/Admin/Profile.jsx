import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { User, Lock, Save } from 'lucide-react'
import { fetchCurrentUser, updateProfile } from './api'
import { ADMIN_PATH } from '../../config'
import styles from './Admin.module.css'

export function Profile() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [form, setForm] = useState({
    username: '',
    current_password: '',
    new_password: '',
    new_password_confirm: '',
  })

  useEffect(() => {
    let cancelled = false
    async function load() {
      try {
        const data = await fetchCurrentUser()
        if (!cancelled) {
          setUser(data)
          setForm((f) => ({ ...f, username: data.username || '' }))
        }
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
  }, [navigate])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    setError('')
    setSuccess('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    if (form.new_password && form.new_password !== form.new_password_confirm) {
      setError('Новый пароль и подтверждение не совпадают')
      return
    }
    if (form.new_password && form.new_password.length < 8) {
      setError('Пароль должен быть не короче 8 символов')
      return
    }
    setSaving(true)
    try {
      const payload = { username: form.username.trim() }
      if (form.new_password) {
        payload.current_password = form.current_password
        payload.new_password = form.new_password
      }
      await updateProfile(payload)
      setSuccess('Изменения сохранены')
      setForm((f) => ({ ...f, current_password: '', new_password: '', new_password_confirm: '' }))
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
  if (!user) return null

  return (
    <div className={styles.page}>
      <h1 className={styles.pageTitle}>Профиль</h1>
      <p className={styles.profileSubtitle}>Смена логина и пароля</p>
      <form className={styles.form} onSubmit={handleSubmit}>
        {error && <p className={styles.formError}>{error}</p>}
        {success && <p className={styles.formSuccess}>{success}</p>}
        <label className={styles.label}>
          <span className={styles.labelText}><User size={16} /> Логин (никнейм)</span>
          <input
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
            className={styles.input}
            required
          />
        </label>
        <div className={styles.formDivider} />
        <span className={styles.labelText}><Lock size={16} /> Смена пароля</span>
        <label className={styles.label}>
          <span className={styles.labelText}>Текущий пароль</span>
          <input
            type="password"
            name="current_password"
            value={form.current_password}
            onChange={handleChange}
            className={styles.input}
            placeholder="Только если меняете пароль"
            autoComplete="current-password"
          />
        </label>
        <label className={styles.label}>
          <span className={styles.labelText}>Новый пароль</span>
          <input
            type="password"
            name="new_password"
            value={form.new_password}
            onChange={handleChange}
            className={styles.input}
            placeholder="Не менее 8 символов"
            autoComplete="new-password"
          />
        </label>
        <label className={styles.label}>
          <span className={styles.labelText}>Подтвердите новый пароль</span>
          <input
            type="password"
            name="new_password_confirm"
            value={form.new_password_confirm}
            onChange={handleChange}
            className={styles.input}
            autoComplete="new-password"
          />
        </label>
        <div className={styles.formActions}>
          <button type="submit" className={styles.primaryBtn} disabled={saving}>
            <Save size={18} />
            {saving ? 'Сохранение…' : 'Сохранить'}
          </button>
        </div>
      </form>
    </div>
  )
}
