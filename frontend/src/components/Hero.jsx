import styles from './Hero.module.css'

const stats = [
  { value: '12+', label: 'лет на рынке' },
  { value: '500+', label: 'компаний-клиентов' },
  { value: '1000+', label: 'специалистов в базе' },
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
          Персонал для вашего бизнеса —
          <span className={styles.titleAccent}> без оформления в штат</span>
        </h1>
        <p className={styles.subtitle}>
          IT, бухгалтерия, строительство, офис, логистика. Подключайте одного специалиста или команду на нужный срок. Договор — после того, как вы выбрали кандидата.
        </p>
        <div className={styles.actions}>
          <button type="button" className={styles.primaryBtn} onClick={scrollToContact}>
            Оставить заявку на подбор
          </button>
          <a href="#how" className={styles.secondaryBtn}>
            Как это работает
          </a>
        </div>
        <ul className={styles.stats} aria-label="Статистика">
          {stats.map(({ value, label }) => (
            <li key={label} className={styles.stat}>
              <span className={styles.statValue}>{value}</span>
              <span className={styles.statLabel}>{label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
