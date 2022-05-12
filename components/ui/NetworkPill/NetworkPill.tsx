import { toUpperCase } from 'utils/strings'
import styles from './NetworkPill.module.scss'

const NetworkPill: React.FC = () => {
  const network = process.env.NEXT_PUBLIC_TERNOA_WSS_CHAIN_ENDPOINT
    ? process.env.NEXT_PUBLIC_TERNOA_WSS_CHAIN_ENDPOINT.includes('alphanet')
      ? 'Alphanet'
      : process.env.NEXT_PUBLIC_TERNOA_WSS_CHAIN_ENDPOINT.includes('testnet')
      ? 'Testnet'
      : 'Mainnet'
    : process.env.NEXT_PUBLIC_ENV
    ? toUpperCase(process.env.NEXT_PUBLIC_ENV)
    : 'Mainnet'

  return (
    <a href="https://ternoa.com/" className={styles.networkPill} target="_blank" rel="noreferrer noopener">
      <div className={styles.connectIndicator}>
        <div className={`${styles.outterIndicator} ${styles[network]}`} />
        <div className={`${styles.innerIndicator} ${styles[network]}`} />
      </div>
      <small className={styles.networkEnv}>{network}</small>
    </a>
  )
}
export default NetworkPill
