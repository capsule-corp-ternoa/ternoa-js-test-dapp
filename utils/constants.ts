import { removeURLSlash } from './strings'

export const ALPHANET_CHAIN_WSS = 'wss://alphanet.ternoa.com'
export const MAINNET_CHAIN_WSS = 'wss://mainnet.ternoa.io'

export const ALPHANET_INDEXER_URL = 'https://indexer-alphanet.ternoa.dev'
export const MAINNET_INDEXER_URL = 'https://indexer-mainnet.ternoa.dev'

export const IPFS_URL = (process.env.NEXT_PUBLIC_IPFS_URL && removeURLSlash(process.env.NEXT_PUBLIC_IPFS_URL)) as string
export const IPFS_GATEWAY = `${IPFS_URL}/ipfs`
