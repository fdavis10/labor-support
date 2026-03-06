import { useState } from 'react'
import { Calculator as CalcIcon } from 'lucide-react'
import styles from './Calculator.module.css'

const RATE_CURRENT = 1.30   // зарплата + 30% взносы
const RATE_WITH_US = 1.076  // зарплата + 7.6% взносы

function formatRubles(value) {
  if (value >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(1).replace('.', ',')} млн ₽`
  }
  if (value >= 1_000) {
    return `${Math.round(value / 1_000)} тыс. ₽`
  }
  return `${Math.round(value)} ₽`
}

export function Calculator({ inModal = false, onClose }) {
  const [employees, setEmployees] = useState(50)
  const [salary, setSalary] = useState(50000)

  const currentExpenses = employees * salary * RATE_CURRENT
  const expensesWithUs = employees * salary * RATE_WITH_US
  const savings = currentExpenses - expensesWithUs

  const content = (
    <div className={styles.container}>
        <div className={styles.head}>
          <span className={styles.iconWrap}><CalcIcon size={28} strokeWidth={2} /></span>
          <span className={styles.eyebrow}>Калькулятор экономии</span>
          <h2 id="calculator-heading" className={styles.heading}>Посчитайте экономию на взносах</h2>
          <p className={styles.lead}>
            Текущие расходы = количество сотрудников × зарплата × (30% взносы). С нами — 7,6% взносы в СЭЗ.
          </p>
        </div>
        <div className={styles.calc}>
          <div className={styles.inputs}>
            <label className={styles.label}>
              <span className={styles.labelText}>Количество сотрудников</span>
              <input
                type="number"
                min={1}
                max={10000}
                value={employees}
                onChange={(e) => setEmployees(Number(e.target.value) || 0)}
                className={styles.input}
              />
            </label>
            <label className={styles.label}>
              <span className={styles.labelText}>Средняя зарплата в месяц, ₽</span>
              <input
                type="number"
                min={0}
                step={5000}
                value={salary}
                onChange={(e) => setSalary(Number(e.target.value) || 0)}
                className={styles.input}
              />
            </label>
          </div>
          <div className={styles.results}>
            <div className={styles.resultRow}>
              <span className={styles.resultLabel}>Текущие расходы в месяц</span>
              <span className={styles.resultValue}>{formatRubles(currentExpenses)}</span>
            </div>
            <div className={styles.resultRow}>
              <span className={styles.resultLabel}>Расходы с нами в месяц</span>
              <span className={styles.resultValue}>{formatRubles(expensesWithUs)}</span>
            </div>
            <div className={`${styles.resultRow} ${styles.resultRowHighlight}`}>
              <span className={styles.resultLabel}>Экономия в месяц</span>
              <span className={styles.resultValue}>{formatRubles(savings)}</span>
            </div>
            <p className={styles.resultNote}>
              Экономия в год: <strong>{formatRubles(savings * 12)}</strong>
            </p>
          </div>
        </div>
      </div>
  )

  if (inModal) {
    return (
      <div className={styles.modalInner}>
        {onClose && (
          <button type="button" className={styles.closeBtn} onClick={onClose} aria-label="Закрыть">
            ×
          </button>
        )}
        {content}
      </div>
    )
  }

  return (
    <section id="calculator" className={styles.section}>
      {content}
    </section>
  )
}
