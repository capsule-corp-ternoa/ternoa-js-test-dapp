import Link from 'next/link'
import styles from './Header.module.scss'
import NetworkPill from 'components/ui/NetworkPill'

interface HeaderProps {
  projectName: string
  ternoaLogo: any
}

const Header: React.FC<HeaderProps> = ({ projectName, ternoaLogo }) => (
  <nav className={`wrapper ${styles.nav}`}>
    <Link href="/">
      <a className={styles.logo} title={`Ternoa ${projectName}`}>
        {ternoaLogo}
        <div className={styles.logoTitle}>{projectName}</div>
      </a>
    </Link>
    <NetworkPill />
  </nav>
)

export default Header
