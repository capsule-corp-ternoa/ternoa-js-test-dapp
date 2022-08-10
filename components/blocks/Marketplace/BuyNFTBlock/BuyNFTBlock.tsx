import React from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { TransactionHashType } from 'ternoa-js'
import { buyNftTx } from 'ternoa-js/marketplace'

import Box from 'components/base/Box/Box'
import Button from 'components/ui/Button/Button'
import Input from 'components/ui/Input/Input'

type IForm = {
  nft_id: number
}

interface Props {
  signableCallback: (txHashHex: TransactionHashType) => void
}

const BuyNFTBlock = ({ signableCallback }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>({
    resolver: yupResolver(schema),
    defaultValues: {},
  })

  const onSubmit: SubmitHandler<IForm> = async ({ nft_id }) => {
    const buyNftTxHex = await buyNftTx(nft_id)
    signableCallback(buyNftTxHex)
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
      summary="Buys an NFT on a marketplace"
      title="Buy NFT"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          error={errors.nft_id?.message}
          isError={Boolean(errors.nft_id)}
          label="NFT ID"
          min={0}
          name="nft_id"
          placeholder="Enter a ID of NFT to buy"
          register={register}
        />
        <Button text="Buy NFT" type="submit" />
      </form>
    </Box>
  )
}

export default BuyNFTBlock

const schema = yup.object({
  nft_id: yup.number().required('Please provide an NFT ID.').min(0, 'NFT ID must be greater than or equal to 0'),
})
