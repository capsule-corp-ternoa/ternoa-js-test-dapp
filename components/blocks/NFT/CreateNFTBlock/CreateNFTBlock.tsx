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
          The only required field is <b>Offchain Data</b> which is related to NFT&apos;s metadata. It can be an IPFS Hash, an URL or plain text. (max: 150
          characters)
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
    formState: { errors, isSubmitting, isValid },
  } = useForm<IForm>({
    resolver: yupResolver(schema),
    mode: 'onChange',
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
      import { initializeApi } from "ternoa-js"
      import { createNft } from "ternoa-js/nft"
      
      const createMyFirstNFT = async () => {
        try {
          // We initialize the API instance
          await initializeApi()
      
          ... //we asume your keyring is already created and provided with CAPS to support transactions fees.  
      
          // Here we create, sign and submit the NFT transaction with your keyring
          const newNFTEvent = await createNft("My first NFT", 10, undefined, false, keyring, WaitUntil.BlockInclusion)
      
          // Do something with the NFTCreatedEvent response
          console.log(newNFTEvent);
          ...
      
        } catch (e) {
          console.log(e)
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
          insight="optional"
          isError={Boolean(errors.royalty)}
          label="Royalty"
          max={100}
          min={0}
          name="royalty"
          register={register}
          type="number"
        />
        <CollectionIdField
          control={control}
          error={errors.collectionId?.message}
          isError={Boolean(errors.collectionId)}
          name="collectionId"
          register={register}
        />
        <CheckBox error={errors.isSoulbond?.message} label="Is it a soulbond NFT ?" name="isSoulbond" register={register} />
        <Button disabled={isSubmitting || !isValid} text="Mint NFT" type="submit" />
      </form>
    </Box>
  )
}

export default CreateNFTBlock

const schema = yup.object({
  collectionId: yup
    .number()
    .transform((value) => (isNaN(value) ? -1 : value))
    .nullable()
    .min(0, 'Collection must be greater than or equal to 0'),
  isSoulbond: yup.boolean(),
  offchainData: yup.string().required('Please provide offchain data.').max(150, 'Only 150 characters are allowed'),
  royalty: yup.number().min(0, 'Royalty must be greater or equal to 0').max(100, 'Royalty must be lower or equal to 100'),
})
