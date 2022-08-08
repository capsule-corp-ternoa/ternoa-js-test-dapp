import React, { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
// import { createNftM } from 'ternoa-js/'

import Box from 'components/base/Box/Box'
import Button from 'components/ui/Button/Button'
import Input from 'components/ui/Input/Input'
import styles from './SetNFTMarketplaceKindBlock.module.scss'

import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'

type IForm = {
  id: number
  marketplaceKind: string
}

interface Props {
  signableCallback: (txHashHex: `0x${string}`) => void
}

const SetNFTMarketplaceKindBlock = ({ signableCallback }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>({
    resolver: yupResolver(schema),
    defaultValues: {},
  })

  const onSubmit: SubmitHandler<IForm> = async ({ id, marketplaceKind }) => {
    // const createMarketplaceTx = await createMarketplace(marketplaceKind)
    // signableCallback(createMarketplaceTx)
  }

  const [marketplaceType, setMarketplaceType] = useState('')

  const handleChange = (event: SelectChangeEvent) => {
    setMarketplaceType(event.target.value as string)
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
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <Input
          className={styles.field}
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
          <div className="top">
            <span className="label">Kind</span>
          </div>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={marketplaceType}
            label="Commision Fee"
            onChange={handleChange}
            className="select_sheet"
          >
            <MenuItem value={'public'}>Noop</MenuItem>
            <MenuItem value={'private'}>Remove</MenuItem>
          </Select>
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
