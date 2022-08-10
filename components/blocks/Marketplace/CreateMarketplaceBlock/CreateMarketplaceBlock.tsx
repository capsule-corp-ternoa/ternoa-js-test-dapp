import React from 'react'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import * as yup from 'yup'
import { TransactionHashType } from 'ternoa-js'
import { createMarketplaceTx } from 'ternoa-js/marketplace'
import { MarketplaceKind } from 'ternoa-js/marketplace/enum'

import Box from 'components/base/Box/Box'
import Button from 'components/ui/Button/Button'

type IForm = {
  marketplaceKind: MarketplaceKind
}

interface Props {
  signableCallback: (txHashHex: TransactionHashType) => void
}

const CreateMarketplaceBlock = ({ signableCallback }: Props) => {
  const { control, handleSubmit } = useForm<IForm>({
    resolver: yupResolver(schema),
    defaultValues: {
      marketplaceKind: MarketplaceKind.Public,
    },
  })

  const onSubmit: SubmitHandler<IForm> = async ({ marketplaceKind }) => {
    console.log({ marketplaceKind })
    const createMarketplaceTxHex = await createMarketplaceTx(marketplaceKind)
    signableCallback(createMarketplaceTxHex)
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
      summary="Creates a Marketplace on the chain"
      title="Create NFT Marketplace"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl fullWidth>
          <InputLabel>Kind</InputLabel>
          <Controller
            name="marketplaceKind"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Select value={value} label="Marketplace Kind" onChange={onChange}>
                <MenuItem value={MarketplaceKind.Public}>Public</MenuItem>
                <MenuItem value={MarketplaceKind.Private}>Private</MenuItem>
              </Select>
            )}
          />
        </FormControl>
        <Button text="Create Marketplace" type="submit" />
      </form>
    </Box>
  )
}

export default CreateMarketplaceBlock

const schema = yup.object({
  marketplaceKind: yup.string().required('Please provide marketplace kind.').max(150, 'Only 150 characters are allowed'),
})
