import React, { useEffect, useState } from 'react'
import { Control, Controller, Path, UseFormRegister } from 'react-hook-form'
import FormControl from '@mui/material/FormControl'
import { gql } from 'graphql-request'

import Input from 'components/ui/Input'
import Select from 'components/ui/Select'
import { NFTMetadataType } from 'interfaces'
import { INFTEntities } from 'interfaces/queries'
import { useAppSelector } from 'redux/hooks'
import { apiIndexer, fetchIPFSMetadata } from 'utils/data'

interface Props<T> {
  control: Control<T, any>
  error?: string
  isError: boolean
  name: Path<T>
  register: UseFormRegister<T>
  required?: boolean
}

type NFTItemType = {
  value: number
  label: string
}

function NFTIdField<T>({ control, error, isError, name, register, required = false }: Props<T>) {
  const { app } = useAppSelector((state) => state.app)
  const { user } = useAppSelector((state) => state.user)
  const { wssEndpoint } = app
  const { isConnectedPolkadot, polkadotWallet } = user

  const [isLoading, setLoading] = useState(false)
  const [NFTs, setNFTs] = useState<NFTItemType[]>([])

  const queryUserNFTs = (address: string) => gql`
  {
    nftEntities(
      orderBy: [TIMESTAMP_CREATE_DESC]
      filter: {
        and: [
          {owner: { equalTo: "${address}" }}
        ]
      }
    ) {
      totalCount
      nodes {
        nftId
        offchainData
      }
    }
  }
`

  useEffect(() => {
    let shouldUpdate = true
    const loadNFTs = async () => {
      if (polkadotWallet !== undefined) {
        setLoading(true)
        try {
          const { nftEntities }: INFTEntities = await apiIndexer(wssEndpoint, queryUserNFTs(polkadotWallet.address))
          const nfts: NFTItemType[] = await Promise.all(
            nftEntities.nodes.map(async ({ nftId, offchainData }) => {
              try {
                const res = await fetchIPFSMetadata<NFTMetadataType>(offchainData)
                const nftTitle = res?.title || nftId
                return {
                  value: Number(nftId),
                  label: nftTitle,
                }
              } catch {
                return {
                  value: Number(nftId),
                  label: nftId,
                }
              }
            })
          )
          if (shouldUpdate) {
            setNFTs(nfts)
            setLoading(false)
          }
        } catch (error) {
          console.log(error)
          setLoading(false)
        }
      }
    }

    loadNFTs()
    return () => {
      shouldUpdate = false
    }
  }, [polkadotWallet, wssEndpoint])

  if (isConnectedPolkadot) {
    return (
      <FormControl fullWidth>
        <Controller
          name={name}
          control={control}
          render={({ field: { onChange, value } }) => (
            <Select
              error={error}
              insight={required ? undefined : 'optional'}
              isLoading={isLoading}
              label="NFT ID"
              noItemText="No personal NFTs found"
              placeholder="Enter an NFT ID"
              items={NFTs}
              onChange={onChange}
              value={value ? Number(value) : ''}
            />
          )}
        />
      </FormControl>
    )
  }

  return (
    <Input
      error={error}
      insight={required ? undefined : 'optional'}
      isError={isError}
      label="NFT ID"
      min={0}
      name={name}
      placeholder="Enter an NFT ID"
      register={register}
      required={required}
    />
  )
}

export default NFTIdField
