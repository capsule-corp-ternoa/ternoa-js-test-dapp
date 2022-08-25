import React, { useEffect } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import Tooltip from '@mui/material/Tooltip'
import InfoIcon from '@mui/icons-material/Info'
import { TransactionHashType } from 'ternoa-js'
import { setRoyaltyTx } from 'ternoa-js/nft'

import Box from 'components/base/Box/Box'
import NFTIdField from 'components/base/Fields/NFTIdField'
import Button from 'components/ui/Button/Button'
import Input from 'components/ui/Input'
import { useAppSelector } from 'redux/hooks'

type IForm = {
  id: number
  amount: number
}

interface Props {
  signableCallback: (txHashHex: TransactionHashType) => void
}

const Tips = () => (
  <Tooltip
    title={
      <>
        <p>
          <b>NFT ID</b> contains the id of the NFT to set royalty for.
        </p>
        <p>
          <b>Royalty</b> contains the royalty percentage to assign to the NFT. It can only be set once by the NFT creator.
        </p>
      </>
    }
  >
    <InfoIcon />
  </Tooltip>
)

const SetRoyaltyBlock = ({ signableCallback }: Props) => {
  const { user } = useAppSelector((state) => state.user)
  const { polkadotWallet } = user
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

  const onSubmit: SubmitHandler<IForm> = async ({ id, amount }) => {
    const setRoyaltyTxHex = await setRoyaltyTx(id, amount)
    signableCallback(setRoyaltyTxHex)
  }

  useEffect(() => {
    reset()
  }, [polkadotWallet, reset])

  return (
    <Box
      codeSnippet={`
      import { initializeApi } from "ternoa-js"
      import { setRoyalty } from "ternoa-js/nft"
      
      ... //we asume the API instance is already initialize
      ... //and your keyring is already created and provided with CAPS to support transactions fees.  

      const setMyNFTRoyalty = async () => {
        try {

          // Here you set your NFT royalty at ROYALTY_PERCENT
          const royaltySetEvent = await setRoyalty(YOUR_NFT_ID, ROYALTY_PERCENT, keyring, WaitUntil.BlockInclusion)
      
        } catch (e) {
          console.log(e)
        }
      }
    `}
      codeSnippetLink="https://ternoa-js.ternoa.dev/modules.html#setRoyalty"
      codeSnippetTitle="Ternoa-JS: setRoyalty"
      summary="Sets the royalty of an NFT"
      title="Set Royalty"
      tooltip={<Tips />}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <NFTIdField control={control} error={errors.id?.message} isError={Boolean(errors.id)} name="id" register={register} required />
        <Input
          error={errors.amount?.message}
          isError={Boolean(errors.amount)}
          label="Amount"
          name="amount"
          placeholder="Enter the percentage of royalty"
          register={register}
          required
          type="number"
        />
        <Button disabled={isSubmitting || !isValid} text="Set Royalty" type="submit" />
      </form>
    </Box>
  )
}

export default SetRoyaltyBlock

const schema = yup.object({
  id: yup
    .number()
    .transform((value) => (isNaN(value) ? -1 : value))
    .min(0, 'NFT ID must be greater than or equal to 0')
    .required('NFT ID is a required field'),
  amount: yup
    .number()
    .min(0, 'Royalty must be greater or equal to 0')
    .max(100, 'Royalty must be lower or equal to 100')
    .required('A royalty percentage is required'),
})
