import { PolkadotWallet, SelectItemType } from 'interfaces'

export const actions = {
  isNFTsFecthing: (value: boolean) => ({
    type: 'USER_NFTS_FETCHING',
    value: value,
  }),
  isCollectionsFecthing: (value: boolean) => ({
    type: 'USER_COLLECTIONS_FETCHING',
    value: value,
  }),
  loginPolkadot: (value: PolkadotWallet) => ({
    type: 'USER_LOGIN_POLKADOT',
    value: value,
  }),
  logoutPolkadot: () => ({
    type: 'USER_LOGOUT_POLKADOT',
  }),
  setUserNFTs: (value: SelectItemType[]) => ({
    type: 'USER_SET_NFTS',
    value: value,
  }),
  setUserCollections: (value: SelectItemType[]) => ({
    type: 'USER_SET_COLLECTIONS',
    value: value,
  }),
}
