import React from 'react'
import { Control, Controller, Path, UseFormRegister } from 'react-hook-form'
import FormControl from '@mui/material/FormControl'

import Input from 'components/ui/Input'
import Select from 'components/ui/Select'
import { useAppSelector } from 'redux/hooks'

interface Props<T> {
  control: Control<T, any>
  error?: string
  isError: boolean
  name: Path<T>
  register: UseFormRegister<T>
  required?: boolean
}

function MarketplaceIdField<T>({ control, error, isError, name, register, required = false }: Props<T>) {
  const { user } = useAppSelector((state) => state.user)
  const { isConnectedPolkadot, isMarketplacesFetching, marketplaces } = user

  if (isConnectedPolkadot) {
    return (
      <FormControl fullWidth>
        <Controller
          name={name}
          control={control}
          render={({ field: { onChange, value } }) => (
            <Select
              error={error}
              insight={required ? undefined : 'optional'}
              isLoading={isMarketplacesFetching}
              label="Marketplace ID"
              noItemText="No personal marketplace found"
              placeholder="Select a marketplace ID"
              items={marketplaces}
              onChange={onChange}
              value={value ? Number(value) : ''}
            />
          )}
        />
      </FormControl>
    )
  }

  return (
    <Input
      error={error}
      insight={required ? undefined : 'optional'}
      isError={isError}
      label="Marketplace ID"
      min={0}
      name={name}
      placeholder="Enter a marketplace ID"
      register={register}
      required={required}
      type="number"
    />
  )
}

export default MarketplaceIdField
