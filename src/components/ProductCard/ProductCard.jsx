import { useMemo } from 'react'
import { generateArtwork } from '../../utils/generateArtwork'
import styles from './ProductCard.module.css'

export default function ProductCard({ product, style, isActive, onClick }) {
  const imgSrc = useMemo(
    () => generateArtwork(product.pattern, product.color, product),
    [product.pattern, product.color, product]
  )

  return (
    <div
      className={`${styles.card} ${isActive ? styles.active : ''}`}
      style={style}
      onClick={onClick}
    >
      <div className={styles.inner}>
        <img src={imgSrc} alt={product.name} />
        <div className={styles.overlay} />
      </div>
    </div>
  )
}
