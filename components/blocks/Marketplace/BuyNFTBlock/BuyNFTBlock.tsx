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
      import { initializeApi } from "ternoa-js"
      import { buyNft } from "ternoa-js/marketplace"

      ... //we asume the API instance is already initialize
      ... //and your keyring is already created and provided with CAPS to support transactions fees. 
      
      const buyMyFirstNFT = async () => {
        try { 

          // Here we create, sign and submit the Marketplace NFT buying transaction with your keyring
          const buyNFTEvent = await buyNft(NFT_ID, keyring, WaitUntil.BlockInclusion)
      
        } catch (e) {
          console.log(e)
        }
      }
    `}
      codeSnippetLink="https://ternoa-js.ternoa.dev/modules.html#buyNft"
      codeSnippetTitle="Ternoa-JS: buyNft"
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
    .transform((value) => (isNaN(value) ? undefined : value))
    .min(0, 'NFT ID must be greater than or equal to 0')
    .required('NFT ID is a required field'),
})
