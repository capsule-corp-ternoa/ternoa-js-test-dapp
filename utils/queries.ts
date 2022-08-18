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
