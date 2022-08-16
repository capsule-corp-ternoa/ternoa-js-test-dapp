import { useForm, SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import Tooltip from '@mui/material/Tooltip'
import InfoIcon from '@mui/icons-material/Info'
import { TransactionHashType } from 'ternoa-js'
import { createNftTx } from 'ternoa-js/nft'

import Box from 'components/base/Box/Box'
import CollectionIdField from 'components/base/Fields/CollectionIdField'
import Button from 'components/ui/Button/Button'
import CheckBox from 'components/ui/CheckBox'
import Input from 'components/ui/Input'

type IForm = {
  collectionId?: number
  isSoulbond: boolean
  offchainData: string
  royalty: number
}

interface Props {
  signableCallback: (txHashHex: TransactionHashType) => void
}

const Tips = () => (
  <Tooltip
    title={
      <>
        <p>
          The only required field is <b>Offchain Data</b> which is related to NFT&apos;s metadata. It can be an IPFS Hash, an URL or plain text.
        </p>
        <p>
          <b>Royalty</b> is the percentage of all second sales that the creator will receive. It is a decimal number in range [0, 100] with a default value set
          to 0.
        </p>
        <p>
          <b>Collection ID</b> represents the collection where this NFT will belong.
        </p>
        <p>
          <b>Soulbound</b> makes the NFT untransferable, it will always be owned be the creator.
        </p>
      </>
    }
  >
    <InfoIcon />
  </Tooltip>
)

const CreateNFTBlock = ({ signableCallback }: Props) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>({
    resolver: yupResolver(schema),
    defaultValues: {
      isSoulbond: false,
      royalty: 0,
    },
  })

  const onSubmit: SubmitHandler<IForm> = async ({ collectionId, isSoulbond, offchainData, royalty }) => {
    const createNftTxHex = await createNftTx(offchainData, royalty, collectionId, isSoulbond)
    signableCallback(createNftTxHex)
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
      codeSnippetLink="https://ternoa-js.ternoa.dev/modules.html#createNft"
      codeSnippetTitle="Ternoa-JS: createNFT"
      summary="Create a new NFT on blockchain with the provided details."
      title="Create NFT"
      tooltip={<Tips />}
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
          error={errors.royalty?.message}
          insight="optionnal"
          isError={Boolean(errors.royalty)}
          label="Royalty"
          max={100}
          min={0}
          name="royalty"
          register={register}
        />
        <CollectionIdField
          control={control}
          error={errors.collectionId?.message}
          isError={Boolean(errors.collectionId)}
          name="collectionId"
          register={register}
        />
        <CheckBox error={errors.isSoulbond?.message} label="Is it a soulbond NFT ?" name="isSoulbond" register={register} />
        <Button text="Mint NFT" type="submit" />
      </form>
    </Box>
  )
}

export default CreateNFTBlock

const schema = yup.object({
  collectionId: yup
    .number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .nullable()
    .min(0, 'Collection must be greater than or equal to 0'),
  isSoulbond: yup.boolean(),
  offchainData: yup.string().required('Please provide offchain data.').max(150, 'Only 150 characters are allowed'),
  royalty: yup.number().min(0, 'Royalty must be greater or equal to 0').max(0, 'Royalty must be lower or equal to 0'),
})
