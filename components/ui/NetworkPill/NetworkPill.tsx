import { toUpperCase } from 'utils/strings'
import style from './NetworkPill.module.scss'

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
    <a href="https://ternoa.com/" className={style.networkPill} target="_blank" rel="noreferrer noopener">
      <div className={style.connectIndicator}>
        <div className={`${style.outterIndicator} ${style[network]}`} />
        <div className={`${style.innerIndicator} ${style[network]}`} />
      </div>
      <small className={style.networkEnv}>{network}</small>
    </a>
  )
}
export default NetworkPill
