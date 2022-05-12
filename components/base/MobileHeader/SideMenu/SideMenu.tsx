import Link from 'next/link'
import TernoaIcon from 'assets/svg/Components/TernoaIcon'
import mainStyles from '../MobileHeader.module.scss'
import styles from './SideMenu.module.scss'
import Close from 'assets/svg/Components/Close'

type ExpandedNominalSetState = React.Dispatch<React.SetStateAction<boolean>>

interface Props {
  isExpanded: boolean
  setIsExpanded: ExpandedNominalSetState
}

const SideMenu = ({ isExpanded, setIsExpanded }: Props) => (
  <aside className={`container ${styles.root} ${isExpanded && styles.expanded}`}>
    <div className={styles.radialGradientBg}>
      <div>
        <div className={`wrapper ${mainStyles.nav}`}>
          <Link href="/">
            <a className={mainStyles.logo} title="Ternoa homepage">
              <TernoaIcon />
              <div className={mainStyles.logoTitle}>ternoa Toolkit</div>
            </a>
          </Link>
          <button onClick={() => setIsExpanded((prevState) => !prevState)} title="Close menu">
            <Close className={mainStyles.button} />
          </button>
        </div>
      </div>
    </div>
  </aside>
)

export default SideMenu
