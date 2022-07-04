import type { InjectedExtension } from '@polkadot/extension-inject/types'
import BN from 'bn.js'
import type { Hash } from '@polkadot/types/interfaces'
import { TxTranslations } from 'utils/txTranslate'

export interface PolkadotWallet {
  address: string
  injector: InjectedExtension
  capsBalance: BN
}

export interface User {
  isConnectedPolkadot: boolean
  polkadotWallet?: PolkadotWallet
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
