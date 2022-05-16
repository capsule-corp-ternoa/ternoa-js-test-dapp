import Link from 'next/link'
import mainStyles from '../MobileHeader.module.scss'
import styles from './SideMenu.module.scss'
import Close from 'assets/svg/Components/Close'
import MobileFooter from 'components/base/MobileFooter'
import Button, { AnchorButton } from 'components/ui/Button/Button'
import { ILinks, IWeb3Providers } from '../../interfaces'
import { useState } from 'react'
import Web3ProvidersModal from 'components/base/Modals/Web3ProvidersModal'

type ExpandedNominalSetState = React.Dispatch<React.SetStateAction<boolean>>

interface Props {
  ternoaLogo: React.ReactNode
  projectName: string
  isExpanded: boolean
  setIsExpanded: ExpandedNominalSetState
  links?: ILinks[]
  web3Providers?: IWeb3Providers[]
}

const SideMenu = ({ ternoaLogo, projectName, web3Providers, isExpanded, setIsExpanded, links }: Props) => {
  const [isWeb3ProvidersModalOpen, setIsWeb3ProvidersModalOpen] = useState<boolean>(false)
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
          {web3Providers && (
            <div className={styles.providers}>
              {web3Providers && (
                <Button
                  color="dark"
                  size="medium"
                  text="Connect Wallet"
                  variant="rounded"
                  onClick={() => setIsWeb3ProvidersModalOpen(!isWeb3ProvidersModalOpen)}
                />
              )}
            </div>
          )}
        </div>
        <MobileFooter projectName={projectName} isTopBorder={true} isSocials={true} />
      </div>
      {web3Providers && isWeb3ProvidersModalOpen && (
        <Web3ProvidersModal
          web3Providers={web3Providers}
          isOpen={isWeb3ProvidersModalOpen}
          closeModal={() => setIsWeb3ProvidersModalOpen(!isWeb3ProvidersModalOpen)}
        />
      )}
    </aside>
  )
}

export default SideMenu
