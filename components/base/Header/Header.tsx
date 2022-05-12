import Link from 'next/link'
import TernoaIcon from 'assets/svg/Components/TernoaIcon'
import styles from './Header.module.scss'
import NetworkPill from 'components/ui/NetworkPill'

interface HeaderProps {
  projectName: string
}

const Header: React.FC<HeaderProps> = ({ projectName }) => (
  <nav className={`wrapper ${styles.nav}`}>
    <Link href="/">
      <a className={styles.logo} title={`Ternoa ${projectName}`}>
        <TernoaIcon />
        <div className={styles.logoTitle}>{projectName}</div>
      </a>
    </Link>
    <NetworkPill />
  </nav>
)

export default Header
