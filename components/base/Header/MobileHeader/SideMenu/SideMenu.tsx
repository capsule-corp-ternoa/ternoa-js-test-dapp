import { useState } from 'react'
import Link from 'next/link'
import { useAppSelector } from 'redux/hooks'
import dynamic from 'next/dynamic'
const Identicon = dynamic(() => import('@polkadot/react-identicon'), { ssr: false })

import { ILinks } from '../../interfaces'
import { middleEllipsis } from 'utils/strings'
import PolkadotModal from 'components/base/Modals/PolkadotModal'
import Close from 'assets/svg/Components/Close'
import MobileFooter from 'components/base/MobileFooter'
import Button, { AnchorButton } from 'components/ui/Button/Button'

import Polkadot from 'assets/svg/Providers/Polkadot'
import mainStyles from '../MobileHeader.module.scss'
import styles from './SideMenu.module.scss'
import NetworkPill from 'components/ui/NetworkPill'

type ExpandedNominalSetState = React.Dispatch<React.SetStateAction<boolean>>

interface Props {
  ternoaLogo: React.ReactNode
  projectName: string
  isExpanded: boolean
  setIsExpanded: ExpandedNominalSetState
  links?: ILinks[]
}

const SideMenu = ({ ternoaLogo, projectName, isExpanded, setIsExpanded, links }: Props) => {
  const [isPolkadotModalOpen, setIsPolkadotModalOpen] = useState<boolean>(false)
  const { user } = useAppSelector((state) => state.user)
  return (
    <aside className={`container ${styles.root} ${isExpanded && styles.expanded}`}>
      <div className={styles.radialGradientBg}>
        <div>
          <div className={`wrapper ${mainStyles.nav}`}>
            <Link href="/">
              <a className={mainStyles.logo} title={projectName}>
                {ternoaLogo}
                <div className={mainStyles.logoTitle}>{projectName}</div>
              </a>
            </Link>
            <button onClick={() => setIsExpanded((prevState) => !prevState)} title="Close menu">
              <Close className={mainStyles.button} />
            </button>
          </div>
          {links && (
            <div className={`wrapper ${styles.links}`}>
              {links.map((item) => (
                <AnchorButton color="dark" href={item.href} size="medium" variant="rectangle" text={item.label} title={item.label} key={item.label} />
              ))}
            </div>
          )}
          <div className={styles.provider}>
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
            <div className={styles.network}>
              <NetworkPill />
            </div>
          </div>
        </div>
        <MobileFooter projectName={projectName} isTopBorder={true} isSocials={true} />
      </div>
      {isPolkadotModalOpen && <PolkadotModal isOpen={isPolkadotModalOpen} closeModal={() => setIsPolkadotModalOpen(!isPolkadotModalOpen)} />}
    </aside>
  )
}

export default SideMenu
