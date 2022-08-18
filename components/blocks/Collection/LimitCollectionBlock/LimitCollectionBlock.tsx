import { useForm, SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import Tooltip from '@mui/material/Tooltip'
import InfoIcon from '@mui/icons-material/Info'
import { TransactionHashType } from 'ternoa-js'
import { limitCollectionTx } from 'ternoa-js/nft'

import Box from 'components/base/Box/Box'
import CollectionIdField from 'components/base/Fields/CollectionIdField'
import Button from 'components/ui/Button/Button'
import Input from 'components/ui/Input'

type IForm = {
  id: number
  limit: number
}

interface Props {
  signableCallback: (txHashHex: TransactionHashType) => void
}

const Tips = () => (
  <Tooltip
    title={
      <>
        <p>
          The <b>Collection ID</b> field contains the id of the collection to limit.
        </p>
        <p>
          The <b>Limit</b> input specified the limit of the collection. Limit must be greater or equal to 0 and lower or equal to 1 million.
        </p>
      </>
    }
  >
    <InfoIcon />
  </Tooltip>
)

const LimitCollectionBlock = ({ signableCallback }: Props) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<IForm>({
    resolver: yupResolver(schema),
    defaultValues: {},
    mode: 'onChange',
  })

  const onSubmit: SubmitHandler<IForm> = async ({ id, limit }) => {
    const limitCollectionTxHex = await limitCollectionTx(id, limit)
    signableCallback(limitCollectionTxHex)
  }

  return (
    <Box
      codeSnippet={`
      import { limitCollection } from "ternoa-js/nft";
    
      const limitMyCollection = async (collectionId: number, limit: number, keyring: KeyringPair) => {
        try {
            await limitCollection(collectionId, limit, keyring, WaitUntil.BlockInclusion)
        } catch(error) {
            console.error(error)
        }
      }
    `}
      codeSnippetLink="https://ternoa-js.ternoa.dev/modules.html#limitCollection"
      codeSnippetTitle="Ternoa-JS: limitCollection"
      summary="Limits how many NFTs can be associated with this collection."
      title="Limit Collection"
      tooltip={<Tips />}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <CollectionIdField control={control} error={errors.id?.message} isError={Boolean(errors.id)} name="id" register={register} required />
        <Input
          error={errors.limit?.message}
          isError={Boolean(errors.limit)}
          label="Limit"
          min={0}
          name="limit"
          placeholder="Enter the collection limit"
          register={register}
          required
          type="number"
        />
        <Button disabled={isSubmitting || !isValid} text="Limit Collection" type="submit" />
      </form>
    </Box>
  )
}

export default LimitCollectionBlock

const schema = yup.object({
  id: yup
    .number()
    .transform((value) => (isNaN(value) ? -1 : value))
    .min(0, 'Collection ID must be greater than or equal to 0')
    .required('Collection ID is a required field'),
  limit: yup
    .number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .min(0, 'Limit must be greater or equal to 0')
    .max(1000000, 'Limit must be lower or equal to 1 million')
    .required('Limit is a required field'),
})
