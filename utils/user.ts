import { CollectionMetadataType, NFTMetadataType, SelectItemType } from 'interfaces'
import { ICollectionEntities, INFTEntities } from 'interfaces/queries'

import { apiIndexer, fetchIPFSMetadata } from './data'
import { queryUserCollections, queryUserNFTs } from './queries'

export const loadUserNFTs = async (wssEndpoint: string, address: string) => {
  const { nftEntities }: INFTEntities = await apiIndexer(wssEndpoint, queryUserNFTs(address))
  const nfts: SelectItemType[] = await Promise.all(
    nftEntities.nodes.map(async ({ nftId, offchainData }) => {
      try {
        const res = await fetchIPFSMetadata<NFTMetadataType>(offchainData)
        const nftTitle = res?.title || nftId
        return {
          value: Number(nftId),
          label: nftId === nftTitle ? nftId : `${nftId}: ${nftTitle}`,
        }
      } catch {
        return {
          value: Number(nftId),
          label: nftId,
        }
      }
    })
  )

  return nfts
}

export const loadUserCollections = async (wssEndpoint: string, address: string) => {
  const { collectionEntities }: ICollectionEntities = await apiIndexer(wssEndpoint, queryUserCollections(address))
  const collections: SelectItemType[] = await Promise.all(
    collectionEntities.nodes.map(async ({ collectionId, offchainData }) => {
      try {
        const res = await fetchIPFSMetadata<CollectionMetadataType>(offchainData)
        const collectionTitle = res?.name || collectionId
        return {
          value: Number(collectionId),
          label: collectionId === collectionTitle ? collectionId : `${collectionId}: ${collectionTitle}`,
        }
      } catch {
        return {
          value: Number(collectionId),
          label: collectionId,
        }
      }
    })
  )

  return collections
}
