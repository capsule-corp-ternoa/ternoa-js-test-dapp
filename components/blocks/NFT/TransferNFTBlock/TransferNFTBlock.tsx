import React, { useEffect } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import Tooltip from '@mui/material/Tooltip'
import InfoIcon from '@mui/icons-material/Info'
import { TransactionHashType } from 'ternoa-js'
import { isValidAddress } from 'ternoa-js/blockchain'
import { transferNftTx } from 'ternoa-js/nft'

import Box from 'components/base/Box/Box'
import NFTIdField from 'components/base/Fields/NFTIdField'
import Button from 'components/ui/Button/Button'
import Input from 'components/ui/Input'
import { useAppSelector } from 'redux/hooks'

type IForm = {
  id: number
  recipient: string
}

interface Props {
  signableCallback: (txHashHex: TransactionHashType) => void
}

const Tips = () => (
  <Tooltip
    title={
      <>
        <p>
          <b>NFT ID</b> contains the id of the NFT to transfer.
        </p>
        <p>
          <b>Recipient</b> contains the Ternoa recipient address to which NFT will be transferred. NFT ownership will be loose.
        </p>
      </>
    }
  >
    <InfoIcon />
  </Tooltip>
)

const TransferNFTBlock = ({ signableCallback }: Props) => {
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

  const onSubmit: SubmitHandler<IForm> = async ({ id, recipient }) => {
    const transferNftTxHex = await transferNftTx(id, recipient)
    signableCallback(transferNftTxHex)
  }

  useEffect(() => {
    reset()
  }, [NFTs, polkadotWallet, reset])

  return (
    <Box
      codeSnippet={`
      import { initializeApi } from "ternoa-js"
      import { transferNft } from "ternoa-js/nft"
      
      ... //we asume the API instance is already initialize
      ... //and your keyring is already created and provided with CAPS to support transactions fees.  

      const transferMyNFT = async () => {
        try {

          // Here you transfer your NFT to a specific RECIPIENT, ownership will be lost
          const transferredNFTEvent = await transferNft(YOUR_NFT_ID, RECIPIENT, keyring, WaitUntil.BlockInclusion)
      
        } catch (e) {
          console.log(e)
        }
      }
    `}
      codeSnippetLink="https://ternoa-js.ternoa.dev/modules.html#transferNft"
      codeSnippetTitle="Ternoa-JS: transferNFT"
      summary="Sends an NFT to someone"
      title="Transfer NFT"
      tooltip={<Tips />}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <NFTIdField control={control} error={errors.id?.message} isError={Boolean(errors.id)} name="id" register={register} required />
        <Input
          error={errors.recipient?.message}
          isError={Boolean(errors.recipient)}
          label="Recipient"
          name="recipient"
          placeholder="Enter recipient Ternoa address"
          register={register}
          required
        />
        <Button disabled={isSubmitting || !isValid} text="Transfer NFT" type="submit" />
      </form>
    </Box>
  )
}

export default TransferNFTBlock

const schema = yup.object({
  id: yup
    .number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .min(0, 'NFT ID must be greater than or equal to 0')
    .required('NFT ID is a required field'),
  recipient: yup
    .string()
    .test('Recipient Ternoa address', 'A valid Ternoa address must be entered', (item) => {
      if (item) return isValidAddress(item)
      return true
    })
    .transform((value) => (value === '' ? undefined : value)),
})
