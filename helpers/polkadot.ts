import { InjectedAccountWithMeta } from '@polkadot/extension-inject/types'
import { AnyAction } from 'redux'
import { actions } from 'redux/user/actions'
import { getBalances } from 'ternoa-js'
import { clear, get, USER_POLKADOT_ADDRESS } from './storage'

export const getAccounts = async () => {
  const { web3Accounts, web3Enable } = await import('@polkadot/extension-dapp')
  const extensions = await web3Enable('ternoa-js-test-dapp')
  if (extensions.length === 0)
    throw new Error(
      'polkadot{.js} extension is not installed.\n\nOtherwise make sure you allowed Ternoa JS Test dApp in the "Manage Website Access" settings of your wallet.'
    )
  const allAccounts = await web3Accounts()
  return allAccounts
}

export const connect = async (account: InjectedAccountWithMeta, dispatch: (action: AnyAction) => void) => {
  const { web3FromSource } = await import('@polkadot/extension-dapp')
  const injector = await web3FromSource(account.meta.source)
  const balances = await getBalances(account.address)
  const { free } = balances
  const data = {
    address: account.address,
    injector,
    capsBalance: free, // verify if free include bonded token
  }
  dispatch(actions.loginPolkadot(data))
}

export const reconnect = async (dispatch: (action: AnyAction) => void) => {
  try {
    const polkadotAddress = get(USER_POLKADOT_ADDRESS)
    if (polkadotAddress) {
      const accounts = await getAccounts()
      const account = accounts.find((x) => x.address === polkadotAddress)
      if (!account) throw new Error('Account not found in extenstion')
      connect(account, dispatch)
    }
  } catch (err) {
    console.error(err)
    clear(USER_POLKADOT_ADDRESS)
  }
}
