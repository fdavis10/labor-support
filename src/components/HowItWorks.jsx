import { AnimatedSection } from './AnimatedSection'
import { AnimatedItem } from './AnimatedItem'
import styles from './HowItWorks.module.css'

const steps = [
  { num: '1', title: 'Оставьте заявку', text: 'Опишите задачу, специализацию и срок — или выберите кандидатов из каталога.' },
  { num: '2', title: 'Получите кандидатов', text: 'Персональный менеджер подберёт резюме и организует собеседования.' },
  { num: '3', title: 'Собеседование', text: 'Проводите интервью с понравившимися кандидатами при поддержке менеджера.' },
  { num: '4', title: 'Договор', text: 'Заключаете договор с нами уже после выбора специалиста.' },
  { num: '5', title: 'Работа', text: 'Специалист приступает к задачам. Контроль и отчётность — в личном кабинете.' },
]

export function HowItWorks() {
  return (
    <AnimatedSection id="how" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.head}>
          <span className={styles.eyebrow}>Процесс</span>
          <h2 className={styles.heading}>Как это работает</h2>
          <p className={styles.lead}>
            От заявки до выхода специалиста на проект — прозрачно и без лишних шагов.
          </p>
        </div>
        <ol className={styles.timeline}>
          {steps.map((step, i) => (
            <AnimatedItem key={step.num} as="li" delay={i * 100} className={styles.step}>
              <span className={styles.stepMarker}>
                <span className={styles.stepNum}>{step.num}</span>
              </span>
              <div className={styles.stepContent}>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepText}>{step.text}</p>
              </div>
            </AnimatedItem>
          ))}
        </ol>
      </div>
    </AnimatedSection>
  )
}
