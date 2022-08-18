import type { InjectedExtension } from '@polkadot/extension-inject/types'
import BN from 'bn.js'
import type { Hash } from '@polkadot/types/interfaces'
import { TxTranslations } from 'utils/txTranslate'

export type SelectItemType = {
  value: number
  label: string
}

export interface PolkadotWallet {
  address: string
  injector: InjectedExtension
  capsBalance: BN
}

export interface User {
  isCollectionsFetching: boolean
  isConnectedPolkadot: boolean
  isNFTsFetching: boolean
  polkadotWallet?: PolkadotWallet
  NFTs: SelectItemType[]
  collections: SelectItemType[]
}

export enum TransactionLifeCycleStatus {
  TX_PENDING,
  TX_SUCCESS,
  TX_FAILED,
}

export const RESPONSE_DEFAULT_STATE = {
  body: undefined,
  status: TransactionLifeCycleStatus.TX_PENDING,
}

export type MethodType = {
  method: never
  section: keyof typeof TxTranslations
  args: any
}

export type DecodedMethodType = {
  method: MethodType
}

export interface ICustomResponse<DataType> {
  data: DataType[]
}

export type IExtrinsic = {
  isSigned: boolean
  method: MethodType
  nonce: string
  signature: string
  signer: { Id: string }
  tip: string
}

export interface IResponse {
  body?: string
  isTxSuccess?: boolean
  status: TransactionLifeCycleStatus
  txExtrinsic?: IExtrinsic
  txHash?: Hash
  txLinkSuffix?: string
}

export type ResponseNominalSetState = React.Dispatch<React.SetStateAction<IResponse>>

export type CollectionMetadataType = {
  name: string
  description: string
  profile_image: string
  banner_image: string
  profile_image_file: {
    name: string
    hash: string
    size: string
    type: string
  }
  banner_image_file: {
    name: string
    hash: string
    size: string
    type: string
  }
}

export type NFTMetadataType = {
  hash: string
  title: string
  description: string
  image: string
  image_file: {
    hash: string
    name: string
    size: string
    type: string
  }
  external_url: string
  properties: {
    media: {
      hash: string
      name: string
      size: string
      type: string
    }
  }
}
