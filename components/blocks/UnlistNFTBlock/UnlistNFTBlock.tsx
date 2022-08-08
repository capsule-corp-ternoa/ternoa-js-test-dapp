import React, { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
// import { createNftM } from 'ternoa-js/'

import Box from 'components/base/Box/Box'
import Button from 'components/ui/Button/Button'
import Input from 'components/ui/Input/Input'

import styles from './UnlistNFTBlock.module.scss'

type IForm = {
  nft_id: number
}

interface Props {
  signableCallback: (txHashHex: `0x${string}`) => void
}

const UnlistNFTBlock = ({ signableCallback }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>({
    resolver: yupResolver(schema),
    defaultValues: {
      nft_id: 0,
    },
  })

  const onSubmit: SubmitHandler<IForm> = async ({ nft_id }) => {
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
      summary="Unlists an NFT from a marketplace"
      title="Unlist NFT"
    >
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <Input
          className={styles.field}
          error={errors.nft_id?.message}
          isError={Boolean(errors.nft_id)}
          label="NFT ID"
          min={0}
          name="nft_id"
          placeholder="Enter a NFT ID to be unlisted"
          register={register}
        />
        <Button text="Unlist NFT" type="submit" />
      </form>
    </Box>
  )
}

export default UnlistNFTBlock

const schema = yup.object({
  nft_id: yup.number().required('Please provide an NFT ID.').min(0, 'NFT ID must be greater than or equal to 0'),
})
