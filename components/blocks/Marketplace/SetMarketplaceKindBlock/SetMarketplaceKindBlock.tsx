import React from 'react'
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
import Button from 'components/ui/Button/Button'
import Select from 'components/ui/Select'
import { SelectItemType } from 'interfaces'
import MarketplaceIdField from 'components/base/Fields/MarketplaceIdField'

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

const SetNFTMarketplaceKindBlock = ({ signableCallback }: Props) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<IForm>({
    resolver: yupResolver(schema),
    defaultValues: { marketplaceKind: MarketplaceKind.Public },
    mode: 'onChange',
  })

  const onSubmit: SubmitHandler<IForm> = async ({ id, marketplaceKind }) => {
    const setMarketplaceKindTxHex = await setMarketplaceKindTx(id, marketplaceKind)
    signableCallback(setMarketplaceKindTxHex)
  }
  return (
    <Box
      codeSnippet={`
    import { createNft } from "ternoa-js/nft";
    import { generateSeed, getKeyringFromSeed } from "ternoa-js/account"
  
    const createMyFirstNFT = async () => {
        try {
            const account = await generateSeed()
            const keyring = await getKeyringFromSeed(account.seed)
            await createNft("My first NFT", 10, null, false, keyring)
        } catch(error) {
            console.error(error)
        }
    }
    `}
      codeSnippetLink="https://ternoa-js.ternoa.dev/modules.html#createNft"
      codeSnippetTitle="Ternoa-JS: createNFT"
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

export default SetNFTMarketplaceKindBlock

const schema = yup.object({
  id: yup
    .number()
    .transform((value) => (isNaN(value) ? -1 : value))
    .min(0, 'Marketplace ID must be greater than or equal to 0')
    .required('Marketplace ID is a required field'),
  marketplaceKind: yup.string().required('Please provide marketplace kind.'),
})
