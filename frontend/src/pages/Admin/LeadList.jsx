import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Phone } from 'lucide-react'
import { fetchLeadsList } from './api'
import { ADMIN_PATH } from '../../config'
import styles from './Admin.module.css'

export function LeadList() {
  const navigate = useNavigate()
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const load = async () => {
    setError('')
    setLoading(true)
    try {
      const data = await fetchLeadsList()
      setList(Array.isArray(data) ? data : [])
    } catch (e) {
      if (e.message === 'UNAUTHORIZED') {
        localStorage.removeItem('admin_token')
        navigate(`/${ADMIN_PATH}/login`, { replace: true })
        return
      }
      setError(e.message || 'Ошибка загрузки')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Заявки на звонок</h1>
      </div>
      {error && <p className={styles.alertError}>{error}</p>}
      {loading && <p className={styles.alert}>Загрузка…</p>}
      {!loading && !error && list.length === 0 && (
        <div className={styles.empty}>
          <Phone size={48} className={styles.emptyIcon} />
          <p>Заявок пока нет</p>
        </div>
      )}
      {!loading && list.length > 0 && (
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Дата</th>
                <th>Имя</th>
                <th>Телефон</th>
                <th>Комментарий</th>
              </tr>
            </thead>
            <tbody>
              {list.map((item) => (
                <tr key={item.id}>
                  <td className={styles.tdDate}>{item.created_at}</td>
                  <td>{item.name}</td>
                  <td>
                    <a href={`tel:${item.phone}`} className={styles.phoneLink}>
                      {item.phone}
                    </a>
                  </td>
                  <td>{item.comment || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
