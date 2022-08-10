import { useForm, SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { TransactionHashType } from 'ternoa-js'
import { delegateNftTx } from 'ternoa-js/nft'

import Box from 'components/base/Box/Box'
import Button from 'components/ui/Button/Button'
import Input from 'components/ui/Input'

type IForm = {
  id: number
  recipient: string | undefined
}

interface Props {
  signableCallback: (txHashHex: TransactionHashType) => void
}

const DelegateNFTBlock = ({ signableCallback }: Props) => {
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
    const delegateNftTxHex = await delegateNftTx(id, recipient)
    signableCallback(delegateNftTxHex)
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
      codeSnippetLink="https://ternoa-js.ternoa.dev/modules.html#delegateNft"
      codeSnippetTitle="Ternoa-JS: delegateNFT"
      summary="Delegates an NFT to someone"
      title="Delegate NFT"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          error={errors.id?.message}
          isError={Boolean(errors.id)}
          label="NFT ID"
          min={0}
          name="id"
          placeholder="Enter id of NFT to delegate"
          register={register}
          required
        />

        <Input
          error={errors.recipient?.message}
          isError={Boolean(errors.recipient)}
          label="Recipient"
          name="recipient"
          placeholder="Enter destination account"
          register={register}
          required
        />
        <Button text="Delegate NFT" type="submit" />
      </form>
    </Box>
  )
}

export default DelegateNFTBlock

const schema = yup.object({
  nft_id: yup.number().required('Please provide an NFT ID.').min(0, 'NFT ID must be greater than or equal to 0'),
  recipient: yup.string().required('PLease set destination account').max(150, 'Only 150 characters are allowed'),
})
