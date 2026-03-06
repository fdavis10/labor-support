import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, Pencil, Trash2, Newspaper } from 'lucide-react'
import { fetchNewsList, deleteNews } from './api'
import { ADMIN_PATH } from '../../config'
import styles from './Admin.module.css'

export function NewsList() {
  const navigate = useNavigate()
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [deletingId, setDeletingId] = useState(null)

  const load = async () => {
    setError('')
    setLoading(true)
    try {
      const data = await fetchNewsList()
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

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Удалить новость «${title}»?`)) return
    setDeletingId(id)
    try {
      await deleteNews(id)
      setList((prev) => prev.filter((item) => item.id !== id))
    } catch (e) {
      if (e.message === 'UNAUTHORIZED') {
        navigate(`/${ADMIN_PATH}/login`, { replace: true })
        return
      }
      alert(e.message || 'Ошибка удаления')
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Новости</h1>
        <button
          type="button"
          className={styles.primaryBtn}
          onClick={() => navigate(`/${ADMIN_PATH}/news/new`)}
        >
          <Plus size={18} />
          Добавить
        </button>
      </div>
      {error && <p className={styles.alertError}>{error}</p>}
      {loading && <p className={styles.alert}>Загрузка…</p>}
      {!loading && !error && list.length === 0 && (
        <div className={styles.empty}>
          <Newspaper size={48} className={styles.emptyIcon} />
          <p>Новостей пока нет</p>
          <button
            type="button"
            className={styles.primaryBtn}
            onClick={() => navigate(`/${ADMIN_PATH}/news/new`)}
          >
            Добавить первую
          </button>
        </div>
      )}
      {!loading && list.length > 0 && (
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Дата</th>
                <th>Заголовок</th>
                <th>Статус</th>
                <th className={styles.thActions}>Действия</th>
              </tr>
            </thead>
            <tbody>
              {list.map((item) => (
                <tr key={item.id}>
                  <td className={styles.tdDate}>{item.date}</td>
                  <td>{item.title}</td>
                  <td>
                    <span className={item.is_published ? styles.badgeOk : styles.badgeDraft}>
                      {item.is_published ? 'Опубликовано' : 'Черновик'}
                    </span>
                  </td>
                  <td className={styles.tdActions}>
                    <button
                      type="button"
                      className={styles.iconBtn}
                      onClick={() => navigate(`/${ADMIN_PATH}/news/${item.id}/edit`)}
                      title="Редактировать"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      type="button"
                      className={styles.iconBtnDanger}
                      onClick={() => handleDelete(item.id, item.title)}
                      disabled={deletingId === item.id}
                      title="Удалить"
                    >
                      <Trash2 size={16} />
                    </button>
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
