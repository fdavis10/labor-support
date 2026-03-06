import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, Users } from 'lucide-react'
import { fetchUsersList, createUser } from './api'
import { ADMIN_PATH } from '../../config'
import styles from './Admin.module.css'

export function UserList() {
  const navigate = useNavigate()
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ username: '', password: '' })
  const [submitting, setSubmitting] = useState(false)

  const load = async () => {
    setError('')
    setLoading(true)
    try {
      const data = await fetchUsersList()
      setList(Array.isArray(data) ? data : [])
    } catch (e) {
      if (e.message === 'UNAUTHORIZED') {
        navigate(`/${ADMIN_PATH}/login`, { replace: true })
        return
      }
      if (e.message === 'FORBIDDEN') {
        setError('Доступ только для суперпользователя')
        setList([])
      } else {
        setError(e.message || 'Ошибка загрузки')
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.username.trim() || !form.password) {
      setError('Укажите логин и пароль')
      return
    }
    if (form.password.length < 8) {
      setError('Пароль не менее 8 символов')
      return
    }
    setError('')
    setSubmitting(true)
    try {
      await createUser(form.username.trim(), form.password)
      setForm({ username: '', password: '' })
      setShowForm(false)
      load()
    } catch (e) {
      if (e.message === 'UNAUTHORIZED') navigate(`/${ADMIN_PATH}/login`, { replace: true })
      else setError(e.message || 'Ошибка создания')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Пользователи</h1>
        <button
          type="button"
          className={styles.primaryBtn}
          onClick={() => { setShowForm(true); setError(''); setForm({ username: '', password: '' }); }}
        >
          <Plus size={18} />
          Добавить пользователя
        </button>
      </div>
      {error && <p className={styles.alertError}>{error}</p>}
      {showForm && (
        <form className={styles.form} onSubmit={handleSubmit} style={{ marginBottom: 24 }}>
          <h2 className={styles.formSectionTitle}>Новый пользователь</h2>
          <label className={styles.label}>
            <span className={styles.labelText}>Логин</span>
            <input
              type="text"
              value={form.username}
              onChange={(e) => setForm((f) => ({ ...f, username: e.target.value }))}
              className={styles.input}
              required
            />
          </label>
          <label className={styles.label}>
            <span className={styles.labelText}>Пароль (не менее 8 символов)</span>
            <input
              type="password"
              value={form.password}
              onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
              className={styles.input}
              required
              minLength={8}
            />
          </label>
          <div className={styles.formActions}>
            <button type="submit" className={styles.primaryBtn} disabled={submitting}>
              Создать
            </button>
            <button type="button" className={styles.secondaryBtn} onClick={() => setShowForm(false)}>
              Отмена
            </button>
          </div>
        </form>
      )}
      {loading && <p className={styles.alert}>Загрузка…</p>}
      {!loading && list.length === 0 && !error && (
        <div className={styles.empty}>
          <Users size={48} className={styles.emptyIcon} />
          <p>Нет пользователей</p>
        </div>
      )}
      {!loading && list.length > 0 && (
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Логин</th>
                <th>Роль</th>
              </tr>
            </thead>
            <tbody>
              {list.map((u) => (
                <tr key={u.id}>
                  <td>{u.id}</td>
                  <td>{u.username}</td>
                  <td>
                    {u.is_superuser ? (
                      <span className={styles.badgeSuper}>Суперпользователь</span>
                    ) : u.is_staff ? (
                      <span className={styles.badgeStaff}>Персонал</span>
                    ) : (
                      <span className={styles.badgeUser}>Пользователь</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
