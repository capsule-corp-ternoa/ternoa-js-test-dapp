import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import MenuItem from '@mui/material/MenuItem'
import { Select as MuiSelect, SelectChangeEvent, Typography } from '@mui/material'

import Loader from 'components/ui/Loader'

import styles from './Select.module.scss'

interface Props<T> {
  advise?: string
  defaultValue?: T
  disabled?: boolean
  error?: string
  insight?: string
  isLoading?: boolean
  items: {
    value?: T
    label: string
  }[]
  label?: string | React.ReactNode
  noItemText?: string
  onChange?: (event: SelectChangeEvent<any>, child: React.ReactNode) => void
  placeholder?: string
  renderValue?: ((value: string | NonNullable<T>) => React.ReactNode) | undefined
  value?: T
}

const useStyles = makeStyles(() => ({
  menuPaper: {
    maxHeight: '200px !important',
  },
}))

const Select = <T extends string | number | undefined>({
  advise,
  defaultValue,
  disabled,
  error,
  isLoading,
  insight,
  items,
  label,
  noItemText,
  onChange,
  placeholder,
  renderValue,
  value,
}: Props<T>) => {
  const classes = useStyles({ value })
  const defaultRenderValue = (value: string | NonNullable<T>) => (value !== '' ? value : placeholder)
  return (
    <div>
      {label && (
        <div className={styles.top}>
          <span className={styles.label}>{label}</span>
          <span className={styles.insight}>{insight}</span>
        </div>
      )}
      <MuiSelect
        value={String(value)}
        displayEmpty
        disabled={disabled}
        defaultValue={defaultValue ?? ''}
        renderValue={renderValue ?? defaultRenderValue}
        onChange={onChange}
        MenuProps={{ classes: { paper: classes.menuPaper } }}
        sx={{
          width: '100%',
          zIndex: 10,
          '.MuiSelect-select': {
            zIndex: 12,
            color: value !== undefined ? '#fff' : '#878792',
            padding: '2rem 1.6rem 1.6rem',
          },

          svg: {
            zIndex: 10,
            top: 'calc(50% - 0.4em)',
          },

          fieldset: {
            padding: '2.8rem 1.6rem 1.6rem',
            borderRadius: '1.2rem',
          },

          ':hover': {
            fieldset: {
              borderColor: disabled ? 'default' : '#26264c !important',
            },
          },
        }}
      >
        {isLoading ? (
          <Loader size="small" />
        ) : items.length > 0 ? (
          [
            defaultValue === undefined && (
              <MenuItem key="reset" value="">
                <Typography m={'5px'} fontSize={'14px'} fontStyle="italic" textAlign={'center'}>
                  Empty
                </Typography>
              </MenuItem>
            ),
            ...items.map(({ label, value }, index) => (
              <MenuItem key={index} value={value}>
                {label}
              </MenuItem>
            )),
          ]
        ) : (
          <Typography m={'5px'} fontSize={'14px'} textAlign={'center'}>
            {noItemText ? noItemText : 'No item found'}
          </Typography>
        )}
      </MuiSelect>
      {error ? <div className={styles.errorMessage}>{error}</div> : <div className={styles.adviseMessage}>{advise}</div>}
    </div>
  )
}

export default Select
