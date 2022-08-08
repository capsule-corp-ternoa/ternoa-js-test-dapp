import type { ISubmittableResult } from '@polkadot/types/types'
import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { getRawApi } from 'ternoa-js'
import QRCode from 'qrcode.react'

import Polkadot from 'assets/svg/Providers/Polkadot'
import ClipboardCopy from 'components/ui/ClipboardCopy'
import PingpongLoader from 'components/ui/Loader/PingpongLoader'
import Button from 'components/ui/Button/Button'
import Modal from 'components/ui/Modal'
import { runTx, signTx } from 'helpers/ternoa'
import { DecodedMethodType, MethodType } from 'interfaces'
import { useAppSelector } from 'redux/hooks'
import { middleEllipsis } from 'utils/strings'
import { TxTranslations } from 'utils/txTranslate'

import PolkadotModal from '../PolkadotModal'
import styles from './SigningModal.module.scss'

const Identicon = dynamic(() => import('@polkadot/react-identicon'), { ssr: false })

export interface SigningModalProps {
  handleClose: () => void
  isOpen: boolean
  submittableCallback: (res: ISubmittableResult) => void
  txHashHex: `0x${string}`
}

const SigningModal = ({ handleClose, isOpen, submittableCallback, txHashHex }: SigningModalProps) => {
  const { user } = useAppSelector((state) => state.user)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isPolkadotModalOpen, setIsPolkadotModalOpen] = useState<boolean>(false)
  const [method, setMethod] = useState<MethodType | undefined>(undefined)

  const signAndSubmit = async () => {
    const { isConnectedPolkadot, polkadotWallet } = user
    if (isConnectedPolkadot && polkadotWallet) {
      const { address, injector } = polkadotWallet
      const signedTx = await signTx(txHashHex, address, injector.signer)
      await runTx(signedTx, submittableCallback)
    }
  }

  useEffect(() => {
    let shouldUpdate = true
    const decodeTx = async () => {
      setIsLoading(true)
      try {
        const api = await getRawApi()
        const txHash = api.tx(txHashHex)
        const decodedMethod = txHash.toHuman() as DecodedMethodType
        if (shouldUpdate) setMethod(decodedMethod.method)
      } catch (error) {
        console.log(error)
        if (shouldUpdate) setMethod(undefined)
      } finally {
        setIsLoading(false)
      }
    }

    decodeTx()
    return () => {
      shouldUpdate = false
    }
  }, [txHashHex])

  if (isLoading) {
    return <PingpongLoader />
  }

  return (
    <>
      <Modal handleClose={handleClose} isClosable isOpen={isOpen}>
        <div className={styles.root}>
          {method?.section && method?.method && <div className={styles.method}>{`${TxTranslations[method.section][method.method]}`}</div>}
          <div className={styles.hash}>
            Tx hash:
            <ClipboardCopy className={styles.txHash} content={txHashHex} placeholder={middleEllipsis(txHashHex)} />
          </div>
          <div className={styles.body}>
            <div>Transaction ready to be signed</div>
            <div>You can use your Ternoa Wallet or the Polkadot extension</div>
          </div>
          <div className={styles.optionsContainer}>
            <div className={styles.ternoaWalletOption}>
              <QRCode className={styles.qrCode} value={JSON.stringify({ txHashHex })} includeMargin={true} renderAs={'svg'} size={180} />
              <div className={styles.soonContainer}>
                <div className={styles.soon}>SOON</div>
              </div>
              <div>Scan me with your Ternoa Wallet</div>
            </div>
            <div className={styles.polkaExtOption}>
              {user && user.polkadotWallet ? (
                <div className={styles.connectedPolkaExt}>
                  <Button
                    color="dark"
                    icon={user.polkadotWallet && <Identicon value={user.polkadotWallet?.address} size={24} theme="polkadot" />}
                    size="small"
                    text={user.polkadotWallet && middleEllipsis(user.polkadotWallet?.address)}
                    variant="rounded"
                    onClick={() => setIsPolkadotModalOpen(!isPolkadotModalOpen)}
                  />

                  <Button size="small" text="Sign and submit" variant="rectangle" onClick={signAndSubmit} />
                </div>
              ) : (
                <Button
                  color="dark"
                  icon={<Polkadot />}
                  size="small"
                  text="Connect"
                  variant="rounded"
                  onClick={() => setIsPolkadotModalOpen(!isPolkadotModalOpen)}
                />
              )}
            </div>
          </div>
        </div>
      </Modal>
      <PolkadotModal isOpen={isPolkadotModalOpen} closeModal={() => setIsPolkadotModalOpen(!isPolkadotModalOpen)} />
    </>
  )
}

export default SigningModal
