import type { ISubmittableResult, Signer } from '@polkadot/types/types'
import { getRawApi, query, submitTxHex, TransactionHashType } from 'ternoa-js'

export const signTx = async (tx: TransactionHashType, address: string, signer: Signer): Promise<TransactionHashType> => {
  const api = await getRawApi()
  const nonce = ((await query('system', 'account', [address])) as any).nonce.toNumber()
  return (await api.tx(tx).signAsync(address, { nonce, signer })).toHex()
}

export const runTx = async (signedTx: TransactionHashType, callback?: (res: ISubmittableResult) => void): Promise<TransactionHashType> => {
  return await submitTxHex(signedTx, callback)
}
