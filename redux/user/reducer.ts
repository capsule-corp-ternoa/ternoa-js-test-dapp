import { clear, store, USER_POLKADOT_ADDRESS } from 'helpers/storage'
import { User } from 'interfaces'
import { AnyAction, Reducer } from 'redux'

const initialState = {
  user: {
    isCollectionsFetching: false,
    isConnectedPolkadot: false,
    isNFTsFetching: false,
    NFTs: [],
    collections: [],
  },
}

export const userReducer: Reducer<{ user: User }, AnyAction> = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case 'USER_LOGIN_POLKADOT': {
      const { value } = action
      store(USER_POLKADOT_ADDRESS, value.address)
      return {
        ...state,
        user: {
          ...state.user,
          isConnectedPolkadot: true,
          polkadotWallet: value,
        },
      }
    }
    case 'USER_LOGOUT_POLKADOT': {
      clear(USER_POLKADOT_ADDRESS)
      return {
        ...state,
        user: {
          ...state.user,
          isCollectionsFetching: false,
          isConnectedPolkadot: false,
          isNFTsFetching: false,
          polkadotWallet: undefined,
          NFTs: [],
          collections: [],
        },
      }
    }
    case 'USER_NFTS_FETCHING': {
      const { value } = action
      return {
        ...state,
        user: {
          ...state.user,
          isNFTsFetching: value,
        },
      }
    }
    case 'USER_COLLECTIONS_FETCHING': {
      const { value } = action
      return {
        ...state,
        user: {
          ...state.user,
          isCollectionsFetching: value,
        },
      }
    }
    case 'USER_SET_NFTS': {
      const { value } = action
      return {
        ...state,
        user: {
          ...state.user,
          NFTs: value,
        },
      }
    }
    case 'USER_SET_COLLECTIONS': {
      const { value } = action
      return {
        ...state,
        user: {
          ...state.user,
          collections: value,
        },
      }
    }
    default:
      return state
  }
}
