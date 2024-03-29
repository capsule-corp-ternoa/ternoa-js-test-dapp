import React, { useEffect } from 'react'
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
import { useAppSelector } from 'redux/hooks'

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
  const { user } = useAppSelector((state) => state.user)
  const { polkadotWallet } = user
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    reset,
  } = useForm<IForm>({
    resolver: yupResolver(schema),
    defaultValues: {},
    mode: 'onChange',
  })

  const onSubmit: SubmitHandler<IForm> = async ({ id, limit }) => {
    const limitCollectionTxHex = await limitCollectionTx(id, limit)
    signableCallback(limitCollectionTxHex)
  }

  useEffect(() => {
    reset()
  }, [polkadotWallet, reset])

  return (
    <Box
      codeSnippet={`
      import { initializeApi } from "ternoa-js"
      import { limitCollection } from "ternoa-js/nft"
      
      ... //we asume the API instance is already initialize
      ... //and your keyring is already created and provided with CAPS to support transactions fees.  

      const limitMyCollection = async () => {
        try {

          // Here you limit your collection by COLLECTION_LIMIT
          const limitedCollectionEvent = await limitCollection(YOUR_COLLECTION_ID, COLLECTION_LIMIT, keyring, WaitUntil.BlockInclusion)
      
        } catch (e) {
          console.log(e)
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
    .transform((value) => (isNaN(value) ? undefined : value))
    .min(0, 'Collection ID must be greater than or equal to 0')
    .required('Collection ID is a required field'),
  limit: yup
    .number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .min(0, 'Limit must be greater or equal to 0')
    .max(1000000, 'Limit must be lower or equal to 1 million')
    .required('Limit is a required field'),
})
