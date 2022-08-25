import { useState } from 'react'
import type { NextPage } from 'next'
import type { ISubmittableResult } from '@polkadot/types/types'
import { getRawApi, isTransactionSuccess, TransactionHashType } from 'ternoa-js'

import SetMarketplaceOwnerBlock from 'components/blocks/Marketplace/SetMarketplaceOwnerBlock/SetMarketplaceOwnerBlock'
import ProgressModal from 'components/base/Modals/ProgressModal'
import SigningModal from 'components/base/Modals/SigningModal'
import { IExtrinsic, IResponse, RESPONSE_DEFAULT_STATE, TransactionLifeCycleStatus } from 'interfaces'
import { useAppSelector, useAppDispatch } from 'redux/hooks'
import { actions } from 'redux/user/actions'

const SetMarketplaceOwner: NextPage = () => {
  const dispatch = useAppDispatch()
  const { user } = useAppSelector((state) => state.user)
  const { marketplaces } = user

  const [isProgressModalOpen, setIsProgressModalOpen] = useState(false)
  const [isSigningModalOpen, setIsSigningModalOpen] = useState(false)
  const [response, setResponse] = useState<IResponse>(RESPONSE_DEFAULT_STATE)
  const [unsignedTx, setUnsignedTx] = useState<TransactionHashType | undefined>(undefined)

  const handleProgressModalClose = () => {
    setIsProgressModalOpen(false)
    setResponse(RESPONSE_DEFAULT_STATE)
  }
  const handleSigningModalClose = () => {
    setIsSigningModalOpen(false)
    setUnsignedTx(undefined)
  }

  const signableCallback = (txHashHex: TransactionHashType) => {
    setUnsignedTx(txHashHex)
    setIsSigningModalOpen(true)
  }

  const submittableCallback = async (res: ISubmittableResult) => {
    handleSigningModalClose()
    if (!res.isInBlock && !res.isFinalized) setIsProgressModalOpen(true)
    try {
      const api = getRawApi()
      try {
        if (res.isInBlock && !res.isFinalized) {
          const txHash = res.txHash
          const { block } = await api.rpc.chain.getBlock(res.status.asInBlock)
          const blockNumber = block.header.number.toNumber()
          const extrinsic = block.extrinsics.filter((x) => x.hash.toHex() === txHash.toHex())[0]
          const event = res.events.find((x) => x.event.method === 'MarketplaceOwnerSet')
          const marketplaceId = event && Number.parseInt(event.event.data[0].toString())
          const isSuccess = isTransactionSuccess(res).success
          if (isSuccess && marketplaceId) {
            dispatch(actions.setUserMarketplaces(marketplaces.filter(({ value }) => value !== marketplaceId)))
          }
          setResponse({
            ...RESPONSE_DEFAULT_STATE,
            isTxSuccess: isSuccess,
            status: isSuccess ? TransactionLifeCycleStatus.TX_SUCCESS : TransactionLifeCycleStatus.TX_FAILED,
            txExtrinsic: extrinsic.toHuman() as IExtrinsic,
            txHash,
            txLinkSuffix: `/extrinsic/${blockNumber}-${res.txIndex}`,
          })
        }
      } catch (error: any) {
        console.log(error)
        const errorMessage =
          typeof error === 'string' ? error : typeof error !== 'object' ? 'Unknown error' : error.message ? error.message : JSON.stringify(error)
        setResponse({
          body: errorMessage,
          status: TransactionLifeCycleStatus.TX_FAILED,
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <SetMarketplaceOwnerBlock signableCallback={signableCallback} />
      {unsignedTx && (
        <SigningModal handleClose={handleSigningModalClose} isOpen={isSigningModalOpen} submittableCallback={submittableCallback} txHashHex={unsignedTx} />
      )}
      <ProgressModal handleClose={handleProgressModalClose} isOpen={isProgressModalOpen} response={response} />
    </>
  )
}

export default SetMarketplaceOwner
