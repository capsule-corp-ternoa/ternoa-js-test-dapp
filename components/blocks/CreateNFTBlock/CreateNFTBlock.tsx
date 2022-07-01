import { useForm, SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { createNft } from 'ternoa-js/nft'

import Box from 'components/base/Box/Box'
import Input from 'components/ui/Input'

import styles from './CreateNFTBlock.module.scss'
import Button from 'components/ui/Button/Button'
import CheckBox from 'components/ui/CheckBox'

type IForm = {
  collectionId: number | null
  isSoulbond: boolean
  offchainData: string
  royalty: number
}

const CreateNFTBlock = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>({
    resolver: yupResolver(schema),
    defaultValues: {
      collectionId: null,
      isSoulbond: false,
      royalty: 0,
    },
  })
  const onSubmit: SubmitHandler<IForm> = ({ collectionId, isSoulbond, offchainData, royalty }) => createNft(offchainData, royalty, collectionId, isSoulbond)

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
    >
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <Input
          className={styles.field}
          error={errors.offchainData?.message}
          isError={Boolean(errors.offchainData)}
          label="Offchain Data"
          name="offchainData"
          placeholder="Enter NFT offchain data"
          register={register}
          required
        />
        <Input
          className={styles.field}
          error={errors.royalty?.message}
          insight="optionnal"
          isError={Boolean(errors.royalty)}
          label="Royalty"
          max={100}
          min={0}
          name="royalty"
          register={register}
        />
        <Input
          className={styles.field}
          error={errors.collectionId?.message}
          insight="optionnal"
          isError={Boolean(errors.collectionId)}
          label="Collection ID"
          min={0}
          name="collectionId"
          placeholder="Enter a collection ID for your NFT"
          register={register}
        />
        <CheckBox className={styles.checkbox} error={errors.isSoulbond?.message} label="Is it a soulbond NFT ?" name="isSoulbond" register={register} />
        <Button text="Mint NFT" type="submit" />
      </form>
    </Box>
  )
}

export default CreateNFTBlock

const schema = yup.object({
  collectionId: yup.number().nullable().min(0, 'Collection must be greater than or equal to 0'),
  isSoulbond: yup.boolean(),
  offchainData: yup.string().required('Please provide offchain data.').max(150, 'Only 150 characters are allowed'),
  royalty: yup.number().min(0, 'Royalty must be greater or equal to 0').max(0, 'Royalty must be lower or equal to 0'),
})