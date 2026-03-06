import { useState, useEffect } from 'react'
import { AnimatedSection } from './AnimatedSection'
import { AnimatedItem } from './AnimatedItem'
import { Newspaper } from 'lucide-react'
import styles from './News.module.css'

const API_BASE = import.meta.env.VITE_API_URL || ''


export function News() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false
    async function load() {
      try {
        const res = await fetch(`${API_BASE}/api/news/`)
        if (!res.ok) throw new Error('Не удалось загрузить новости')
        const data = await res.json()
        if (!cancelled) setItems(Array.isArray(data) ? data : [])
      } catch (e) {
        if (!cancelled) setError(e.message || 'Ошибка загрузки')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    load()
    return () => { cancelled = true }
  }, [])

  return (
    <AnimatedSection id="news" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.head}>
          <span className={styles.eyebrow}>Новости</span>
          <h2 className={styles.heading}>Последние новости</h2>
        </div>
        {loading && <p className={styles.status}>Загрузка…</p>}
        {error && <p className={styles.error}>{error}</p>}
        {!loading && !error && items.length === 0 && (
          <p className={styles.status}>Пока нет новостей.</p>
        )}
        {!loading && !error && items.length > 0 && (
          <div className={styles.grid}>
            {items.map((item, i) => (
              <AnimatedItem key={item.id} as="article" delay={i * 80} className={styles.card}>
                {item.image_url ? (
                  <div className={styles.cardImageWrap}>
                    <img src={item.image_url} alt="" className={styles.cardImage} />
                  </div>
                ) : (
                  <div className={styles.cardIcon}>
                    <Newspaper size={24} strokeWidth={1.5} />
                  </div>
                )}
                <time className={styles.cardDate} dateTime={item.date}>
                  {item.date}
                </time>
                <h3 className={styles.cardTitle}>{item.title}</h3>
                <p className={styles.cardExcerpt}>{item.excerpt}</p>
              </AnimatedItem>
            ))}
          </div>
        )}
      </div>
    </AnimatedSection>
  )
}
