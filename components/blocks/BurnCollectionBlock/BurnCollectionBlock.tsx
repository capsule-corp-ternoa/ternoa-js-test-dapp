import { useForm, SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { burnCollection } from 'ternoa-js/nft'

import Box from 'components/base/Box/Box'
import Button from 'components/ui/Button/Button'
import Input from 'components/ui/Input'

import styles from './BurnCollectionBlock.module.scss'

type IForm = {
  id: number
}

interface Props {
  signableCallback: (txHashHex: `0x${string}`) => void
}

const BurnCollectionBlock = ({ signableCallback }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>({
    resolver: yupResolver(schema),
    defaultValues: {},
  })

  const onSubmit: SubmitHandler<IForm> = async ({ id }) => {
    const burnCollectionTxHex = await burnCollection(id)
    signableCallback(burnCollectionTxHex)
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
      codeSnippetLink="https://ternoa-js.ternoa.dev/modules.html#burnCollection"
      codeSnippetTitle="Ternoa-JS: burnCollection "
      summary="Burns an existing collection. The collections needs to be empty before it can be burned."
      title="Burn Connection"
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
        <Button text="Burn Collection" type="submit" />
      </form>
    </Box>
  )
}

export default BurnCollectionBlock

const schema = yup.object({
  id: yup.number().required('Please provide an NFT ID.').min(0, 'NFT ID must be greater than or equal to 0'),
})
