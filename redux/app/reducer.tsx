import { AnyAction, Reducer } from 'redux'

const initialState = {
  app: {
    wssEndpoint: 'wss://alphanet.ternoa.com',
  },
}

export const appReducer: Reducer<
  {
    app: {
      wssEndpoint: string
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
