import Link from 'next/link'
import styles from './Header.module.scss'
import NetworkPill from 'components/ui/NetworkPill'
import Button from 'components/ui/Button/Button'

interface HeaderProps {
  projectName: string
  ternoaLogo: any
  children?: React.ReactElement<any, string | React.JSXElementConstructor<any>> & React.ReactNode
  isNetworkPill?: boolean
  links?: any[]
  web3Providers?: any[]
}

const Header: React.FC<HeaderProps> = ({ children, projectName, ternoaLogo, isNetworkPill, links, web3Providers }) => (
  <nav className={`wrapper ${styles.nav}`}>
    <Link href="/">
      <a className={styles.logo} title={projectName}>
        {ternoaLogo}
        <div className={styles.logoTitle}>{projectName}</div>
      </a>
    </Link>
    <div className={styles.navItems}>
      {children}
      {links && (
        <ul className={styles.links}>
          {links?.map((item) => (
            <li key={item.label}>
              {item.src.charAt(0) === '/' ? (
                <Link href={item.src}>
                  <a title={item.label}>{item.label}</a>
                </Link>
              ) : (
                <a href={item.src} title={item.label} target="_blank" rel="noopener noreferrer" key={item.label}>
                  {item.label}
                </a>
              )}
            </li>
          ))}
        </ul>
      )}
      {web3Providers && <Button color="dark" size="small" text="Connect Wallet" variant="rounded" />}
      {isNetworkPill && <NetworkPill />}
    </div>
  </nav>
)

export default Header
