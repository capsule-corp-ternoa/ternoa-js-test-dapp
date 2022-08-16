import { initializeApi } from 'ternoa-js'

import { actions } from 'redux/app/actions'
import { useAppDispatch, useAppSelector } from 'redux/hooks'
import { ALPHANET_CHAIN_WSS, MAINNET_CHAIN_WSS } from 'utils/constants'

import Button from '../Button/Button'
import styles from './NetworkPill.module.scss'

const NetworkPill = () => {
  const { app } = useAppSelector((state) => state.app)
  const dispatch = useAppDispatch()
  const { wssEndpoint } = app
  const network = wssEndpoint && wssEndpoint.includes('mainnet') ? 'Mainnet' : 'Alphanet'

  const changeApiEndpoint = async () => {
    const newEndpoint = network === 'Mainnet' ? ALPHANET_CHAIN_WSS : MAINNET_CHAIN_WSS
    initializeApi(newEndpoint)
    dispatch(actions.setWssEndpoint(newEndpoint))
  }

  const indicator = () => {
    return (
      <div className={styles.connectIndicator}>
        <div className={`${styles.outterIndicator} ${styles[network]}`} />
        <div className={`${styles.innerIndicator} ${styles[network]}`} />
      </div>
    )
  }

  return <Button className={styles.pill} iconUnsized={indicator()} color="network" onClick={changeApiEndpoint} size="small" text={network} variant="rounded" />
}
export default NetworkPill
