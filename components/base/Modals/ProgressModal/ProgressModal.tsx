import React from 'react'

import Warning from 'assets/svg/Components/Warning'
import Coin from 'assets/svg/Components/Coin'
import ClipboardCopy from 'components/ui/ClipboardCopy'
import Loader from 'components/ui/Loader'
import Modal from 'components/ui/Modal'
import { IResponse, TransactionLifeCycleStatus } from 'interfaces'
import { useAppSelector } from 'redux/hooks'
import { TxTranslations } from 'utils/txTranslate'
import { middleEllipsis } from 'utils/strings'

import styles from './ProgressModal.module.scss'

export interface ProgressModalProps {
  handleClose: () => void
  isOpen: boolean
  response: IResponse
}

const getTxExplorerLink = (wssEndpoint: string, suffix: string) => {
  const subdomain = wssEndpoint.includes('alphanet') ? 'explorer-alphanet.' : 'explorer.'
  const extension = wssEndpoint.includes('alphanet') ? '.dev' : '.com'
  return `https://${subdomain}ternoa${extension}${suffix}`
}

const ProgressModal = ({ handleClose, isOpen, response }: ProgressModalProps) => {
  const { app } = useAppSelector((state) => state.app)
  const { wssEndpoint } = app
  const { body, status, txExtrinsic, txHash, txLinkSuffix } = response
  const section = txExtrinsic?.method.section
  const method = txExtrinsic?.method.method
  const txLink = txLinkSuffix && getTxExplorerLink(wssEndpoint, txLinkSuffix)

  return (
    <Modal handleClose={handleClose} isClosable isOpen={isOpen}>
      <div className={styles.root}>
        {status === TransactionLifeCycleStatus.TX_PENDING && (
          <>
            <Loader useLottie />
            <div className={styles.status}>Pending...</div>
          </>
        )}
        {status === TransactionLifeCycleStatus.TX_FAILED && (
          <>
            <Warning className={styles.warning} />
            <div className={styles.status}>{section && method ? `${TxTranslations[section][method]} failed` : 'Transaction failed'}</div>
          </>
        )}
        {status === TransactionLifeCycleStatus.TX_SUCCESS && (
          <>
            <Coin className={styles.coinIcon} />
            <div className={styles.status}>{section && method ? `${TxTranslations[section][method]} success` : 'Transaction success'}</div>
          </>
        )}
        {txHash && (
          <div className={styles.hash}>
            Tx hash:
            <ClipboardCopy className={styles.txHash} content={txHash.toString()} placeholder={middleEllipsis(txHash.toString())} />
          </div>
        )}
        {txLinkSuffix && (
          <a className={styles.link} href={txLink} target="_blank" rel="noopener noreferrer" title="Ternoa explorer">
            View on explorer
          </a>
        )}
        {body && <div className={styles.body}>{body}</div>}
      </div>
    </Modal>
  )
}

export default ProgressModal
