import { useForm, SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { setRoyalty } from 'ternoa-js/nft'

import Box from 'components/base/Box/Box'
import Button from 'components/ui/Button/Button'
import Input from 'components/ui/Input'

import styles from './SetRoyaltyBlock.module.scss'

type IForm = {
  id: number
  amount: number
}

interface Props {
  signableCallback: (txHashHex: `0x${string}`) => void
}

const SetRoyaltyBlock = ({ signableCallback }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>({
    resolver: yupResolver(schema),
    defaultValues: {
      id: 0,
      amount: 0,
    },
  })

  const onSubmit: SubmitHandler<IForm> = async ({ id, amount }) => {
    const setRoyaltyTxHex = await setRoyalty(id, amount)
    signableCallback(setRoyaltyTxHex)
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
      codeSnippetLink="https://ternoa-js.ternoa.dev/modules.html#setRoyalty"
      codeSnippetTitle="Ternoa-JS: setRoyalty"
      summary="Sets the royalty of an NFT"
      title="Set Royalty"
    >
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <Input
          className={styles.field}
          error={errors.id?.message}
          isError={Boolean(errors.id)}
          label="NFT ID"
          min={0}
          name="id"
          placeholder="Enter id of NFT"
          register={register}
          required
        />

        <Input
          className={styles.field}
          error={errors.amount?.message}
          isError={Boolean(errors.amount)}
          label="Amount"
          name="amount"
          placeholder="Enter the amount of royalty"
          register={register}
          required
        />
        <Button text="Set Royalty" type="submit" />
      </form>
    </Box>
  )
}

export default SetRoyaltyBlock

const schema = yup.object({
  id: yup.number().required('Please provide an NFT ID.').min(0, 'NFT ID must be greater than or equal to 0'),
  amount: yup.number().min(0, 'Royalty must be greater or equal to 0').max(0, 'Royalty must be lower or equal to 100'),
})
