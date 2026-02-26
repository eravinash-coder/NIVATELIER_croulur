import interiorBg from './assets/interior_bg.png'
import Cursor from './components/Cursor/Cursor'
import Header from './components/Header/Header'
import Carousel from './components/Carousel/Carousel'
import styles from './App.module.css'

export default function App() {
  return (
    <div className={styles.app}>
      {/* Interior design background photo */}
      <div className={styles.bgPhoto} style={{ backgroundImage: `url(${interiorBg})` }} />

      {/* Dark vignette overlay to keep cards readable */}
      <div className={styles.bgOverlay} />

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
