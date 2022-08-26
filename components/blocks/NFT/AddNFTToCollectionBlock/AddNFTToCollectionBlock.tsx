import React, { useEffect } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import Tooltip from '@mui/material/Tooltip'
import InfoIcon from '@mui/icons-material/Info'
import { TransactionHashType } from 'ternoa-js'
import { addNftToCollectionTx } from 'ternoa-js/nft'

import Box from 'components/base/Box/Box'
import CollectionIdField from 'components/base/Fields/CollectionIdField'
import NFTIdField from 'components/base/Fields/NFTIdField'
import Button from 'components/ui/Button/Button'
import { useAppSelector } from 'redux/hooks'

type IForm = {
  nft_id: number
  collection_id: number
}

interface Props {
  signableCallback: (txHashHex: TransactionHashType) => void
}

const Tips = () => (
  <Tooltip
    title={
      <>
        <p>
          <b>NFT ID</b> contains the id of the NFT to add to a collection.
        </p>
        <p>
          <b>Collection ID</b> contains the id of the collection where the NFT will be added.
        </p>
      </>
    }
  >
    <InfoIcon />
  </Tooltip>
)

const AddNftToCollection = ({ signableCallback }: Props) => {
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

  const onSubmit: SubmitHandler<IForm> = async ({ nft_id, collection_id }) => {
    const addNftToCollectionTxHex = await addNftToCollectionTx(nft_id, collection_id)
    signableCallback(addNftToCollectionTxHex)
  }

  useEffect(() => {
    reset()
  }, [polkadotWallet, reset])

  return (
    <Box
      codeSnippet={`
      import { initializeApi } from "ternoa-js"
      import { addNftToCollection } from "ternoa-js/nft"
      
      ... //we asume the API instance is already initialize
      ... //and your keyring is already created and provided with CAPS to support transactions fees.

      ... //you also need to own a collection

      const addMyNFTToCollection = async () => {
        try {

          // Here you add your NFT to a specific collection that you own
          const addedEvent = await addNftToCollection(YOUR_NFT_ID, COLLECTION_ID, keyring, WaitUntil.BlockInclusion)
      
        } catch (e) {
          console.log(e)
        }
      }
    `}
      codeSnippetLink="https://ternoa-js.ternoa.dev/modules.html#addNftToCollection"
      codeSnippetTitle="Ternoa-JS: addNFTToCollection"
      summary="Adds an NFT to an existing collection."
      title="Add NFT to collection"
      tooltip={<Tips />}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <NFTIdField control={control} error={errors.nft_id?.message} isError={Boolean(errors.nft_id)} name="nft_id" register={register} required />
        <CollectionIdField
          control={control}
          error={errors.collection_id?.message}
          isError={Boolean(errors.collection_id)}
          name="collection_id"
          register={register}
          required
        />
        <Button disabled={isSubmitting || !isValid} text="Add NFT to collection" type="submit" />
      </form>
    </Box>
  )
}

export default AddNftToCollection

const schema = yup.object({
  nft_id: yup
    .number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .min(0, 'NFT ID must be greater than or equal to 0')
    .required('NFT ID is a required field'),
  collection_id: yup
    .number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .min(0, 'Collection ID must be greater than or equal to 0')
    .required('Collection ID is a required field'),
})
