import Link from 'next/link'
import mainStyles from '../MobileHeader.module.scss'
import styles from './SideMenu.module.scss'
import Close from 'assets/svg/Components/Close'
import MobileFooter from 'components/base/MobileFooter'
import Button, { AnchorButton } from 'components/ui/Button/Button'
import { ILinks } from '../../interfaces'
import { useState } from 'react'
import Polkadot from 'assets/svg/Providers/Polkadot'
import PolkadotModal from 'components/base/Modals/PolkadotModal'
import { useAppSelector } from 'redux/hooks'
import { middleEllipsis } from 'utils/strings'

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
          </div>
        </div>
        <MobileFooter projectName={projectName} isTopBorder={true} isSocials={true} />
      </div>
      {isPolkadotModalOpen && <PolkadotModal isOpen={isPolkadotModalOpen} closeModal={() => setIsPolkadotModalOpen(!isPolkadotModalOpen)} />}
    </aside>
  )
}

export default SideMenu
