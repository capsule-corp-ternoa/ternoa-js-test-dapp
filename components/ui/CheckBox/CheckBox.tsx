import React from 'react'
import { Path, UseFormRegister } from 'react-hook-form'

import styles from './CheckBox.module.scss'

interface Props<T> {
  checked?: boolean
  className?: string
  error?: string
  id?: string
  label?: string
  name: Path<T>
  onChange?: () => void
  readOnly?: boolean
  register: UseFormRegister<T>
  required?: boolean
  value?: string
}

const CheckBox = <T,>({ checked, className, error, id, label, name, onChange, readOnly, value }: Props<T>) => (
  <>
    <label className={[`${styles.root}`, className].join(' ')}>
      <input className={styles.input} type="checkbox" id={id} checked={checked} name={name} onChange={onChange} readOnly={readOnly} value={value} />
      {label}
    </label>
    {error && <div className={styles.errorMessage}>{error}</div>}
  </>
)

export default CheckBox
