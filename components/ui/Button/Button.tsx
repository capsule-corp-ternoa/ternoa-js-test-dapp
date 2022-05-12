import ArrowRight from 'assets/svg/Components/ArrowRight'
import Link from 'next/link'

import styles from './Button.module.scss'

interface IButton {
  color?: 'danger' | 'dark' | 'primary100' | 'primary500' | 'success' | 'gradient500' | 'gradient700'
  isLoading?: boolean
  size?: 'small' | 'medium'
  variant?: 'rounded' | 'rectangle'
}

interface AnchorButtonProps extends IButton {
  href: string
  className?: string
  text?: string
  title?: string
}

export const AnchorButton = ({ className, color = 'primary500', href, size = 'medium', text, title, variant = 'rounded' }: AnchorButtonProps) => {
  if (href.charAt(0) === '/')
    return (
      <Link href={href}>
        <a
          className={[`${styles.root}`, `${styles.rootAnchor}`, `${styles[color]}`, `${styles[size]}`, `${styles[variant]}`, className].join(' ')}
          title={title}
        >
          {text}
          <ArrowRight />
        </a>
      </Link>
    )

  return (
    <a
      className={[`${styles.root}`, `${styles.rootAnchor}`, `${styles[color]}`, `${styles[size]}`, `${styles[variant]}`, className].join(' ')}
      href={href}
      title={title}
      target="_blank"
      rel="noopener noreferrer"
    >
      {text}
      <ArrowRight />
    </a>
  )
}
