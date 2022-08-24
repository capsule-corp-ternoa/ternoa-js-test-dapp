import React, { useEffect } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import Tooltip from '@mui/material/Tooltip'
import InfoIcon from '@mui/icons-material/Info'
import { TransactionHashType } from 'ternoa-js'
import { buyNftTx } from 'ternoa-js/marketplace'

import Box from 'components/base/Box/Box'
import Button from 'components/ui/Button/Button'
import Input from 'components/ui/Input/Input'
import { useAppSelector } from 'redux/hooks'

type IForm = {
  id: number
}

interface Props {
  signableCallback: (txHashHex: TransactionHashType) => void
}

const Tips = () => (
  <Tooltip
    title={
      <p>
        <b>NFT ID</b> contains the id of the NFT to buy.
      </p>
    }
  >
    <InfoIcon />
  </Tooltip>
)

const BuyNFTBlock = ({ signableCallback }: Props) => {
  const { user } = useAppSelector((state) => state.user)
  const { NFTs, polkadotWallet } = user
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    reset,
  } = useForm<IForm>({
    resolver: yupResolver(schema),
    defaultValues: {},
    mode: 'onChange',
  })

  const onSubmit: SubmitHandler<IForm> = async ({ id }) => {
    const buyNftTxHex = await buyNftTx(id)
    signableCallback(buyNftTxHex)
  }

  useEffect(() => {
    reset()
  }, [NFTs, polkadotWallet, reset])

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
      tooltip={<Tips />}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          error={errors.id?.message}
          isError={Boolean(errors.id)}
          label="NFT ID"
          min={0}
          name="id"
          placeholder="Enter an NFT ID"
          register={register}
          required
          type="number"
        />
        <Button disabled={isSubmitting || !isValid} text="Buy NFT" type="submit" />
      </form>
    </Box>
  )
}

export default BuyNFTBlock

const schema = yup.object({
  id: yup
    .number()
    .transform((value) => (isNaN(value) ? -1 : value))
    .min(0, 'NFT ID must be greater than or equal to 0')
    .required('NFT ID is a required field'),
})
