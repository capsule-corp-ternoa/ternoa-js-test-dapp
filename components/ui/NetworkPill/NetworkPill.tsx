import { useAppSelector } from 'redux/hooks'

import Button from '../Button/Button'
import styles from './NetworkPill.module.scss'

interface NetworkProps {
  href?: string
}

const NetworkPill: React.FC<NetworkProps> = ({ href }) => {
  const { app } = useAppSelector((state) => state.app)
  const { wssEndpoint } = app
  const network = wssEndpoint && wssEndpoint.includes('mainnet') ? 'Mainnet' : wssEndpoint && wssEndpoint.includes('alphanet') ? 'Alphanet' : 'Dev'

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
