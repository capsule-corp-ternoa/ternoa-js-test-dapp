import React, { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
// import { createNftM } from 'ternoa-js/'

import Box from 'components/base/Box/Box'
import Button from 'components/ui/Button/Button'
import Input from 'components/ui/Input/Input'

import styles from './SetNFTMarketplaceConfigurationBlock.module.scss'

import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'

type IForm = {
  id: number
  commissionFee: string
  listingFee: string
  accountList: string
  offchainData: string
}

interface Props {
  signableCallback: (txHashHex: `0x${string}`) => void
}

const SetNFTMarketplaceConfigurationBlock = ({ signableCallback }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>({
    resolver: yupResolver(schema),
    defaultValues: {},
  })

  const onSubmit: SubmitHandler<IForm> = async ({ id, commissionFee, listingFee, accountList, offchainData }) => {
    // const createMarketplaceTx = await createMarketplace(marketplaceKind)
    // signableCallback(createMarketplaceTx)
  }

  const [commissionFeeType, setCommissionFeeType] = useState('')
  const [listingFeeType, setListingFeeType] = useState('')
  const [accountList, setAccountList] = useState('')
  const [offchainData, setOffchainData] = useState('')
  const handleChangeCommissionFee = (event: SelectChangeEvent) => {
    setCommissionFeeType(event.target.value as string)
  }
  const handleChangeListingFee = (event: SelectChangeEvent) => {
    setListingFeeType(event.target.value as string)
  }
  const handleChangeAccountList = (event: SelectChangeEvent) => {
    setAccountList(event.target.value as string)
  }
  const handleChangeOffchainData = (event: SelectChangeEvent) => {
    setOffchainData(event.target.value as string)
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
      summary="Set or Remove (Noop for No Operation) the marketplace parameters configuration"
      title="Set NFT Marketplace Configuration"
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
            <span className="label">Commission Fee</span>
          </div>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={commissionFeeType}
            label="Commision Fee"
            onChange={handleChangeCommissionFee}
            className="select_sheet"
          >
            <MenuItem value={'noop'}>Noop</MenuItem>
            <MenuItem value={'remove'}>Remove</MenuItem>
            <MenuItem value={'set'}>Set</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <div className="top">
            <span className="label">Listing Fee</span>
          </div>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={listingFeeType}
            label="Listing Fee"
            onChange={handleChangeListingFee}
            className="select_sheet"
          >
            <MenuItem value={'noop'}>Noop</MenuItem>
            <MenuItem value={'remove'}>Remove</MenuItem>
            <MenuItem value={'set'}>Set</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <div className="top">
            <span className="label">Account List</span>
          </div>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={accountList}
            label="Account List"
            onChange={handleChangeAccountList}
            className="select_sheet"
          >
            <MenuItem value={'noop'}>Noop</MenuItem>
            <MenuItem value={'remove'}>Remove</MenuItem>
            <MenuItem value={'set'}>Set</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <div className="top">
            <span className="label">Offchain Data</span>
          </div>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={offchainData}
            label="Offchain Data"
            onChange={handleChangeOffchainData}
            className="select_sheet"
          >
            <MenuItem value={'noop'}>Noop</MenuItem>
            <MenuItem value={'remove'}>Remove</MenuItem>
            <MenuItem value={'set'}>Set</MenuItem>
          </Select>
        </FormControl>
        <Button text="Set Configuration" type="submit" />
      </form>
    </Box>
  )
}

export default SetNFTMarketplaceConfigurationBlock

const schema = yup.object({
  marketplaceKind: yup.string().required('Please provide marketplace kind.').max(150, 'Only 150 characters are allowed'),
})
