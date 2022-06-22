import React, { useEffect, useState } from 'react'

import styles from './ClipboardCopy.module.scss'

const clipboardCopy = (str: string) => {
  try {
    navigator.clipboard.writeText(str)
  } catch (error) {
    console.log(error)
  }
}

interface IconProps {
  className?: string
  color?: 'danger' | 'dark' | 'primary100' | 'primary500' | 'success' | 'gradient500' | 'gradient700'
  size?: 'small' | 'medium'
}

const CheckMark = ({ className }: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24">
    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm-1.25 17.292l-4.5-4.364 1.857-1.858 2.643 2.506 5.643-5.784 1.857 1.857-7.5 7.643z"></path>
  </svg>
)

const CopyPaste = ({ className }: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24">
    <path d="M22 6v16H6V6h16zm2-2H4v20h20V4zM0 21V0h21v2H2v19H0z"></path>
  </svg>
)

interface Props {
  content: string
  className?: string
  color?: 'danger' | 'dark' | 'primary100' | 'primary500' | 'neutral300' | 'success' | 'gradient500' | 'gradient700'
  identIcon?: React.ReactNode
  placeholder?: string
  size?: 'small' | 'medium'
}

const Clipboard = ({ content, className, color = 'neutral300', identIcon, placeholder, size = 'medium' }: Props) => {
  const [isCopyIndicator, setIsCopyIndicator] = useState(false)

  useEffect(() => {
    if (isCopyIndicator) {
      const timer = setTimeout(() => {
        setIsCopyIndicator(false)
      }, 1500)
      return () => clearTimeout(timer)
    }
  }, [isCopyIndicator])

  return (
    <button
      className={[`${styles.root}`, `${styles[color]}`, `${styles[size]}`, className].join(' ')}
      onClick={() => {
        clipboardCopy(content)
        setIsCopyIndicator(true)
      }}
    >
      {identIcon !== undefined && <div className={styles.identIcon}>{identIcon}</div>}
      {placeholder ?? <small>{placeholder}</small>}
      <div>
        {isCopyIndicator ? (
          <CheckMark className={`${styles.checkMarkIcon} ${styles[color]} ${styles[size]}`} />
        ) : (
          identIcon === undefined && <CopyPaste className={`${styles.copyPasteIcon} ${styles[color]} ${styles[size]}`} />
        )}
      </div>
    </button>
  )
}

export default Clipboard
