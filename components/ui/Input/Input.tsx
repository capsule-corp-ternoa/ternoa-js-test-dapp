import { Path, UseFormRegister } from 'react-hook-form'

import styles from './Input.module.scss'

interface Props<T> {
  label?: string | React.ReactNode
  insight?: string
  className?: string
  isGradient?: boolean
  disabled?: boolean
  endComponent?: React.ReactNode
  error?: string
  isError?: boolean
  max?: string | number
  min?: string | number
  maxLength?: number
  minLength?: number
  name: Path<T>
  onChange?: React.ChangeEventHandler<HTMLInputElement>
  placeholder?: string
  register: UseFormRegister<T>
  required?: boolean
  startIcon?: string
  type?: React.HTMLInputTypeAttribute
  value?: string | number | readonly string[]
  advise?: string
}

function TextInput<T>({
  advise,
  className,
  isGradient = false,
  disabled,
  endComponent,
  error,
  insight,
  isError,
  label,
  max,
  min,
  maxLength,
  minLength,
  name,
  placeholder,
  register,
  required = false,
  type = 'text',
  value,
}: Props<T>) {
  const numberInputOnWheelPreventChange = (e: any) => {
    // Prevent the input value change
    e.target.blur()

    // Prevent the page/container scrolling
    e.stopPropagation()

    // Refocus immediately, on the next tick (after the current function is done)
    setTimeout(() => {
      e.target.focus()
    }, 0)
  }

  return (
    <div className={` ${className}`}>
      {label && (
        <div className={styles.top}>
          <span className={styles.label}>{label}</span>
          <span className={styles.insight}>{insight}</span>
        </div>
      )}
      <label className={styles.inputLabel}>
        <input
          className={`${styles.input} ${isGradient && styles.gradient} ${isError && styles.error} ${endComponent !== undefined && styles.isEndComponent}`}
          type={type}
          disabled={disabled}
          inputMode={type === 'number' ? 'numeric' : undefined}
          pattern={type === 'number' ? '[0-9]+([.,][0-9]+)?' : undefined}
          placeholder={placeholder}
          onWheel={type === 'number' ? numberInputOnWheelPreventChange : undefined}
          max={max}
          min={min}
          value={value}
          onKeyDown={(evt) => {
            evt.key
            const forbidden = type === 'number' ? ['e', '-', ','] : []
            if (forbidden.includes(evt.key)) {
              evt.preventDefault()
            }
          }}
          {...register(name, { disabled, max, min, maxLength, minLength, required })}
        />
        <div className={styles.endComponent}>{endComponent}</div>
      </label>
      {error ? <div className={styles.errorMessage}>{error}</div> : <div className={styles.adviseMessage}>{advise}</div>}
    </div>
  )
}

export default TextInput
