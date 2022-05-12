import { useState } from 'react'
import Link from 'next/link'
import SideMenu from './SideMenu'
import TernoaIcon from 'assets/svg/Components/TernoaIcon'
import Hamburger from 'assets/svg/Components/Hamburger'
import styles from './MobileHeader.module.scss'

const MobileHeader: React.FC = () => {
  const [isMenuExpanded, setIsMenuExpanded] = useState<boolean>(false)
  return (
    <>
      <nav className={`wrapper ${styles.nav}`}>
        <Link href="/">
          <a className={styles.logo} title="Ternoa homepage">
            <TernoaIcon />
            <div className={styles.logoTitle}>ternoa Toolkit</div>
          </a>
        </Link>
        <button onClick={() => setIsMenuExpanded(!isMenuExpanded)} title="Open menu">
          <Hamburger className={styles.button} />
        </button>
      </nav>
      <SideMenu isExpanded={isMenuExpanded} setIsExpanded={setIsMenuExpanded} />
    </>
  )
}

export default MobileHeader
