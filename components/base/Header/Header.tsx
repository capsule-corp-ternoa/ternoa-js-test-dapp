import { useState } from 'react'
import Link from 'next/link'
import NetworkPill from 'components/ui/NetworkPill'
import Button from 'components/ui/Button/Button'
import Web3ProvidersModal from '../Modals/Web3ProvidersModal'
import { ILinks, IWeb3Providers } from './interfaces'
import styles from './Header.module.scss'

interface HeaderProps {
  projectName: string
  ternoaLogo: React.ReactNode
  children?: React.ReactElement<any, string | React.JSXElementConstructor<any>> & React.ReactNode
  isNetworkPill?: boolean
  links?: ILinks[]
  web3Providers?: IWeb3Providers[]
}

const Header: React.FC<HeaderProps> = ({ children, projectName, ternoaLogo, isNetworkPill, links, web3Providers }) => {
  const [isWeb3ProvidersModalOpen, setIsWeb3ProvidersModalOpen] = useState<boolean>(false)
  return (
    <>
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
                  {item.href.charAt(0) === '/' ? (
                    <Link href={item.href}>
                      <a title={item.label}>{item.label}</a>
                    </Link>
                  ) : (
                    <a href={item.href} title={item.label} target="_blank" rel="noopener noreferrer" key={item.label}>
                      {item.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          )}
          {web3Providers && (
            <Button color="dark" size="small" text="Connect Wallet" variant="rounded" onClick={() => setIsWeb3ProvidersModalOpen(!isWeb3ProvidersModalOpen)} />
          )}
          {isNetworkPill && <NetworkPill href={'https://status.ternoa.network/'} />}
        </div>
      </nav>
      {web3Providers && isWeb3ProvidersModalOpen && (
        <Web3ProvidersModal
          web3Providers={web3Providers}
          isOpen={isWeb3ProvidersModalOpen}
          closeModal={() => setIsWeb3ProvidersModalOpen(!isWeb3ProvidersModalOpen)}
        />
      )}
    </>
  )
}

export default Header
