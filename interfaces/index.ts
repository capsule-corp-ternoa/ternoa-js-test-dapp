import type { InjectedExtension } from '@polkadot/extension-inject/types'
import BN from 'bn.js'

export interface PolkadotWallet {
  address: string
  injector: InjectedExtension
  capsBalance: BN
}

export interface User {
  isConnectedPolkadot: boolean
  polkadotWallet?: PolkadotWallet
}
