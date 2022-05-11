import ArrowRight from 'assets/svg/Components/ArrowRight'
import Discord from 'assets/svg/SocialMedia/Discord'
import Telegram from 'assets/svg/SocialMedia/Telegram'
import Twitter from 'assets/svg/SocialMedia/Twitter'
import Instagram from 'assets/svg/SocialMedia/Instagram'
import styles from './Footer.module.scss'

const Footer: React.FC = () => {
  const projectName = 'toolkit' //must be completed
  return (
    <footer className={`container ${styles.root}`}>
      <div className="wrapper">
        <div className={styles.top}>
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
          <a className={styles.link} href="https://www.ternoa.com" target="_blank" rel="noopener noreferrer" title="Ternoa official website">
            Ternoa.com
            <ArrowRight />
          </a>
        </div>

        <div className={styles.bottom}>
          <div className={styles.credentials}>
            <span>{`© ${new Date().getFullYear()} Ternoa ${projectName}. Developed by `}</span>
            <a href="https://www.ternoa.com/" target="_blank" rel="noreferrer noopener">
              ternoa.com
            </a>
            <span>. All rights reserved.</span>
          </div>
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
        </div>
      </div>
    </footer>
  )
}

export default Footer
