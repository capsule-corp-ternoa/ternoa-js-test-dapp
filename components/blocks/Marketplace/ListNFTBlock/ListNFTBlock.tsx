import React, { useEffect } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import Tooltip from '@mui/material/Tooltip'
import InfoIcon from '@mui/icons-material/Info'
import { TransactionHashType } from 'ternoa-js'
import { listNftTx } from 'ternoa-js/marketplace'

import Box from 'components/base/Box/Box'
import MarketplaceIdField from 'components/base/Fields/MarketplaceIdField'
import NFTIdField from 'components/base/Fields/NFTIdField'
import Button from 'components/ui/Button/Button'
import Input from 'components/ui/Input/Input'
import { useAppSelector } from 'redux/hooks'

type IForm = {
  nft_id: number
  marketplace_id: number
  price: number
}

interface Props {
  signableCallback: (txHashHex: TransactionHashType) => void
}

const Tips = () => (
  <Tooltip
    title={
      <>
        <p>
          <b>NFT ID</b> contains the id of the NFT to list.
        </p>
        <p>
          <b>Marketplace ID</b> contains the id of the marketplace where NFT will be listed.
        </p>
        <p>
          <b>Price</b> contains the listing $CAPS price of the NFT.
        </p>
      </>
    }
  >
    <InfoIcon />
  </Tooltip>
)

const ListNFTBlock = ({ signableCallback }: Props) => {
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

  const onSubmit: SubmitHandler<IForm> = async ({ nft_id, marketplace_id, price }) => {
    const listNftTxHex = await listNftTx(nft_id, marketplace_id, price)
    signableCallback(listNftTxHex)
  }

  useEffect(() => {
    reset()
  }, [polkadotWallet, reset])

  return (
    <Box
      codeSnippet={`
      import { initializeApi } from "ternoa-js"
      import { listNft } from "ternoa-js/marketplace"

      ... //we asume the API instance is already initialize
      ... //and your keyring is already created and provided with CAPS to support transactions fees. 
      
      const listMyFirstNFT = async () => {
        try { 

          // Here we create, sign and submit the Marketplace NFT listing transaction with your keyring
          const listNFTEvent = await listNft(NFT_ID, MARKETPLACE_IS, NFT_LISTING_PRICE, keyring, WaitUntil.BlockInclusion)
      
        } catch (e) {
          console.log(e)
        }
      }
    `}
      codeSnippetLink="https://ternoa-js.ternoa.dev/modules.html#listNft"
      codeSnippetTitle="Ternoa-JS: listNft"
      summary="Lists an NFT on a marketplace"
      title="List NFT"
      tooltip={<Tips />}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <NFTIdField control={control} error={errors.nft_id?.message} isError={Boolean(errors.nft_id)} name="nft_id" register={register} required />
        <MarketplaceIdField
          control={control}
          error={errors.marketplace_id?.message}
          isError={Boolean(errors.marketplace_id)}
          name="marketplace_id"
          register={register}
          required
        />
        <Input
          error={errors.price?.message}
          isError={Boolean(errors.price)}
          label="Price"
          min={0}
          name="price"
          placeholder="Enter NFT listing price"
          register={register}
          type="number"
          required
        />
        <Button disabled={isSubmitting || !isValid} text="List NFT" type="submit" />
      </form>
    </Box>
  )
}

export default ListNFTBlock

const schema = yup.object({
  nft_id: yup
    .number()
    .transform((value) => (isNaN(value) ? -1 : value))
    .min(0, 'NFT ID must be greater than or equal to 0')
    .required('NFT ID is a required field'),
  marketplace_id: yup
    .number()
    .transform((value) => (isNaN(value) ? -1 : value))
    .min(0, 'Marketplace ID must be greater than or equal to 0')
    .required('Marketplace ID is a required field'),
  price: yup
    .number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .min(0, 'Price must be greater or equal to 0')
    .required('Price is a required field'),
})
