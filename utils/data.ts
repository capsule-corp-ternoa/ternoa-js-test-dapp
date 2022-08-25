import { request } from 'graphql-request'

import { ALPHANET_INDEXER_URL, IPFS_GATEWAY, MAINNET_INDEXER_URL } from './constants'

export const apiIndexer = async (wssEndpoint: string, query: string) => {
  if (wssEndpoint.includes('mainnet')) return request(MAINNET_INDEXER_URL, query)
  return request(ALPHANET_INDEXER_URL, query)
}

export const fetchIPFSMetadata = async <T>(hash: string): Promise<T | undefined> => {
  const res = await fetch(`${IPFS_GATEWAY}/${hash}`).catch((e) => {
    console.log(`Could not retrieve IPFS metadata from : ${`${IPFS_GATEWAY}/${hash}`} | Error : ${e}`)
  })
  if (res) {
    const result: T = await res.json()
    return result
  }
}
