import Cursor from './components/Cursor/Cursor'
import Header from './components/Header/Header'
import Carousel from './components/Carousel/Carousel'
import styles from './App.module.css'

export default function App() {
  return (
    <div className={styles.app}>
      {/* Ambient glow */}
      <div className={styles.glow} />

      {/* Grain overlay */}
      <div className={styles.grain} />

      <Cursor />
      <Header />
      <Carousel />
    </div>
  )
}
