import React, { useEffect } from 'react'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import Tooltip from '@mui/material/Tooltip'
import InfoIcon from '@mui/icons-material/Info'
import FormControl from '@mui/material/FormControl'
import { TransactionHashType } from 'ternoa-js'
import { setMarketplaceKindTx } from 'ternoa-js/marketplace'
import { MarketplaceKind } from 'ternoa-js/marketplace/enum'

import Box from 'components/base/Box/Box'
import MarketplaceIdField from 'components/base/Fields/MarketplaceIdField'
import Button from 'components/ui/Button/Button'
import Select from 'components/ui/Select'
import { SelectItemType } from 'interfaces'
import { useAppSelector } from 'redux/hooks'

type IForm = {
  id: number
  marketplaceKind: MarketplaceKind
}

interface Props {
  signableCallback: (txHashHex: TransactionHashType) => void
}

const SELECT_ITEMS: SelectItemType[] = [
  {
    value: MarketplaceKind.Public,
    label: MarketplaceKind.Public,
  },
  {
    value: MarketplaceKind.Private,
    label: MarketplaceKind.Private,
  },
]

const Tips = () => (
  <Tooltip
    title={
      <>
        <p>
          <b>Marketplace ID</b> contains the id of the marketplace to update kind.
        </p>
        <p>
          <b>Kind</b> defines the marketplace kind type: Public or Private.{' '}
          <ul>
            <li>
              A <b>Public Marketplace</b> allows any user to list NFTs into except blacklisted users.
            </li>
            <li>
              A <b>Private Marketplace</b> excludes all users to list NFTs into except whitelisted users.
            </li>
          </ul>
        </p>
      </>
    }
  >
    <InfoIcon />
  </Tooltip>
)

const SetMarketplaceKindBlock = ({ signableCallback }: Props) => {
  const { user } = useAppSelector((state) => state.user)
  const { marketplaces, polkadotWallet } = user
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    reset,
  } = useForm<IForm>({
    resolver: yupResolver(schema),
    defaultValues: { marketplaceKind: MarketplaceKind.Public },
    mode: 'onChange',
  })

  const onSubmit: SubmitHandler<IForm> = async ({ id, marketplaceKind }) => {
    const setMarketplaceKindTxHex = await setMarketplaceKindTx(id, marketplaceKind)
    signableCallback(setMarketplaceKindTxHex)
  }

  useEffect(() => {
    reset()
  }, [marketplaces, polkadotWallet, reset])

  return (
    <Box
      codeSnippet={`
      import { initializeApi } from "ternoa-js"
      import { setMarketplaceKind } from "ternoa-js/marketplace"

      ... //we asume the API instance is already initialize
      ... //and your keyring is already created and provided with CAPS to support transactions fees. 
      
      const updateMarketplaceKind = async () => {
        try { 

          // Here you update your Marketplace's kind to MARKETPLACE_KIND
          // MARKETPLACE_KIND can by set using MarketplaceKind enum from 'ternoa-js/marketplace/enum' (e.g. MarketplaceKind.Public)
          const updatedMarketplaceKindSetEvent = await setMarketplaceKind(MARKETPLACE_ID, MARKETPLACE_KIND, keyring, WaitUntil.BlockInclusion)
      
        } catch (e) {
          console.log(e)
        }
      }
    `}
      codeSnippetLink="https://ternoa-js.ternoa.dev/modules.html#setMarketplaceKind"
      codeSnippetTitle="Ternoa-JS: setMarketplaceKind"
      summary="Set the new marketplace kind on the chain"
      title="Set NFT Marketplace Kind"
      tooltip={<Tips />}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <MarketplaceIdField control={control} error={errors.id?.message} isError={Boolean(errors.id)} name="id" register={register} required />
        <FormControl fullWidth>
          <Controller
            name="marketplaceKind"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Select
                defaultValue={MarketplaceKind.Public}
                label="Kind"
                placeholder="Choose the marketplace kind type"
                items={SELECT_ITEMS}
                onChange={onChange}
                value={value}
              />
            )}
          />
        </FormControl>
        <Button disabled={isSubmitting || !isValid} text="Set Kind" type="submit" />
      </form>
    </Box>
  )
}

export default SetMarketplaceKindBlock

const schema = yup.object({
  id: yup
    .number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .min(0, 'Marketplace ID must be greater than or equal to 0')
    .required('Marketplace ID is a required field'),
  marketplaceKind: yup.string().required('Please provide marketplace kind.'),
})
