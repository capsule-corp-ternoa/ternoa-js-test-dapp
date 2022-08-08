import { useState } from 'react'
import Link from 'next/link'
import { useAppSelector } from 'redux/hooks'
import dynamic from 'next/dynamic'
const Identicon = dynamic(() => import('@polkadot/react-identicon'), { ssr: false })

import { ILinks } from './interfaces'
import { middleEllipsis } from 'utils/strings'
import PolkadotModal from '../Modals/PolkadotModal'
import NetworkPill from 'components/ui/NetworkPill'
import Button from 'components/ui/Button/Button'

import Polkadot from 'assets/svg/Providers/Polkadot'
import styles from './Header.module.scss'

interface HeaderProps {
  projectName: string
  ternoaLogo: React.ReactNode
  children?: React.ReactElement<any, string | React.JSXElementConstructor<any>> & React.ReactNode
  links?: ILinks[]
}

const Header: React.FC<HeaderProps> = ({ children, projectName, ternoaLogo, links }) => {
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
              icon={user.polkadotWallet && <Identicon value={user.polkadotWallet?.address} size={24} theme="polkadot" />}
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
          <NetworkPill />
        </div>
      </nav>
      <PolkadotModal isOpen={isPolkadotModalOpen} closeModal={() => setIsPolkadotModalOpen(!isPolkadotModalOpen)} />
    </>
  )
}

export default Header
