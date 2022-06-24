import { useState } from 'react'
import Link from 'next/link'
import NetworkPill from 'components/ui/NetworkPill'
import Button from 'components/ui/Button/Button'
import PolkadotModal from '../Modals/PolkadotModal'
import { ILinks } from './interfaces'
import styles from './Header.module.scss'
import Polkadot from 'assets/svg/Providers/Polkadot'
import { useAppSelector } from 'redux/hooks'
import { middleEllipsis } from 'utils/strings'

interface HeaderProps {
  projectName: string
  ternoaLogo: React.ReactNode
  children?: React.ReactElement<any, string | React.JSXElementConstructor<any>> & React.ReactNode
  isNetworkPill?: boolean
  links?: ILinks[]
}

const Header: React.FC<HeaderProps> = ({ children, projectName, ternoaLogo, isNetworkPill, links }) => {
  const [isPolkadotModalOpen, setIsPolkadotModalOpen] = useState<boolean>(false)
  const { user } = useAppSelector((state) => state.user)

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
          {user && user.polkadotWallet ? (
            <Button
              color="dark"
              icon={<Polkadot />}
              size="small"
              text={user.polkadotWallet && middleEllipsis(user.polkadotWallet?.address)}
              variant="rounded"
              onClick={() => setIsPolkadotModalOpen(!isPolkadotModalOpen)}
            />
          ) : (
            <Button
              color="dark"
              icon={<Polkadot />}
              size="small"
              text="Connect"
              variant="rounded"
              onClick={() => setIsPolkadotModalOpen(!isPolkadotModalOpen)}
            />
          )}
          {isNetworkPill && <NetworkPill href={'https://status.ternoa.network/'} />}
        </div>
      </nav>
      {isPolkadotModalOpen && <PolkadotModal isOpen={isPolkadotModalOpen} closeModal={() => setIsPolkadotModalOpen(!isPolkadotModalOpen)} />}
    </>
  )
}

export default Header
