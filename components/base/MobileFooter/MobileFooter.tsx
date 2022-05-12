import Discord from 'assets/svg/SocialMedia/Discord'
import Telegram from 'assets/svg/SocialMedia/Telegram'
import Twitter from 'assets/svg/SocialMedia/Twitter'
import Instagram from 'assets/svg/SocialMedia/Instagram'
import styles from './MobileFooter.module.scss'

export interface MobileFooterProps {
  projectName: string
  isTopBorder?: boolean
  isSocials?: boolean
  isCredentialCustom?: boolean
  islinks?: boolean
}

const MobileFooter: React.FC<MobileFooterProps> = ({ projectName, isTopBorder, isSocials, isCredentialCustom, islinks }) => {
  return (
    <footer className={`container ${styles.root}`}>
      <div className="wrapper">
        <div className={`${styles.layout} ${isTopBorder && styles.border}`}>
          {isSocials && (
            <div className={styles.socials}>
              <a href="https://discord.gg/cNZTGtGJNR" target="_blank" rel="noopener noreferrer" title="Ternoa Discord">
                <Discord className={styles.socialItem} />
              </a>
              <a href="https://t.me/ternoadiscussions" target="_blank" rel="noopener noreferrer" title="Ternoa Telegram">
                <Telegram className={styles.socialItem} />
              </a>
              <a href="https://twitter.com/ternoa_" target="_blank" rel="noopener noreferrer" title="Ternoa Twitter">
                <Twitter className={styles.socialItem} />
              </a>
              <a href="https://www.instagram.com/ternoa_/" target="_blank" rel="noopener noreferrer" title="Ternoa Instagram">
                <Instagram className={styles.socialItem} />
              </a>
            </div>
          )}
          <div className={styles.credentials}>
            <span className={`${styles.bold} ${isCredentialCustom && styles.gradiant}`}>
              {`© ${new Date().getFullYear()} `}
              <a href="https://www.ternoa.com/" target="_blank" rel="noreferrer noopener">
                Ternoa
              </a>{' '}
              {projectName}. All rights reserved.
            </span>
          </div>
          {islinks && (
            <div className={styles.linksWrapper}>
              <a
                className={styles.footerLink}
                href="https://ternoahelp.zendesk.com/hc/fr/articles/360019045538-Terms-of-Use"
                target="_blank"
                rel="noopener noreferrer"
                title="Terms"
              >
                Terms
              </a>
              <a
                className={styles.footerLink}
                href="https://ternoahelp.zendesk.com/hc/fr/articles/360018925097-Privacy-Policy"
                target="_blank"
                rel="noopener noreferrer"
                title="Privacy"
              >
                Privacy
              </a>
            </div>
          )}
        </div>
      </div>
    </footer>
  )
}

export default MobileFooter
