import { gql } from 'graphql-request'

export const queryUserNFTs = (address: string) => gql`
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

export const queryUserCollections = (address: string) => gql`
  {
    collectionEntities(
      orderBy: [TIMESTAMP_CREATE_DESC]
      filter: {
        and: [
          {owner: { equalTo: "${address}" }}
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

export const queryUserMarketplaces = (address: string) => gql`
  {
    marketplaceEntities(
      filter: {
        and: [
          {owner: { equalTo: "${address}" }}
        ]
      }
    ) {
      totalCount
      nodes {
        marketplaceId
        offchainData
      }
    }
  }
`
