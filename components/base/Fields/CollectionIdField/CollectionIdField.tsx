import React, { useEffect, useState } from 'react'
import { Control, Controller, Path, UseFormRegister } from 'react-hook-form'
import FormControl from '@mui/material/FormControl'
import { gql } from 'graphql-request'

import Input from 'components/ui/Input'
import Select from 'components/ui/Select'
import { CollectionMetadataType } from 'interfaces'
import { ICollectionEntities } from 'interfaces/queries'
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

type CollectionItemType = {
  value: number
  label: string
}

function CollectionIdField<T>({ control, error, isError, name, register, required = false }: Props<T>) {
  const { app } = useAppSelector((state) => state.app)
  const { user } = useAppSelector((state) => state.user)
  const { wssEndpoint } = app
  const { isConnectedPolkadot, polkadotWallet } = user

  const [isLoading, setLoading] = useState(false)
  const [collections, setCollections] = useState<CollectionItemType[]>([])

  const queryUserCollections = (address: string) => gql`
  {
    collectionEntities(
      orderBy: [TIMESTAMP_CREATE_DESC]
      filter: {
        and: [
          {owner: { equalTo: "${address}" }}
          {isClosed: {equalTo: false }}
          {hasReachedLimit: {equalTo: false }}
        ]
      }
    ) {
      totalCount
      nodes {
        collectionId
        offchainData
      }
    }
  }
`

  useEffect(() => {
    let shouldUpdate = true
    const loadCollections = async () => {
      if (polkadotWallet !== undefined) {
        setLoading(true)
        try {
          const { collectionEntities }: ICollectionEntities = await apiIndexer(wssEndpoint, queryUserCollections(polkadotWallet.address))
          const collections: CollectionItemType[] = await Promise.all(
            collectionEntities.nodes.map(async ({ collectionId, offchainData }) => {
              try {
                const res = await fetchIPFSMetadata<CollectionMetadataType>(offchainData)
                const collectionTitle = res?.name || collectionId
                return {
                  value: Number(collectionId),
                  label: collectionTitle,
                }
              } catch {
                return {
                  value: Number(collectionId),
                  label: collectionId,
                }
              }
            })
          )
          if (shouldUpdate) {
            setCollections(collections)
            setLoading(false)
          }
        } catch (error) {
          console.log(error)
          setLoading(false)
        }
      }
    }

    loadCollections()
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
              insight={required ? undefined : 'optionnal'}
              isLoading={isLoading}
              label="Collection ID"
              noItemText="No personal collections found"
              placeholder="Enter a collection ID"
              items={collections}
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
      insight={required ? undefined : 'optionnal'}
      isError={isError}
      label="Collection ID"
      min={0}
      name={name}
      placeholder="Enter a collection ID for your NFT"
      register={register}
      required={required}
    />
  )
}

export default CollectionIdField
