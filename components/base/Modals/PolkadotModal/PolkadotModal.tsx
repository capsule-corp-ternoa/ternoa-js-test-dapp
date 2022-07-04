import { useEffect, useState } from 'react'
import { InjectedAccountWithMeta } from '@polkadot/extension-inject/types'

import PowerOff from 'assets/svg/Components/Poweroff'
import Warning from 'assets/svg/Components/Warning'
import Button from 'components/ui/Button/Button'
import Modal from 'components/ui/Modal'
import { connect, getAccounts } from 'helpers/polkadot'
import { useAppSelector, useAppDispatch } from 'redux/hooks'
import { actions } from 'redux/user/actions'
import { middleEllipsis } from 'utils/strings'

import styles from './PolkadotModal.module.scss'

interface PolkadotProps {
  isOpen: boolean
  closeModal: () => void
}

const PolkadotModal: React.FC<PolkadotProps> = ({ isOpen, closeModal }) => {
  const { user } = useAppSelector((state) => state.user)
  const { isConnectedPolkadot } = user
  const dispatch = useAppDispatch()
  const [accounts, setAccounts] = useState<InjectedAccountWithMeta[]>([])
  const [error, setError] = useState<string>('')

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
        {isConnectedPolkadot && (
          <Button
            className={styles.logout}
            icon={<PowerOff />}
            size="small"
            text="Logout"
            variant="rounded"
            onClick={() => {
              dispatch(actions.logoutPolkadot())
              closeModal()
            }}
          />
        )}
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
