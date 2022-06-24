import { useEffect, useState } from 'react'
import { InjectedAccountWithMeta } from '@polkadot/extension-inject/types'

import { connect, getAccounts } from 'helpers/polkadot'
import { useAppDispatch } from 'redux/hooks'
import { middleEllipsis } from 'utils/strings'

import Modal from 'components/ui/Modal'
import styles from './PolkadotModal.module.scss'
import Warning from 'assets/svg/Components/Warning'

interface PolkadotProps {
  isOpen: boolean
  closeModal: () => void
}

const PolkadotModal: React.FC<PolkadotProps> = ({ isOpen, closeModal }) => {
  const [accounts, setAccounts] = useState<InjectedAccountWithMeta[]>([])
  const [error, setError] = useState<string>('')
  const dispatch = useAppDispatch()

  const handleConnect = async (accountId: InjectedAccountWithMeta) => {
    try {
      await connect(accountId, dispatch)
      closeModal()
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    let shouldUpdate = true
    const loadAccounts = async () => {
      try {
        const accounts = await getAccounts()
        if (shouldUpdate) setAccounts(accounts)
      } catch (error) {
        console.error(error)
        if (error instanceof Error) {
          setError(error.message)
        } else {
          setError(error as string)
        }
      }
    }

    loadAccounts()

    return () => {
      shouldUpdate = false
    }
  }, [])

  return (
    <Modal handleClose={closeModal} isOpen={isOpen} isClickAwayCloseAllowed={true} isClosable={true}>
      <div className={styles.root}>
        <h4 className={styles.title}>{error !== '' ? 'Something went wrong !' : 'Select your account'}</h4>
        {error !== '' ? (
          <div className={styles.errorWrapper}>
            <Warning />
            <div className={styles.errorMessage}>{error}</div>
          </div>
        ) : (
          <div className={styles.accounts}>
            {accounts.map(({ address, meta }, idx) => (
              <button className={styles.account} key={address} onClick={() => handleConnect(accounts[idx])}>
                <div className={styles.accountData}>
                  {meta.name && <span className={styles.accountName}>{meta.name}</span>}
                  <span className={styles.accountAddress}>{middleEllipsis(address, 15)}</span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </Modal>
  )
}

export default PolkadotModal
