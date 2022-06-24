import type { InjectedExtension } from '@polkadot/extension-inject/types'

export interface PolkadotWallet {
  address: string
  injector: InjectedExtension
  capsBalance: number
}

export interface User {
  isConnectedPolkadot: boolean
  polkadotWallet?: PolkadotWallet
}
