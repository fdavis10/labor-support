import { AnimatedSection } from './AnimatedSection'
import { AnimatedItem } from './AnimatedItem'
import { Newspaper } from 'lucide-react'
import styles from './News.module.css'

const news = [
  {
    id: 1,
    date: '15 февраля 2025',
    title: 'Расширили направления работы',
    excerpt: 'Теперь предоставляем персонал для промышленных предприятий и логистических центров в новых регионах.',
  },
  {
    id: 2,
    date: '28 января 2025',
    title: 'Получена аккредитация ЧАЗ',
    excerpt: '«Трудовая Опора» прошла аккредитацию в Минтруде РФ как частное агентство занятости.',
  },
  {
    id: 3,
    date: '10 января 2025',
    title: 'Открытие офиса в Крыму',
    excerpt: 'Запускаем подбор персонала для строительных и инфраструктурных объектов в Республике Крым.',
  },
  {
    id: 4,
    date: '5 января 2025',
    title: 'Новые партнёры в ЛНР и ДНР',
    excerpt: 'Заключены договоры с подрядчиками в новых регионах. Готовы обеспечивать объекты рабочими бригадами.',
  },
  {
    id: 5,
    date: '20 декабря 2024',
    title: 'Релокация бригад из Узбекистана',
    excerpt: 'Запустили программу привлечения квалифицированных рабочих из стран СНГ с полным оформлением.',
  },
  {
    id: 6,
    date: '1 декабря 2024',
    title: 'Гарантия замены кандидатов',
    excerpt: 'Вводим бесплатную замену сотрудника в течение двух недель при несоответствии ожиданиям.',
  },
]

export function News() {
  return (
    <AnimatedSection id="news" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.head}>
          <span className={styles.eyebrow}>Новости</span>
          <h2 className={styles.heading}>Последние новости</h2>
        </div>
        <div className={styles.grid}>
          {news.map((item, i) => (
            <AnimatedItem key={item.id} as="article" delay={i * 80} className={styles.card}>
              <div className={styles.cardIcon}>
                <Newspaper size={24} strokeWidth={1.5} />
              </div>
              <time className={styles.cardDate} dateTime={item.date}>
                {item.date}
              </time>
              <h3 className={styles.cardTitle}>{item.title}</h3>
              <p className={styles.cardExcerpt}>{item.excerpt}</p>
            </AnimatedItem>
          ))}
        </div>
      </div>
    </AnimatedSection>
  )
}
