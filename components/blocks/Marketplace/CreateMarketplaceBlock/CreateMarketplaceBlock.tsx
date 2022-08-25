import React from 'react'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import FormControl from '@mui/material/FormControl'
import * as yup from 'yup'
import Tooltip from '@mui/material/Tooltip'
import InfoIcon from '@mui/icons-material/Info'
import { TransactionHashType } from 'ternoa-js'
import { createMarketplaceTx } from 'ternoa-js/marketplace'
import { MarketplaceKind } from 'ternoa-js/marketplace/enum'

import Box from 'components/base/Box/Box'
import Button from 'components/ui/Button/Button'
import Select from 'components/ui/Select'
import { SelectItemType } from 'interfaces'

type IForm = {
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
      <p>
        The only required field is <b>Kind</b> which defines the marketplace kind type: Public or Private.{' '}
        <ul>
          <li>
            A <b>Public Marketplace</b> allows any user to list NFTs into except blacklisted users.
          </li>
          <li>
            A <b>Private Marketplace</b> excludes all users to list NFTs into except whitelisted users.
          </li>
        </ul>
      </p>
    }
  >
    <InfoIcon />
  </Tooltip>
)

const CreateMarketplaceBlock = ({ signableCallback }: Props) => {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = useForm<IForm>({
    resolver: yupResolver(schema),
    defaultValues: {
      marketplaceKind: MarketplaceKind.Public,
    },
    mode: 'onChange',
  })

  const onSubmit: SubmitHandler<IForm> = async ({ marketplaceKind }) => {
    const createMarketplaceTxHex = await createMarketplaceTx(marketplaceKind)
    signableCallback(createMarketplaceTxHex)
  }

  return (
    <Box
      codeSnippet={`
      import { initializeApi } from "ternoa-js"
      import { createMarketplace } from "ternoa-js/marketplace"
      
      const createMyFirstMarketplace = async () => {
        try {
          // We initialize the API instance
          await initializeApi()
      
          ... //we asume your keyring is already created and provided with CAPS to support transactions fees.  
      
          // Here we create, sign and submit the Marketplace transaction with your keyring
          // MARKETPLACE_KIND can by set using MarketplaceKind enum from 'ternoa-js/marketplace/enum' (e.g. MarketplaceKind.Public)
          const newMarketplaceEvent = await createMarketplace(MARKETPLACE_KIND, keyring, WaitUntil.BlockInclusion)
      
        } catch (e) {
          console.log(e)
        }
      }
    `}
      codeSnippetLink="https://ternoa-js.ternoa.dev/modules.html#createMarketplace"
      codeSnippetTitle="Ternoa-JS: createMarketplace"
      summary="Creates a Marketplace on the chain"
      title="Create NFT Marketplace"
      tooltip={<Tips />}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
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
        <Button disabled={isSubmitting || !isValid} text="Create Marketplace" type="submit" />
      </form>
    </Box>
  )
}

export default CreateMarketplaceBlock

const schema = yup.object({
  marketplaceKind: yup.string().required('Please provide marketplace kind.'),
})
