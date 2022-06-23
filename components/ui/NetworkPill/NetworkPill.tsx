import { toUpperCase } from 'utils/strings'
import Button from '../Button/Button'
import styles from './NetworkPill.module.scss'

interface NetworkProps {
  href?: string
}

const NetworkPill: React.FC<NetworkProps> = ({ href }) => {
  const network = process.env.NEXT_PUBLIC_TERNOA_WSS_CHAIN_ENDPOINT
    ? process.env.NEXT_PUBLIC_TERNOA_WSS_CHAIN_ENDPOINT.includes('alphanet')
      ? 'Alphanet'
      : process.env.NEXT_PUBLIC_TERNOA_WSS_CHAIN_ENDPOINT.includes('testnet')
      ? 'Testnet'
      : 'Mainnet'
    : process.env.NEXT_PUBLIC_ENV
    ? toUpperCase(process.env.NEXT_PUBLIC_ENV)
    : 'Mainnet'

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
