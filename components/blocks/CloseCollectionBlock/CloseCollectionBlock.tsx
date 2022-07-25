import { useForm, SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { closeCollection } from 'ternoa-js/nft'

import Box from 'components/base/Box/Box'
import Button from 'components/ui/Button/Button'
import Input from 'components/ui/Input'

import styles from './CloseCollectionBlock.module.scss'

type IForm = {
  id: number
}

interface Props {
  signableCallback: (txHashHex: `0x${string}`) => void
}

const CloseCollectionBlock = ({ signableCallback }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>({
    resolver: yupResolver(schema),
    defaultValues: {},
  })

  const onSubmit: SubmitHandler<IForm> = async ({ id }) => {
    const closeCollectionTxHex = await closeCollection(id)
    signableCallback(closeCollectionTxHex)
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
      codeSnippetLink="https://ternoa-js.ternoa.dev/modules.html#closeCollection"
      codeSnippetTitle="Ternoa-JS: closeCollection "
      summary="Closes the collection so that no new NFTs can be added."
      title="Close Connection"
    >
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <Input
          className={styles.field}
          error={errors.id?.message}
          isError={Boolean(errors.id)}
          label="Collection ID"
          min={0}
          name="id"
          placeholder="Enter id of collection"
          register={register}
          required
        />
        <Button text="Create Collection" type="submit" />
      </form>
    </Box>
  )
}

export default CloseCollectionBlock

const schema = yup.object({
  id: yup.number().nullable().min(0, 'NFT ID must be greater than or equal to 0'),
})
