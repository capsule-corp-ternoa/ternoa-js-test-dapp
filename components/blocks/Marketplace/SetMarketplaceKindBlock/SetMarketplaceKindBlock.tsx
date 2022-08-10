import React from 'react'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import { setMarketplaceKindTx } from 'ternoa-js/marketplace'
import { MarketplaceKind } from 'ternoa-js/marketplace/enum'

import Box from 'components/base/Box/Box'
import Button from 'components/ui/Button/Button'
import Input from 'components/ui/Input/Input'

type IForm = {
  id: number
  marketplaceKind: MarketplaceKind
}

interface Props {
  signableCallback: (txHashHex: `0x${string}`) => void
}

const SetNFTMarketplaceKindBlock = ({ signableCallback }: Props) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>({
    resolver: yupResolver(schema),
    defaultValues: {},
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
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          error={errors.id?.message}
          isError={Boolean(errors.id)}
          label="ID"
          min={0}
          name="id"
          placeholder="Enter id of Marketplace"
          register={register}
          required
        />
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
        <Button text="Set Kind" type="submit" />
      </form>
    </Box>
  )
}

export default SetNFTMarketplaceKindBlock

const schema = yup.object({
  marketplaceKind: yup.string().required('Please provide marketplace kind.').max(150, 'Only 150 characters are allowed'),
})
