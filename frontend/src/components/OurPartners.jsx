import { AnimatedSection } from './AnimatedSection'
import styles from './OurPartners.module.css'

const partners = [
  { name: 'Партнёр 1', logo: null },
  { name: 'Партнёр 2', logo: null },
  { name: 'Партнёр 3', logo: null },
  { name: 'Партнёр 4', logo: null },
  { name: 'Партнёр 5', logo: null },
  { name: 'Партнёр 6', logo: null },
]

function PartnerSlot({ name, logo }) {
  return (
    <div className={styles.slot}>
      {logo ? (
        <img src={logo} alt={name} className={styles.logoImg} />
      ) : (
        <span className={styles.placeholder}>{name}</span>
      )}
    </div>
  )
}

export function OurPartners() {
  const row = (
    <>
      {partners.map((p, i) => (
        <PartnerSlot key={`a-${i}`} name={p.name} logo={p.logo} />
      ))}
    </>
  )

  return (
    <AnimatedSection id="our-partners" className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.heading}>Наши партнёры</h2>
        <div className={styles.trackWrap}>
          <div className={styles.track}>
            {row}
            {row}
          </div>
        </div>
      </div>
    </AnimatedSection>
  )
}
