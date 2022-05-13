import { useState } from 'react'
import Link from 'next/link'
import SideMenu from './SideMenu'
import Hamburger from 'assets/svg/Components/Hamburger'
import styles from './MobileHeader.module.scss'
import Navigation from 'assets/seeds/Navigation'

interface MobileHeaderProps {
  projectName: string
  ternoaLogo: any
}

const MobileHeader: React.FC<MobileHeaderProps> = ({ projectName, ternoaLogo }) => {
  const [isMenuExpanded, setIsMenuExpanded] = useState<boolean>(false)
  const { navItems, web3Providers } = Navigation()
  return (
    <>
      <nav className={`wrapper ${styles.nav}`}>
        <Link href="/">
          <a className={styles.logo} title={`Ternoa ${projectName}`}>
            {ternoaLogo}
            <div className={styles.logoTitle}>{projectName}</div>
          </a>
        </Link>
        <button onClick={() => setIsMenuExpanded(!isMenuExpanded)} title="Open menu">
          <Hamburger className={styles.button} />
        </button>
      </nav>

      <SideMenu
        ternoaLogo={ternoaLogo}
        projectName={projectName}
        isExpanded={isMenuExpanded}
        setIsExpanded={setIsMenuExpanded}
        isWeb3Providers={web3Providers}
        links={navItems}
      />
    </>
  )
}

export default MobileHeader
