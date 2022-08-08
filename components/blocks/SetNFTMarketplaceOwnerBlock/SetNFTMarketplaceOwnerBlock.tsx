import React, { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
// import { createNftM } from 'ternoa-js/'

import Box from 'components/base/Box/Box'
import Button from 'components/ui/Button/Button'
import Input from 'components/ui/Input/Input'
import styles from './SetNFTMarketplaceOwnerBlock.module.scss'

type IForm = {
  id: number
  recipient: string | undefined
}

interface Props {
  signableCallback: (txHashHex: `0x${string}`) => void
}

const SetNFTMarketplaceOwnerBlock = ({ signableCallback }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>({
    resolver: yupResolver(schema),
    defaultValues: {
      id: 0,
      recipient: undefined,
    },
  })

  const onSubmit: SubmitHandler<IForm> = async ({ id, recipient }) => {
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
      summary="Set the new marketplace owner on the chain."
      title="Set NFT Marketplace Owner"
    >
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <Input
          className={styles.field}
          error={errors.id?.message}
          isError={Boolean(errors.id)}
          label="Marketplace ID"
          min={0}
          name="id"
          placeholder="Enter id of Marketplace"
          register={register}
          required
        />

        <Input
          className={styles.field}
          error={errors.recipient?.message}
          isError={Boolean(errors.recipient)}
          label="Recipient"
          name="recipient"
          placeholder="Enter address of new marketplace owner"
          register={register}
          required
        />
        <Button text="Set Owner" type="submit" />
      </form>
    </Box>
  )
}

export default SetNFTMarketplaceOwnerBlock

const schema = yup.object({
  id: yup.number().required('Please provide an NFT ID.').min(0, 'NFT ID must be greater than or equal to 0'),
  recipient: yup.string().required('PLease set destination account').max(150, 'Only 150 characters are allowed'),
})
