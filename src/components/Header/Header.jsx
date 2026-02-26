import styles from './Header.module.css'

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        Canvas <span>Studio</span>
      </div>
      <nav className={styles.nav}>
        <a href="#">Collections</a>
        <a href="#">Artisans</a>
        <a href="#">About</a>
        <a href="#">Shop</a>
      </nav>
    </header>
  )
}
