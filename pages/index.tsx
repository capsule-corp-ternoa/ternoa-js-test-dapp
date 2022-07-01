import { useState } from 'react'
import type { NextPage } from 'next'
import type { ISubmittableResult } from '@polkadot/types/types'

import CreateNFTBlock from 'components/blocks/CreateNFTBlock/CreateNFTBlock'
import ProgressModal from 'components/base/Modals/ProgressModal'
import SigningModal from 'components/base/Modals/SigningModal'
import { getRawApi, isTransactionSuccess } from 'ternoa-js'
import { IExtrinsic, IResponse, RESPONSE_DEFAULT_STATE, TransactionLifeCycleStatus } from 'interfaces'

const Home: NextPage = () => {
  const [isProgressModalOpen, setIsProgressModalOpen] = useState(false)
  const [isSigningModalOpen, setIsSigningModalOpen] = useState(false)
  const [response, setResponse] = useState<IResponse>(RESPONSE_DEFAULT_STATE)

  const handleProgressModalClose = () => {
    setIsProgressModalOpen(false)
    setResponse(RESPONSE_DEFAULT_STATE)
  }
  const handleSigningModalClose = () => setIsSigningModalOpen(false)

  const callbackResponse = async (res: ISubmittableResult) => {
    setIsProgressModalOpen(true)
    try {
      const api = await getRawApi()
      try {
        if (res.isInBlock) {
          const txHash = res.txHash
          const { block } = await api.rpc.chain.getBlock(res.status.asInBlock)
          const blockNumber = block.header.number.toNumber()
          const extrinsic = block.extrinsics.filter((x) => x.hash.toHex() === txHash.toHex())[0]
          const isSuccess = isTransactionSuccess(res).success
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
      <main className="container">
        <div className="wrapper">
          <CreateNFTBlock callback={callbackResponse} />
        </div>
      </main>
      <ProgressModal handleClose={handleProgressModalClose} isOpen={isProgressModalOpen} response={response} />
      <SigningModal handleClose={handleSigningModalClose} isOpen={isSigningModalOpen} />
    </>
  )
}

export default Home
