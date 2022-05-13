import Button from 'components/ui/Button/Button'
import Modal from 'components/ui/Modal'
import styles from './Web3providersModal.module.scss'

export interface Web3Props {
  web3Providers: any[]
  isOpen: boolean
  isClickAwayCloseAllowed?: boolean
  isClosable?: boolean
}

const Web3ProvidersModal: React.FC<Web3Props> = ({ web3Providers, isOpen }) => {
  return (
    <Modal isOpen={isOpen}>
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
