import { useForm, SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import Tooltip from '@mui/material/Tooltip'
import InfoIcon from '@mui/icons-material/Info'
import { TransactionHashType } from 'ternoa-js'
import { closeCollectionTx } from 'ternoa-js/nft'

import Box from 'components/base/Box/Box'
import CollectionIdField from 'components/base/Fields/CollectionIdField'
import Button from 'components/ui/Button/Button'

type IForm = {
  id: number
}

interface Props {
  signableCallback: (txHashHex: TransactionHashType) => void
}

const Tips = () => (
  <Tooltip
    title={
      <p>
        The only required field is <b>Collection ID</b> which contains the id of the collection to close.
      </p>
    }
  >
    <InfoIcon />
  </Tooltip>
)

const CloseCollectionBlock = ({ signableCallback }: Props) => {
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

  const onSubmit: SubmitHandler<IForm> = async ({ id }) => {
    const closeCollectionTxHex = await closeCollectionTx(id)
    signableCallback(closeCollectionTxHex)
  }

  return (
    <Box
      codeSnippet={`
      import { closeCollection } from "ternoa-js/nft";
    
      const closeMyCollection = async (collectionId: number, keyring: KeyringPair) => {
        try {
            await closeCollection(collectionId, keyring, WaitUntil.BlockInclusion)
        } catch(error) {
            console.error(error)
        }
      }
    `}
      codeSnippetLink="https://ternoa-js.ternoa.dev/modules.html#closeCollection"
      codeSnippetTitle="Ternoa-JS: closeCollection "
      summary="Closes the collection so that no new NFTs can be added."
      title="Close Connection"
      tooltip={<Tips />}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <CollectionIdField control={control} error={errors.id?.message} isError={Boolean(errors.id)} name="id" register={register} required />
        <Button disabled={isSubmitting || !isValid} text="Create Collection" type="submit" />
      </form>
    </Box>
  )
}

export default CloseCollectionBlock

const schema = yup.object({
  id: yup
    .number()
    .transform((value) => (isNaN(value) ? -1 : value))
    .min(0, 'Collection ID must be greater than or equal to 0')
    .required('Collection ID is a required field'),
})
