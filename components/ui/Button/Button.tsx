import ArrowRight from 'assets/svg/Components/ArrowRight'
import { Colors, Sizes, Variants } from 'components/ui/types'
import Link from 'next/link'
import Loader from '../Loader/Loader'

import styles from './Button.module.scss'

interface IButton {
  color?: Colors
  isLoading?: boolean
  size?: Sizes
  variant?: Variants
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
  type?: 'submit' | 'button'
}

export const AnchorButton = ({ className, color = 'primary500', href, size = 'medium', text, title, variant = 'rounded' }: AnchorButtonProps) => {
  if (href.charAt(0) === '/')
    return (
      <Link href={href}>
        <a className={`${styles.root} ${styles.rootAnchor} ${styles[color]} ${styles[size]} ${styles[variant]} ${className}`} title={title}>
          {text}
          <ArrowRight />
        </a>
      </Link>
    )

  return (
    <a
      className={`${styles.root} ${styles.rootAnchor} ${styles[color]} ${styles[size]} ${styles[variant]} ${className}`}
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
  type,
  variant = 'rounded',
}: ButtonProps) => (
  <button
    className={`${styles.root} ${styles[color]} ${styles[size]} ${styles[variant]} ${isLoading && styles.loading} ${className}`}
    disabled={disabled}
    onClick={onClick}
    type={type}
  >
    {icon && <div className={styles.icon}>{icon}</div>}
    {iconUnsized && <div className={styles.iconUnsized}>{iconUnsized}</div>}
    {isLoading ? <Loader className={styles.loader} size={size} useLottie /> : <>{text && text}</>}
  </button>
)

export default Button
