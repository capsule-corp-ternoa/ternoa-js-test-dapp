import React, { useEffect } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import Tooltip from '@mui/material/Tooltip'
import InfoIcon from '@mui/icons-material/Info'
import { TransactionHashType } from 'ternoa-js'
import { isValidAddress } from 'ternoa-js/blockchain'
import { delegateNftTx } from 'ternoa-js/nft'

import Box from 'components/base/Box/Box'
import NFTIdField from 'components/base/Fields/NFTIdField'
import Button from 'components/ui/Button/Button'
import Input from 'components/ui/Input'
import { useAppSelector } from 'redux/hooks'

type IForm = {
  id: number
  recipient: string | undefined
}

const Tips = () => (
  <Tooltip
    title={
      <>
        <p>
          The only required field is <b>NFT ID</b> which contains the id of the NFT to delegate or undelegate.
        </p>
        <p>
          <b>Recipient</b> is optional. NFT will be delegate to the Ternoa recipient address specified without lossing ownership. If this field stays empty, the
          NFT will be undelegate.
        </p>
      </>
    }
  >
    <InfoIcon />
  </Tooltip>
)

interface Props {
  signableCallback: (txHashHex: TransactionHashType) => void
}

const DelegateNFTBlock = ({ signableCallback }: Props) => {
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

  const onSubmit: SubmitHandler<IForm> = async ({ id, recipient }) => {
    const delegateNftTxHex = await delegateNftTx(id, recipient)
    signableCallback(delegateNftTxHex)
  }

  useEffect(() => {
    reset()
  }, [polkadotWallet, reset])

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
      codeSnippetLink="https://ternoa-js.ternoa.dev/modules.html#delegateNft"
      codeSnippetTitle="Ternoa-JS: delegateNFT"
      summary="Delegates an NFT to someone"
      title="Delegate NFT"
      tooltip={<Tips />}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <NFTIdField control={control} error={errors.id?.message} isError={Boolean(errors.id)} name="id" register={register} required />
        <Input
          error={errors.recipient?.message}
          insight="optional"
          isError={Boolean(errors.recipient)}
          label="Recipient"
          name="recipient"
          placeholder="Enter recipient Ternoa address"
          register={register}
        />
        <Button disabled={isSubmitting || !isValid} text="Delegate NFT" type="submit" />
      </form>
    </Box>
  )
}

export default DelegateNFTBlock

const schema = yup.object({
  id: yup
    .number()
    .transform((value) => (isNaN(value) ? -1 : value))
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
