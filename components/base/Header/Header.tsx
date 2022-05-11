import Link from 'next/link'
import TernoaIcon from 'assets/svg/Components/TernoaIcon'
import styles from './Header.module.scss'
import NetworkPill from 'components/ui/NetworkPill'

const Header: React.FC = () => (
  <nav className={`wrapper ${styles.nav}`}>
    <Link href="/">
      <a className={styles.logo} title="Ternoa homepage">
        <TernoaIcon />
        <div className={styles.logoTitle}>ternoa Toolkit</div>
      </a>
    </Link>
    <NetworkPill />
  </nav>
)

export default Header
