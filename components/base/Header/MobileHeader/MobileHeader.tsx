import { useState } from 'react'
import Link from 'next/link'
import SideMenu from './SideMenu'
import Hamburger from 'assets/svg/Components/Hamburger'
import styles from './MobileHeader.module.scss'
import { ILinks } from '../interfaces'

interface MobileHeaderProps {
  projectName: string
  ternoaLogo: React.ReactNode
  links?: ILinks[]
}

const MobileHeader: React.FC<MobileHeaderProps> = ({ projectName, ternoaLogo, links }) => {
  const [isMenuExpanded, setIsMenuExpanded] = useState<boolean>(false)
  return (
    <>
      <nav className={`wrapper ${styles.nav}`}>
        <Link href="/">
          <a className={styles.logo} title={projectName}>
            {ternoaLogo}
            <div className={styles.logoTitle}>{projectName}</div>
          </a>
        </Link>
        <button onClick={() => setIsMenuExpanded(!isMenuExpanded)} title="Open menu">
          <Hamburger className={styles.button} />
        </button>
      </nav>

      <SideMenu ternoaLogo={ternoaLogo} projectName={projectName} isExpanded={isMenuExpanded} setIsExpanded={setIsMenuExpanded} links={links} />
    </>
  )
}

export default MobileHeader
