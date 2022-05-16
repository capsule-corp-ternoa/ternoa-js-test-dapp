import { IWeb3Providers } from 'components/base/Header/interfaces'
import Button from 'components/ui/Button/Button'
import Modal from 'components/ui/Modal'
import styles from './Web3providersModal.module.scss'

interface Web3Props {
  isOpen: boolean
  closeModal: () => void
  web3Providers?: IWeb3Providers[]
}

const Web3ProvidersModal: React.FC<Web3Props> = ({ web3Providers, isOpen, closeModal }) => {
  return (
    <Modal handleClose={closeModal} isOpen={isOpen} isClickAwayCloseAllowed={true} isClosable={true}>
      <div className={styles.root}>
        <h4 className={styles.title}>Connect your wallet</h4>
        {web3Providers && (
          <div className={styles.providers}>
            {web3Providers.map((item) => (
              <Button color={item.color} icon={item.icon} size={item.size} text={item.text} variant={item.variant} key={item.text} />
            ))}
          </div>
        )}
      </div>
    </Modal>
  )
}

export default Web3ProvidersModal
