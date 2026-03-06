import { useState, useEffect, useRef } from 'react'
import { Calculator as CalcIcon } from 'lucide-react'
import { Calculator } from './Calculator'
import styles from './CalculatorButton.module.css'

const TOOLTIP_DELAY_MS = 1500
const TOOLTIP_HIDE_AFTER_MS = 10000

let audioContextRef = null

function getAudioContext() {
  if (audioContextRef) return audioContextRef
  try {
    audioContextRef = new (window.AudioContext || window.webkitAudioContext)()
  } catch {
    return null
  }
  return audioContextRef
}

function playNotificationSound() {
  const ctx = getAudioContext()
  if (!ctx) return
  try {
    if (ctx.state === 'suspended') {
      ctx.resume().then(() => playTones(ctx)).catch(() => {})
      return
    }
    playTones(ctx)
  } catch {
    // звук недоступен
  }
}

function playTones(ctx) {
  const playTone = (freq, startTime, duration) => {
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.frequency.value = freq
    osc.type = 'sine'
    gain.gain.setValueAtTime(0.12, startTime)
    gain.gain.exponentialRampToValueAtTime(0.01, startTime + duration)
    osc.start(startTime)
    osc.stop(startTime + duration)
  }
  playTone(880, 0, 0.08)
  playTone(1100, 0.12, 0.1)
}

export function CalculatorButton() {
  const [modalOpen, setModalOpen] = useState(false)
  const [tooltipVisible, setTooltipVisible] = useState(false)
  const [tooltipDismissed, setTooltipDismissed] = useState(false)
  const [userInteracted, setUserInteracted] = useState(false)
  const tooltipScheduledRef = useRef(false)

  useEffect(() => {
    const ctx = getAudioContext()
    if (!ctx) return
    const onInteraction = () => {
      if (ctx.state === 'suspended') ctx.resume()
      setUserInteracted(true)
    }
    document.addEventListener('click', onInteraction, { once: true, passive: true })
    document.addEventListener('keydown', onInteraction, { once: true, passive: true })
    document.addEventListener('touchstart', onInteraction, { once: true, passive: true })
    document.addEventListener('scroll', onInteraction, { once: true, passive: true })
    return () => {
      document.removeEventListener('click', onInteraction)
      document.removeEventListener('keydown', onInteraction)
      document.removeEventListener('touchstart', onInteraction)
      document.removeEventListener('scroll', onInteraction)
    }
  }, [])

  useEffect(() => {
    if (tooltipDismissed || !userInteracted || tooltipScheduledRef.current) return
    tooltipScheduledRef.current = true
    const show = setTimeout(() => {
      setTooltipVisible(true)
      playNotificationSound()
    }, TOOLTIP_DELAY_MS)
    const hide = setTimeout(() => setTooltipVisible(false), TOOLTIP_DELAY_MS + TOOLTIP_HIDE_AFTER_MS)
    return () => {
      clearTimeout(show)
      clearTimeout(hide)
    }
  }, [tooltipDismissed, userInteracted])

  const openModal = () => {
    setTooltipVisible(false)
    setTooltipDismissed(true)
    setModalOpen(true)
  }

  return (
    <>
      <div className={styles.wrap}>
        {tooltipVisible && (
          <div className={styles.tooltip} role="status">
            Посчитайте экономию!
          </div>
        )}
        <button
          type="button"
          className={styles.btn}
          onClick={openModal}
          aria-label="Калькулятор экономии"
        >
          <CalcIcon className={styles.icon} size={24} strokeWidth={2} />
        </button>
      </div>

      {modalOpen && (
        <div
          className={styles.overlay}
          onClick={() => setModalOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="calculator-heading"
        >
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <Calculator inModal onClose={() => setModalOpen(false)} />
          </div>
        </div>
      )}
    </>
  )
}
