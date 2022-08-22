import React, { useEffect } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import Tooltip from '@mui/material/Tooltip'
import InfoIcon from '@mui/icons-material/Info'
import { TransactionHashType } from 'ternoa-js'
import { isValidAddress } from 'ternoa-js/blockchain'
import { setMarketplaceOwnerTx } from 'ternoa-js/marketplace'

import Box from 'components/base/Box/Box'
import MarketplaceIdField from 'components/base/Fields/MarketplaceIdField'
import Button from 'components/ui/Button/Button'
import Input from 'components/ui/Input/Input'
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
          <b>Marketplace ID</b> contains the id of the marketplace to update kind.
        </p>
        <p>
          <b>Owner</b> contains the Ternoa address of the new marketplace owner.
        </p>
      </>
    }
  >
    <InfoIcon />
  </Tooltip>
)

const SetMarketplaceOwnerBlock = ({ signableCallback }: Props) => {
  const { user } = useAppSelector((state) => state.user)
  const { marketplaces, polkadotWallet } = user
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    reset,
  } = useForm<IForm>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  })

  const onSubmit: SubmitHandler<IForm> = async ({ id, recipient }) => {
    const setMarketplaceOwnerTxHex = await setMarketplaceOwnerTx(id, recipient)
    signableCallback(setMarketplaceOwnerTxHex)
  }

  useEffect(() => {
    reset()
  }, [marketplaces, polkadotWallet, reset])

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
      tooltip={<Tips />}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <MarketplaceIdField control={control} error={errors.id?.message} isError={Boolean(errors.id)} name="id" register={register} required />
        <Input
          error={errors.recipient?.message}
          isError={Boolean(errors.recipient)}
          label="Recipient"
          name="recipient"
          placeholder="Enter the Ternoa address of new marketplace owner"
          register={register}
          required
        />
        <Button disabled={isSubmitting || !isValid} text="Set Owner" type="submit" />
      </form>
    </Box>
  )
}

export default SetMarketplaceOwnerBlock

const schema = yup.object({
  id: yup
    .number()
    .transform((value) => (isNaN(value) ? -1 : value))
    .min(0, 'Marketplace ID must be greater than or equal to 0')
    .required('Marketplace ID is a required field'),
  recipient: yup
    .string()
    .test('Recipient Ternoa address', 'A valid Ternoa address must be entered', (item) => {
      if (item) return isValidAddress(item)
      return true
    })
    .required('A Ternoa address is required'),
})
