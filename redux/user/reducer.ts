import { clear, store, USER_POLKADOT_ADDRESS } from 'helpers/storage'
import { User } from 'interfaces'
import { AnyAction, Reducer } from 'redux'

const initialState = {
  user: {
    isConnectedPolkadot: false,
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
          isConnectedPolkadot: false,
          polkadotWallet: undefined,
        },
      }
    }
    default:
      return state
  }
}
