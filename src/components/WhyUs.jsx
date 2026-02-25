import { AnimatedSection } from './AnimatedSection'
import { AnimatedItem } from './AnimatedItem'
import styles from './WhyUs.module.css'

const items = [
  { title: 'Быстрый подбор', text: 'Подбор под срочные проекты за 24–48 часов.', icon: 'clock' },
  { title: 'Без оформления в штат', text: 'Специалист работает на вас, кадровые и налоговые вопросы — на нас.', icon: 'doc' },
  { title: 'Проверенные специалисты', text: 'Работаем с проверенными кандидатами и партнёрскими компаниями.', icon: 'check' },
  { title: 'Прозрачные условия', text: 'Чёткий расчёт, документооборот и отчётность в одном месте.', icon: 'list' },
  { title: 'Личный менеджер', text: 'Один контакт от заявки до завершения сотрудничества.', icon: 'person' },
  { title: 'Гибкие сроки', text: 'От краткосрочного проекта до долгосрочного контракта.', icon: 'calendar' },
]

const iconMap = {
  clock: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </svg>
  ),
  doc: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6" />
      <path d="M16 13H8" />
      <path d="M16 17H8" />
    </svg>
  ),
  check: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M20 6L9 17l-5-5" />
    </svg>
  ),
  list: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M8 6h13" />
      <path d="M8 12h13" />
      <path d="M8 18h13" />
      <path d="M3 6h.01" />
      <path d="M3 12h.01" />
      <path d="M3 18h.01" />
    </svg>
  ),
  person: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
  calendar: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <path d="M16 2v4" />
      <path d="M8 2v4" />
      <path d="M3 10h18" />
    </svg>
  ),
}

export function WhyUs() {
  return (
    <AnimatedSection id="why" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.head}>
          <span className={styles.eyebrow}>Преимущества</span>
          <h2 className={styles.heading}>Почему выбирают нас</h2>
          <p className={styles.lead}>
            Снижаем риски и издержки, ускоряем выход специалистов на проект.
          </p>
        </div>
        <ul className={styles.grid}>
          {items.map((item, i) => (
            <AnimatedItem key={item.title} as="li" delay={i * 70} className={styles.item}>
              <span className={styles.iconWrap}>{iconMap[item.icon]}</span>
              <h3 className={styles.itemTitle}>{item.title}</h3>
              <p className={styles.itemText}>{item.text}</p>
            </AnimatedItem>
          ))}
        </ul>
      </div>
    </AnimatedSection>
  )
}
