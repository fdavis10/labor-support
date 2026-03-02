import { AnimatedSection } from './AnimatedSection'
import styles from './Vacancies.module.css'

export function Vacancies() {
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <AnimatedSection id="workers" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.content}>
          <span className={styles.eyebrow}>Вакансии (для соискателей)</span>
          <h2 className={styles.heading}>
            Хотите стабильный заработок? Ищем рабочих на объекты
          </h2>
          <p className={styles.text}>
            Работа вахтой в новых регионах, Крыму и других областях РФ. Проживание и проезд оплачиваем.
          </p>
          <button type="button" className={styles.primaryBtn} onClick={scrollToContact}>
            Заполнить анкету
          </button>
          <p className={styles.note}>
            Можно бригадой. Если работаете с друзьями — приходите вместе. Пишите, расскажем условия.
          </p>
        </div>
      </div>
    </AnimatedSection>
  )
}
