import { legacy_createStore as createStore, combineReducers } from 'redux'
import { userReducer } from './user/reducer'

export const store = createStore(
  combineReducers({
    user: userReducer,
  })
)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
