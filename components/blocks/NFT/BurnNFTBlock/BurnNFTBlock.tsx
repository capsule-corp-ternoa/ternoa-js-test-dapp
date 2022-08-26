import React, { useEffect } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import Tooltip from '@mui/material/Tooltip'
import InfoIcon from '@mui/icons-material/Info'
import { TransactionHashType } from 'ternoa-js'
import { burnNftTx } from 'ternoa-js/nft'

import Box from 'components/base/Box/Box'
import NFTIdField from 'components/base/Fields/NFTIdField'
import Button from 'components/ui/Button/Button'
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
        <b>NFT ID</b> contains the id of the NFT to burn.
      </p>
    }
  >
    <InfoIcon />
  </Tooltip>
)

const BurnNFTBlock = ({ signableCallback }: Props) => {
  const { user } = useAppSelector((state) => state.user)
  const { NFTs, polkadotWallet } = user
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    reset,
  } = useForm<IForm>({
    resolver: yupResolver(schema),
    defaultValues: {},
    mode: 'onChange',
  })

  const onSubmit: SubmitHandler<IForm> = async ({ id }) => {
    const burnNftTxHex = await burnNftTx(id)
    signableCallback(burnNftTxHex)
  }

  useEffect(() => {
    reset()
  }, [NFTs, polkadotWallet, reset])

  return (
    <Box
      codeSnippet={`
      import { initializeApi } from "ternoa-js"
      import { burnNft } from "ternoa-js/nft"
      
      const burnMyNFT = async () => {
        try {
          // We initialize the API instance
          await initializeApi()
      
          ... //we asume your keyring is already created and provided with CAPS to support transactions fees.  
      
          // Here we create, sign and submit the NFT transaction with your keyring
          const burnedNFTEvent = await burnNft(YOUR_NFT_ID, keyring, WaitUntil.BlockInclusion)
      
          // Do something with the NFTBurnedEvent response
          console.log(burnedNFTEvent);
          ...
      
        } catch (e) {
          console.log(e)
        }
      }
    `}
      codeSnippetLink="https://ternoa-js.ternoa.dev/modules.html#burnNft"
      codeSnippetTitle="Ternoa-JS: burnNFT"
      summary="Burns an NFT from the chain"
      title="Burn NFT"
      tooltip={<Tips />}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <NFTIdField control={control} error={errors.id?.message} isError={Boolean(errors.id)} name="id" register={register} required />
        <Button disabled={isSubmitting || !isValid} text="Burn NFT" type="submit" />
      </form>
    </Box>
  )
}

export default BurnNFTBlock

const schema = yup.object({
  id: yup
    .number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .min(0, 'NFT ID must be greater than or equal to 0')
    .required('NFT ID is a required field'),
})
