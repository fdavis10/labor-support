import { AnimatedSection } from './AnimatedSection'
import { AlertCircle, ArrowDown, CheckCircle } from 'lucide-react'
import styles from './ProblemSolution.module.css'

const cards = [
  {
    problem: 'Вы тратите недели на поиск сотрудников. Вакансии висят месяцами, объекты простаивают.',
    solution: 'Мы закрываем массовые и точечные вакансии за 1–3 дня. У нас собственная база кандидатов, проверенных рекрутеров и доступ к региональным и международным рынкам труда.',
  },
  {
    problem: 'Вы переплачиваете налоги. Страховые взносы 30% съедают прибыль.',
    solution: 'Мы резидент СЭЗ. Страховые взносы 7,6%. Это законная экономия до 25% фонда оплаты труда.',
  },
  {
    problem: 'Вы боитесь потерять право на УСН из-за роста штата.',
    solution: 'Сотрудники оформлены у нас, работают у вас. Ваша среднесписочная численность не растёт, лимиты УСН не сгорают.',
  },
  {
    problem: 'Вы несёте риски: штрафы от Минтруда, проблемы с мигрантами и колоссальные штрафы, трудовые споры.',
    solution: 'Все юридические риски на нас. Мы оформляем сотрудников официально, ведём воинский учёт, контролируем патенты и миграционный учёт. Штрафы — наша ответственность.',
  },
  {
    problem: 'Вы тратите деньги на рекламу вакансий, кадровиков, бухгалтеров, юристов.',
    solution: 'Вам больше не нужен свой отдел кадров, бухгалтерия, юрист, служба безопасности. Мы делаем всю работу за вас.',
  },
  {
    problem: 'Вы не знаете, где взять сезонных рабочих, как их разместить, где взять инструмент.',
    solution: 'Мы организуем всё: переезд, проживание, инструмент, спецодежду. Вы получаете готовых людей под ключ.',
  },
  {
    problem: 'Вы устали от надоедливого и ленивого сотрудника и не знаете, как его уволить?',
    solution: 'Переведите его в наш штат — мы сами с ним справимся или заменим на более эффективного сотрудника.',
  },
]

export function ProblemSolution() {
  return (
    <AnimatedSection id="problems" className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.heading}>Какие задачи вашего бизнеса мы решаем</h2>
        <p className={styles.lead}>Проблема → Решение</p>
        <ul className={styles.grid}>
          {cards.map((card, i) => (
            <li key={i} className={styles.card}>
              <div className={styles.problemBlock}>
                <span className={styles.label}>
                  <AlertCircle className={styles.labelIcon} aria-hidden />
                  Проблема
                </span>
                <p className={styles.problemText}>{card.problem}</p>
              </div>
              <div className={styles.arrow} aria-hidden>
                <ArrowDown />
              </div>
              <div className={styles.solutionBlock}>
                <span className={styles.labelSolution}>
                  <CheckCircle className={styles.labelIcon} aria-hidden />
                  Решение
                </span>
                <p className={styles.solutionText}>{card.solution}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </AnimatedSection>
  )
}
