import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Lock, LogIn } from 'lucide-react'
import { login, setToken } from './api'
import { ADMIN_PATH } from '../../config'
import styles from './Admin.module.css'

export function AdminLogin() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const token = await login(username.trim(), password)
      setToken(token)
      navigate(`/${ADMIN_PATH}`, { replace: true })
      window.location.reload()
    } catch (err) {
      setError(err.message || 'Ошибка входа')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.loginPage}>
      <div className={styles.loginCard}>
        <div className={styles.loginHeader}>
          <span className={styles.loginIcon}><Lock size={32} /></span>
          <h1 className={styles.loginTitle}>Вход в админку</h1>
          <p className={styles.loginSubtitle}>Трудовая Опора</p>
        </div>
        <form className={styles.loginForm} onSubmit={handleSubmit}>
          {error && <p className={styles.formError}>{error}</p>}
          <label className={styles.label}>
            <span className={styles.labelText}>Логин</span>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={styles.input}
              autoComplete="username"
              required
            />
          </label>
          <label className={styles.label}>
            <span className={styles.labelText}>Пароль</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.input}
              autoComplete="current-password"
              required
            />
          </label>
          <button type="submit" className={styles.primaryBtn} disabled={loading}>
            <LogIn size={18} />
            {loading ? 'Вход…' : 'Войти'}
          </button>
        </form>
      </div>
    </div>
  )
}
