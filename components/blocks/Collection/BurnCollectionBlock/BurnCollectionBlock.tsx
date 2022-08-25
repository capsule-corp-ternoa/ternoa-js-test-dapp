import React, { useEffect } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import Tooltip from '@mui/material/Tooltip'
import InfoIcon from '@mui/icons-material/Info'
import { TransactionHashType } from 'ternoa-js'
import { burnCollectionTx } from 'ternoa-js/nft'

import Box from 'components/base/Box/Box'
import CollectionIdField from 'components/base/Fields/CollectionIdField'
import Button from 'components/ui/Button/Button'
import { useAppSelector } from 'redux/hooks'

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
        The only required field is <b>Collection ID</b> which contains the id of the collection to burn.
      </p>
    }
  >
    <InfoIcon />
  </Tooltip>
)

const BurnCollectionBlock = ({ signableCallback }: Props) => {
  const { user } = useAppSelector((state) => state.user)
  const { collections, polkadotWallet } = user
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    reset,
  } = useForm<IForm>({
    resolver: yupResolver(schema),
    defaultValues: {},
    mode: 'onChange',
  })

  const onSubmit: SubmitHandler<IForm> = async ({ id }) => {
    const burnCollectionTxHex = await burnCollectionTx(id)
    signableCallback(burnCollectionTxHex)
  }

  useEffect(() => {
    reset()
  }, [collections, polkadotWallet, reset])

  return (
    <Box
      codeSnippet={`
      import { initializeApi } from "ternoa-js"
      import { burnCollection } from "ternoa-js/nft"
      
      ... //we asume the API instance is already initialize
      ... //and your keyring is already created and provided with CAPS to support transactions fees.  

      const burnMyCollection = async () => {
        try {

          // Here we create, sign and submit the collection transaction with your keyring
          const burnedCollectionEvent = await burnCollection(YOUR_COLLECTION_ID, keyring, WaitUntil.BlockInclusion)
      
        } catch (e) {
          console.log(e)
        }
      }
    `}
      codeSnippetLink="https://ternoa-js.ternoa.dev/modules.html#burnCollection"
      codeSnippetTitle="Ternoa-JS: burnCollection "
      summary="Burns an existing collection. The collections needs to be empty before it can be burned."
      title="Burn Connection"
      tooltip={<Tips />}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <CollectionIdField control={control} error={errors.id?.message} isError={Boolean(errors.id)} name="id" register={register} required />
        <Button disabled={isSubmitting || !isValid} text="Burn Collection" type="submit" />
      </form>
    </Box>
  )
}

export default BurnCollectionBlock

const schema = yup.object({
  id: yup
    .number()
    .transform((value) => (isNaN(value) ? -1 : value))
    .min(0, 'Collection ID must be greater than or equal to 0')
    .required('Collection ID is a required field'),
})
