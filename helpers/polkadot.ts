import { InjectedAccountWithMeta } from '@polkadot/extension-inject/types'
import { AnyAction } from 'redux'
import { actions } from 'redux/user/actions'
import { formatBalance, getBalances } from 'ternoa-js'

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
  const data = {
    address: account.address,
    injector,
    capsBalance: +(await formatBalance((await getBalances(account.address)).free, false)),
  }
  dispatch(actions.loginPolkadot(data))
}
