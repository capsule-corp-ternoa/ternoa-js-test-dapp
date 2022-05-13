import Link from 'next/link'
import mainStyles from '../MobileHeader.module.scss'
import styles from './SideMenu.module.scss'
import Close from 'assets/svg/Components/Close'
import MobileFooter from 'components/base/MobileFooter'
import Button, { AnchorButton } from 'components/ui/Button/Button'
import { ILinks, IWeb3Providers } from '../../interfaces'

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
              {web3Providers.map(({ color, icon, size, text, variant }) => (
                <Button color={color} icon={icon} size={size} text={text} variant={variant} key={text} />
              ))}
            </div>
          )}
        </div>
        <MobileFooter projectName={projectName} isTopBorder={true} isSocials={true} />
      </div>
    </aside>
  )
}

export default SideMenu
