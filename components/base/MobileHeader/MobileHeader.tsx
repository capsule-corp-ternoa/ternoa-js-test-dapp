import { useState } from 'react'
import Link from 'next/link'
import SideMenu from './SideMenu'
import TernoaIcon from 'assets/svg/Components/TernoaIcon'
import Hamburger from 'assets/svg/Components/Hamburger'
import styles from './MobileHeader.module.scss'
import Navigation from 'assets/seeds/Navigation'

interface MobileHeaderProps {
  projectName: string
}

const MobileHeader: React.FC<MobileHeaderProps> = ({ projectName }) => {
  const [isMenuExpanded, setIsMenuExpanded] = useState<boolean>(false)
  const { navItems } = Navigation()
  return (
    <>
      <nav className={`wrapper ${styles.nav}`}>
        <Link href="/">
          <a className={styles.logo} title="Ternoa homepage">
            <TernoaIcon />
            <div className={styles.logoTitle}>{projectName}</div>
          </a>
        </Link>
        <button onClick={() => setIsMenuExpanded(!isMenuExpanded)} title="Open menu">
          <Hamburger className={styles.button} />
        </button>
      </nav>
      <SideMenu projectName={projectName} isExpanded={isMenuExpanded} setIsExpanded={setIsMenuExpanded} links={navItems} />
    </>
  )
}

export default MobileHeader
