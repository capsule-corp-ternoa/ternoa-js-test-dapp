import { useForm, SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { createCollectionTx } from 'ternoa-js/nft'

import Box from 'components/base/Box/Box'
import Button from 'components/ui/Button/Button'
import Input from 'components/ui/Input'

type IForm = {
  offchainData: string
  limit: number
}

interface Props {
  signableCallback: (txHashHex: `0x${string}`) => void
}

const CreateCollectionBlock = ({ signableCallback }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>({
    resolver: yupResolver(schema),
    defaultValues: {
      limit: 0,
    },
  })

  const onSubmit: SubmitHandler<IForm> = async ({ offchainData, limit }) => {
    const createCollectionTxHex = await createCollectionTx(offchainData, limit)
    signableCallback(createCollectionTxHex)
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
      codeSnippetLink="https://ternoa-js.ternoa.dev/modules.html#createCollection"
      codeSnippetTitle="Ternoa-JS: createCollection "
      summary="Create a new collection on blockchain with the provided details."
      title="Create Collection"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          error={errors.offchainData?.message}
          isError={Boolean(errors.offchainData)}
          label="Offchain Data"
          name="offchainData"
          placeholder="Enter NFT offchain data"
          register={register}
          required
        />
        <Input
          error={errors.limit?.message}
          insight="optionnal"
          isError={Boolean(errors.limit)}
          label="Limit"
          min={0}
          name="limit"
          placeholder="Enter a limit amounts of NFT"
          register={register}
        />
        <Button text="Create Collection" type="submit" />
      </form>
    </Box>
  )
}

export default CreateCollectionBlock

const schema = yup.object({
  offchainData: yup.string().required('Please provide offchain data.').max(150, 'Only 150 characters are allowed'),
  limit: yup.number().min(0, 'Limit must be greater or equal to 0').max(0, 'Limit must be lower or equal to 1 million'),
})
