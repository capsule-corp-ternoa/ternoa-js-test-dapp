import Link from 'next/link'
import TernoaIcon from 'assets/svg/Components/TernoaIcon'
import mainStyles from '../MobileHeader.module.scss'
import styles from './SideMenu.module.scss'
import Close from 'assets/svg/Components/Close'
import MobileFooter from 'components/base/MobileFooter'
import { AnchorButton } from 'components/ui/Button/Button'

type ExpandedNominalSetState = React.Dispatch<React.SetStateAction<boolean>>

interface Props {
  projectName: string
  isExpanded: boolean
  setIsExpanded: ExpandedNominalSetState
  links?: any[]
}

const SideMenu = ({ projectName, isExpanded, setIsExpanded, links }: Props) => {
  return (
    <aside className={`container ${styles.root} ${isExpanded && styles.expanded}`}>
      <div className={styles.radialGradientBg}>
        <div>
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
          {links && (
            <div className={`wrapper ${styles.links}`}>
              {links.map((item: { src: string; text: string | undefined; title: string | undefined }) => (
                <AnchorButton color="dark" href={item.src} size="medium" variant="rectangle" text={item.text} title={item.title} key={item.title} />
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
