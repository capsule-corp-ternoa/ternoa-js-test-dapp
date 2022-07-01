import { legacy_createStore as createStore, combineReducers } from 'redux'

import { appReducer } from './app/reducer'
import { userReducer } from './user/reducer'

export const store = createStore(
  combineReducers({
    app: appReducer,
    user: userReducer,
  })
)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
