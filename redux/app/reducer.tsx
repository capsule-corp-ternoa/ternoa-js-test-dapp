import { AnyAction, Reducer } from 'redux'
import { ALPHANET_CHAIN_WSS, MAINNET_CHAIN_WSS } from 'utils/constants'

const initialState = {
  app: {
    wssEndpoint: 'wss://alphanet.ternoa.com' as const,
  },
}

export const appReducer: Reducer<
  {
    app: {
      wssEndpoint: typeof ALPHANET_CHAIN_WSS | typeof MAINNET_CHAIN_WSS
    }
  },
  AnyAction
> = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case 'SET_WSS_ENDPOINT': {
      const { value } = action
      return {
        ...state,
        app: {
          ...state.app,
          wssEndpoint: value,
        },
      }
    }
    default:
      return state
  }
}
