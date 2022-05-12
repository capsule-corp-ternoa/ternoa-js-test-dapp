import Link from 'next/link'
import TernoaIcon from 'assets/svg/Components/TernoaIcon'
import mainStyles from '../MobileHeader.module.scss'
import styles from './SideMenu.module.scss'
import Close from 'assets/svg/Components/Close'
import MobileFooter from 'components/base/MobileFooter'

type ExpandedNominalSetState = React.Dispatch<React.SetStateAction<boolean>>

interface Props {
  projectName: string
  isExpanded: boolean
  setIsExpanded: ExpandedNominalSetState
}

const SideMenu = ({ projectName, isExpanded, setIsExpanded }: Props) => (
  <aside className={`container ${styles.root} ${isExpanded && styles.expanded}`}>
    <div className={styles.radialGradientBg}>
      <div className={`wrapper ${mainStyles.nav}`}>
        <Link href="/">
          <a className={mainStyles.logo} title="Ternoa homepage">
            <TernoaIcon />
            <div className={mainStyles.logoTitle}>ternoa {projectName}</div>
          </a>
        </Link>
        <button onClick={() => setIsExpanded((prevState) => !prevState)} title="Close menu">
          <Close className={mainStyles.button} />
        </button>
      </div>

      <div className={`wrapper ${styles.footer}`}>
        <MobileFooter projectName={'Toolkit'} isTopBorder={true} isSocials={true} />
      </div>
    </div>
  </aside>
)

export default SideMenu
