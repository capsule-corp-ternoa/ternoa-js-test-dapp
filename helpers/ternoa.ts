import type { ISubmittableResult, Signer } from '@polkadot/types/types'
import { getRawApi, query, submitTx } from 'ternoa-js'

export const signTx = async (tx: `0x${string}`, address: string, signer: Signer): Promise<`0x${string}`> => {
  const api = await getRawApi()
  const nonce = ((await query('system', 'account', [address])) as any).nonce.toNumber()
  return (await api.tx(tx).signAsync(address, { nonce, signer })).toHex()
}

export const runTx = async (signedTx: `0x${string}`, callback?: (res: ISubmittableResult) => void): Promise<`0x${string}`> => {
  return await submitTx(signedTx, callback)
}
