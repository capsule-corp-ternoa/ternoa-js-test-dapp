import { useForm, SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { addNftToCollectionTx } from 'ternoa-js/nft'

import Box from 'components/base/Box/Box'
import Button from 'components/ui/Button/Button'
import Input from 'components/ui/Input'

type IForm = {
  nft_id: number
  collection_id: number
}

interface Props {
  signableCallback: (txHashHex: `0x${string}`) => void
}

const AddNftToCollection = ({ signableCallback }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>({
    resolver: yupResolver(schema),
    defaultValues: {
      nft_id: 0,
      collection_id: 0,
    },
  })

  const onSubmit: SubmitHandler<IForm> = async ({ nft_id, collection_id }) => {
    const addNftToCollectionTxHex = await addNftToCollectionTx(nft_id, collection_id)
    signableCallback(addNftToCollectionTxHex)
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
      codeSnippetLink="https://ternoa-js.ternoa.dev/modules.html#addNftToCollection"
      codeSnippetTitle="Ternoa-JS: addNFTToCollection"
      summary="Adds an NFT to an existing collection."
      title="Add NFT to collection"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          error={errors.nft_id?.message}
          isError={Boolean(errors.nft_id)}
          label="NFT ID"
          min={0}
          name="nft_id"
          placeholder="Enter id of NFT"
          register={register}
          required
        />
        <Input
          error={errors.collection_id?.message}
          isError={Boolean(errors.collection_id)}
          label="Collection ID"
          min={0}
          name="collection_id"
          placeholder="Enter id of Collection"
          register={register}
          required
        />
        <Button text="Add NFT to collection" type="submit" />
      </form>
    </Box>
  )
}

export default AddNftToCollection

const schema = yup.object({
  nft_id: yup.number().required('Please provide an NFT ID.').min(0, 'NFT ID must be greater than or equal to 0'),
  collection_id: yup.number().required().min(0, 'Collection ID must be greater than or equal to 0'),
})
