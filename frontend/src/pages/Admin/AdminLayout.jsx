import { useState, useEffect } from 'react'
import { Outlet, useNavigate, Link } from 'react-router-dom'
import { Newspaper, Users, User, LogOut } from 'lucide-react'
import { logout, fetchCurrentUser } from './api'
import { ADMIN_PATH } from '../../config'
import styles from './Admin.module.css'

export function AdminLayout() {
  const navigate = useNavigate()
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    let cancelled = false
    fetchCurrentUser()
      .then((data) => { if (!cancelled) setCurrentUser(data) })
      .catch(() => {})
    return () => { cancelled = true }
  }, [])

  const handleLogout = () => {
    logout()
    navigate(`/${ADMIN_PATH}/login`, { replace: true })
    window.location.reload()
  }

  return (
    <div className={styles.layout}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarBrand}>Трудовая Опора</div>
        <nav className={styles.sidebarNav}>
          <Link to={`/${ADMIN_PATH}`} className={styles.navLink}>
            <Newspaper size={20} />
            Новости
          </Link>
          {currentUser?.is_superuser && (
            <Link to={`/${ADMIN_PATH}/users`} className={styles.navLink}>
              <Users size={20} />
              Пользователи
            </Link>
          )}
          <Link to={`/${ADMIN_PATH}/profile`} className={styles.navLink}>
            <User size={20} />
            Профиль
          </Link>
        </nav>
        <div className={styles.sidebarFooter}>
          <button type="button" className={styles.logoutBtn} onClick={handleLogout}>
            <LogOut size={18} />
            Выход
          </button>
        </div>
      </aside>
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  )
}
