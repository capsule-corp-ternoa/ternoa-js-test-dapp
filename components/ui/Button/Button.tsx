import ArrowRight from 'assets/svg/Components/ArrowRight'
import Link from 'next/link'

import styles from './Button.module.scss'

interface IButton {
  color?: 'danger' | 'dark' | 'primary100' | 'primary500' | 'success' | 'gradient500' | 'gradient700' | 'network'
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
interface ButtonProps extends IButton {
  className?: string
  disabled?: boolean
  icon?: React.ReactNode
  iconUnsized?: React.ReactNode
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  text?: string
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

const Button = ({
  className,
  color = 'primary500',
  disabled,
  icon,
  iconUnsized,
  isLoading = false,
  onClick,
  size = 'medium',
  text,
  variant = 'rounded',
}: ButtonProps) => (
  <button
    className={[`${styles.root}`, `${styles[color]}`, `${styles[size]}`, `${styles[variant]}`, `${isLoading ? styles.loading : ''}`, className].join(' ')}
    disabled={disabled}
    onClick={onClick}
  >
    {icon && <div className={styles.icon}>{icon}</div>}
    {iconUnsized && <div className={styles.iconUnsized}>{iconUnsized}</div>}
    {text && <>{text}</>}
    {/* {isLoading ? <Loader className={styles.loader} size={size} /> : <>{text}</>} */}
  </button>
)

export default Button
