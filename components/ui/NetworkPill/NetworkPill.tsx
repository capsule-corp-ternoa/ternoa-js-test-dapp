import Button from '../Button/Button'
import styles from './NetworkPill.module.scss'

interface NetworkProps {
  wss?: string
  href?: string
}

const NetworkPill: React.FC<NetworkProps> = ({ wss, href }) => {
  const network = wss && wss.includes('alphanet') ? 'Alphanet' : wss && wss.includes('dev') ? 'dev-0' : 'Mainnet'

  const indicator = () => {
    return (
      <div className={styles.connectIndicator}>
        <div className={`${styles.outterIndicator} ${styles[network]}`} />
        <div className={`${styles.innerIndicator} ${styles[network]}`} />
      </div>
    )
  }

  return href ? (
    <a href={`${href}`} title={`Explore Ternoa ${network}`} target="_blank" rel="noopener noreferrer">
      <Button iconUnsized={indicator()} color="network" size="small" text={network} variant="rounded" />
    </a>
  ) : (
    <Button className={styles.pill} iconUnsized={indicator()} color="network" size="small" text={network} variant="rounded" />
  )
}
export default NetworkPill
