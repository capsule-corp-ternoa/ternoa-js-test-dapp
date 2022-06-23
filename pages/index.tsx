import { burnNft, createNft, delegateNft, setRoyalty } from 'ternoa-js/nft'
import { getKeyringFromSeed } from 'ternoa-js/account'
import type { NextPage } from 'next'
import { signTx, submitTx } from 'ternoa-js'

const Home: NextPage = () => {
  const createMyFirstNFT = async () => {
    try {
      const keyring = await getKeyringFromSeed('broccoli tornado verb crane mandate wise gap shop mad quarter jar snake')
      const res = await createNft('My first NFT from ternoa-JS ', 0)
      console.log({ res })
    } catch (e) {
      console.log(e)
    }
  }

  const signNFT = async () => {
    try {
      const keyring = await getKeyringFromSeed('broccoli tornado verb crane mandate wise gap shop mad quarter jar snake')
      const signedTX = await signTx(keyring, '0x94041d006c4d79206669727374204e46542066726f6d207465726e6f612d4a53000000000000')
      console.log("c'est signé")
      console.log({ signedTX })
      const res = await submitTx(signedTX)
      console.log({ res })
    } catch (e) {
      console.log(e)
    }
  }

  const burnNFT = async () => {
    try {
      const keyring = await getKeyringFromSeed('broccoli tornado verb crane mandate wise gap shop mad quarter jar snake')
      const res = await burnNft(13, keyring)
      console.log({ res })
    } catch (e) {
      console.log(e)
    }
  }

  const setNFTRoyalty = async () => {
    try {
      const keyring = await getKeyringFromSeed('broccoli tornado verb crane mandate wise gap shop mad quarter jar snake')
      const res = await setRoyalty(13, 32, keyring)
      console.log({ res })
    } catch (e) {
      console.log(e)
    }
  }

  const delegateNFT = async () => {
    try {
      const keyring = await getKeyringFromSeed('broccoli tornado verb crane mandate wise gap shop mad quarter jar snake')
      const res = await delegateNft(13, '5GesFQSwhmuMKAHcDrfm21Z5xrq6kW93C1ch2Xosq1rXx2Eh', keyring)
      console.log({ res })
    } catch (e) {
      console.log(e)
    }
  }

  const undelegateNFT = async () => {
    try {
      const keyring = await getKeyringFromSeed('broccoli tornado verb crane mandate wise gap shop mad quarter jar snake')
      const res = await delegateNft(13, null, keyring)
      console.log({ res })
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <main className="container">
      <div className="wrapper">
        <button onClick={createMyFirstNFT} style={{ color: 'white' }}>
          Create NFT
        </button>
        <button onClick={signNFT} style={{ color: 'white' }}>
          Sign NFT
        </button>
        <button onClick={setNFTRoyalty} style={{ color: 'white' }}>
          Set Royalty
        </button>
        <button onClick={burnNFT} style={{ color: 'white' }}>
          burn NFT
        </button>
        <button onClick={delegateNFT} style={{ color: 'white' }}>
          delegate NFT
        </button>
        <button onClick={undelegateNFT} style={{ color: 'white' }}>
          undelegate NFT
        </button>
      </div>
    </main>
  )
}

export default Home
