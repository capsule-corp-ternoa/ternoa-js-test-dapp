import { useForm, SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { limitCollection } from 'ternoa-js/nft'

import Box from 'components/base/Box/Box'
import Button from 'components/ui/Button/Button'
import Input from 'components/ui/Input'

import styles from './LimitCollectionBlock.module.scss'

type IForm = {
  id: number
  limit: number
}

interface Props {
  signableCallback: (txHashHex: `0x${string}`) => void
}

const LimitCollectionBlock = ({ signableCallback }: Props) => {
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

  const onSubmit: SubmitHandler<IForm> = async ({ id, limit }) => {
    const limitCollectionTxHex = await limitCollection(id, limit)
    signableCallback(limitCollectionTxHex)
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
      codeSnippetLink="https://ternoa-js.ternoa.dev/modules.html#limitCollection"
      codeSnippetTitle="Ternoa-JS: limitCollection"
      summary="Limits how many NFTs can be associated with this collection."
      title="Limit Collection"
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
        <Input
          className={styles.field}
          error={errors.limit?.message}
          insight="optionnal"
          isError={Boolean(errors.limit)}
          label="Limit"
          min={0}
          name="limit"
          placeholder="Enter a limit amounts of NFT"
          register={register}
        />
        <Button text="Limit Collection" type="submit" />
      </form>
    </Box>
  )
}

export default LimitCollectionBlock

const schema = yup.object({
  id: yup.number().nullable().min(0, 'NFT ID must be greater than or equal to 0'),
  limit: yup.number().min(0, 'Limit must be greater or equal to 0').max(0, 'Limit must be lower or equal to 0'),
})
