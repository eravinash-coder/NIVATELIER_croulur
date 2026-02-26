import { useState, useEffect, useRef, useCallback } from 'react'
import ProductCard from '../ProductCard/ProductCard'
import { products } from '../../data/products'
import styles from './Carousel.module.css'

const TOTAL = products.length
const VISIBLE = 7
const RADIUS = 500
const ANGLE_SPREAD = Math.PI * 0.45

function getCardStyle(index, current) {
  const offset = ((index - current + TOTAL) % TOTAL)
  const normalOffset = offset > TOTAL / 2 ? offset - TOTAL : offset

  if (Math.abs(normalOffset) > Math.floor(VISIBLE / 2)) {
    return { opacity: 0, pointerEvents: 'none', zIndex: 0, left: '-9999px', top: '-9999px' }
  }

  const t = normalOffset / Math.floor(VISIBLE / 2)
  const angle = -Math.PI / 2 + t * ANGLE_SPREAD

  const centerX = 450 // half of 900px wrapper
  const centerY = 700 // below the wrapper (creates the arc)

  const x = centerX + RADIUS * Math.cos(angle) - 100
  const y = centerY + RADIUS * Math.sin(angle) - 260

  const rotDeg = (t * ANGLE_SPREAD * 180 / Math.PI) * 0.6
  const scale = 1 - Math.abs(t) * 0.28
  const zIndex = 10 - Math.abs(normalOffset)
  const opacity = 1 - Math.abs(t) * 0.5

  return {
    left: x + 'px',
    top: y + 'px',
    transform: `rotate(${rotDeg}deg) scale(${scale})`,
    opacity,
    zIndex,
    pointerEvents: 'auto',
  }
}

export default function Carousel() {
  const [current, setCurrent] = useState(0)
  const [transitioning, setTransitioning] = useState(false)
  const dragStart = useRef(null)
  const timerRef = useRef(null)

  const goTo = useCallback((index) => {
    if (transitioning) return
    const next = ((index % TOTAL) + TOTAL) % TOTAL
    if (next === current) return
    setTransitioning(true)
    setCurrent(next)
    setTimeout(() => setTransitioning(false), 700)
  }, [current, transitioning])

  const prev = useCallback(() => goTo(current - 1), [current, goTo])
  const next = useCallback(() => goTo(current + 1), [current, goTo])

  // Keyboard
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [prev, next])

  // Drag
  useEffect(() => {
    const onDown = (e) => { dragStart.current = e.clientX }
    const onUp = (e) => {
      if (dragStart.current === null) return
      const diff = dragStart.current - e.clientX
      if (Math.abs(diff) > 50) diff > 0 ? next() : prev()
      dragStart.current = null
    }
    const onTouchStart = (e) => { dragStart.current = e.touches[0].clientX }
    const onTouchEnd = (e) => {
      if (dragStart.current === null) return
      const diff = dragStart.current - e.changedTouches[0].clientX
      if (Math.abs(diff) > 40) diff > 0 ? next() : prev()
      dragStart.current = null
    }
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)
    window.addEventListener('touchstart', onTouchStart)
    window.addEventListener('touchend', onTouchEnd)
    return () => {
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchend', onTouchEnd)
    }
  }, [prev, next])

  // Auto-play
  useEffect(() => {
    timerRef.current = setInterval(() => next(), 3200)
    return () => clearInterval(timerRef.current)
  }, [next])

  const p = products[current]

  return (
    <div className={styles.scene}>
      <div className={styles.wrapper}>
        {products.map((product, i) => (
          <ProductCard
            key={product.id}
            product={product}
            style={getCardStyle(i, current)}
            isActive={i === current}
            onClick={() => goTo(i)}
          />
        ))}
      </div>

      <div className={`${styles.info} ${transitioning ? styles.hidden : ''}`}>
        <div className={styles.tag}>{p.tag}</div>
        <div className={styles.name}>{p.name}</div>
        <div className={styles.desc}>{p.desc}</div>
        <div className={styles.price}>{p.price}</div>
      </div>

      <button className={`${styles.navBtn} ${styles.left}`} onClick={prev}>←</button>
      <button className={`${styles.navBtn} ${styles.right}`} onClick={next}>→</button>

      <div className={styles.dots}>
        {products.map((_, i) => (
          <div
            key={i}
            className={`${styles.dot} ${i === current ? styles.dotActive : ''}`}
            onClick={() => goTo(i)}
          />
        ))}
      </div>

      <div className={styles.hint}>drag or use arrows</div>
    </div>
  )
}
