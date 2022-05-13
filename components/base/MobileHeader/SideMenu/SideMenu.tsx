import Link from 'next/link'
import mainStyles from '../MobileHeader.module.scss'
import styles from './SideMenu.module.scss'
import Close from 'assets/svg/Components/Close'
import MobileFooter from 'components/base/MobileFooter'
import Button, { AnchorButton } from 'components/ui/Button/Button'

type ExpandedNominalSetState = React.Dispatch<React.SetStateAction<boolean>>

interface Props {
  ternoaLogo: any
  projectName: string
  isExpanded: boolean
  setIsExpanded: ExpandedNominalSetState
  links?: any[]
  isWeb3Providers?: any[]
}

const SideMenu = ({ ternoaLogo, projectName, isWeb3Providers, isExpanded, setIsExpanded, links }: Props) => {
  return (
    <aside className={`container ${styles.root} ${isExpanded && styles.expanded}`}>
      <div className={styles.radialGradientBg}>
        <div>
          <div className={`wrapper ${mainStyles.nav}`}>
            <Link href="/">
              <a className={mainStyles.logo} title={`Ternoa ${projectName}`}>
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
              {links.map(
                (
                  item: { src: string; text: string | undefined; title: string | undefined } // besoin de typer ou pas ? Any
                ) => (
                  <AnchorButton color="dark" href={item.src} size="medium" variant="rectangle" text={item.text} title={item.title} key={item.title} />
                )
              )}
            </div>
          )}
          {isWeb3Providers && (
            <div className={styles.providers}>
              {isWeb3Providers.map((item) => (
                <Button color={item.color} icon={item.icon} size={item.size} text={item.text} variant={item.variant} key={item.text} />
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
