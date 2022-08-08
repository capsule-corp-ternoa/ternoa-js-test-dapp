import React, { useState } from 'react'
import BN from 'bn.js'
import { useForm, SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
// import { createNftM } from 'ternoa-js/'

import Box from 'components/base/Box/Box'
import Button from 'components/ui/Button/Button'
import Input from 'components/ui/Input/Input'

import styles from './ListNFTBlock.module.scss'

type IForm = {
  nft_id: number
  marketplace_id: number
  price: number | BN
}

interface Props {
  signableCallback: (txHashHex: `0x${string}`) => void
}

const ListNFTBlock = ({ signableCallback }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>({
    resolver: yupResolver(schema),
    defaultValues: {
      nft_id: 0,
      marketplace_id: 0,
    },
  })

  const onSubmit: SubmitHandler<IForm> = async ({ nft_id, marketplace_id, price }) => {
    // const createMarketplaceTx = await createMarketplace(marketplaceKind)
    // signableCallback(createMarketplaceTx)
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
      summary="Lists an NFT on a marketplace"
      title="List NFT"
    >
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <Input
          className={styles.field}
          error={errors.nft_id?.message}
          isError={Boolean(errors.nft_id)}
          label="NFT ID"
          min={0}
          name="nft_id"
          placeholder="Enter a NFT ID to be listed"
          register={register}
        />
        <Input
          className={styles.field}
          error={errors.marketplace_id?.message}
          isError={Boolean(errors.marketplace_id)}
          label="Marketplace ID"
          min={0}
          name="marketplace_id"
          placeholder="Enter a Marketplace ID to list NFT"
          register={register}
        />
        <Input
          className={styles.field}
          error={errors.price?.message}
          isError={Boolean(errors.price)}
          label="Price"
          min={0}
          name="price"
          placeholder="Enter a price of the NFT"
          register={register}
        />

        <Button text="List NFT" type="submit" />
      </form>
    </Box>
  )
}

export default ListNFTBlock

const schema = yup.object({
  nft_id: yup.number().required('Please provide an NFT ID.').min(0, 'NFT ID must be greater than or equal to 0'),
  marketplace_id: yup.number().required('Please provide an Marketplace ID.').min(0, 'Marketplace ID must be greater than or equal to 0'),
  price: yup.number().min(0, 'Price must be greater than or equal to 0').max(0, 'Price must be lower or equal to 100'),
})
