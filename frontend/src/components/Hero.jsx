import { Building2, Building, Users } from 'lucide-react'
import styles from './Hero.module.css'

const stats = [
  { value: '12+', label: 'лет на рынке', icon: Building2 },
  { value: '500+', label: 'компаний-клиентов', icon: Building },
  { value: '1000+', label: 'специалистов в базе', icon: Users },
]

export function Hero() {
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="hero" className={styles.hero}>
      <div className={styles.bgWrap}>
        <img
          src="/images/hero.svg"
          alt=""
          className={styles.bgImage}
        />
        <div className={styles.overlay} />
        <div className={styles.grain} aria-hidden />
      </div>
      <div className={styles.content}>
        <p className={styles.kicker}>Аутстаффинг персонала</p>
        <h1 className={styles.title}>
          Кадры для стройки, промышленности и логистики по всей России
        </h1>
        <p className={styles.subtitle}>
          Предоставляем квалифицированных рабочих на ваши объекты. Работаем официально, закрываем потребность в персонале от 1 дня.
        </p>
        <div className={styles.actions}>
          <button type="button" className={styles.primaryBtn} onClick={scrollToContact}>
            Подобрать персонал
          </button>
          <a href="#partners" className={styles.secondaryBtn}>
            Стать партнёром
          </a>
          <a href="#workers" className={styles.secondaryBtn}>
            Работникам
          </a>
        </div>
        <ul className={styles.stats} aria-label="Статистика">
          {stats.map(({ value, label, icon: Icon }) => (
            <li key={label} className={styles.stat}>
              {Icon && <span className={styles.statIcon}><Icon size={24} strokeWidth={2} /></span>}
              <span className={styles.statValue}>{value}</span>
              <span className={styles.statLabel}>{label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
