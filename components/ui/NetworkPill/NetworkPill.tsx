import { toUpperCase } from 'utils/strings'
import Button from '../Button/Button'
import styles from './NetworkPill.module.scss'

const NetworkPill: React.FC = ({}) => {
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

  return <Button iconUnsized={indicator()} color="network" size="medium" text={network} variant="rounded" />
}
export default NetworkPill
