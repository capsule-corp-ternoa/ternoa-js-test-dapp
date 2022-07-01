import React from 'react'

import Modal from 'components/ui/Modal'

import styles from './SigningModal.module.scss'

export interface SigningModalProps {
  handleClose: () => void
  isOpen: boolean
}

const SigningModal = ({ handleClose, isOpen }: SigningModalProps) => {
  return (
    <Modal handleClose={handleClose} isClosable isOpen={isOpen}>
      <div className={styles.root}>SIGNING MODAL</div>
    </Modal>
  )
}

export default SigningModal
