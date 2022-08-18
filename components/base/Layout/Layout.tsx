import { useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { getApiEndpoint } from 'ternoa-js'

import TernoaIcon from 'assets/svg/Components/TernoaIcon'
import Analytics from 'components/base/Analytics'
import Footer from 'components/base/Footer'
import MobileFooter from 'components/base/MobileFooter'
import Header from 'components/base/Header'
import MobileHeader from 'components/base/Header/MobileHeader'
import HelperList from 'components/base/HelperList/HelperList'
import { reconnect } from 'helpers/polkadot'
import { actions as appActions } from 'redux/app/actions'
import { useAppDispatch, useAppSelector } from 'redux/hooks'
import { actions as userActions } from 'redux/user/actions'
import HeaderNavigation from 'utils/_mocks/Header'
import { loadUserCollections, loadUserMarketplaces, loadUserNFTs } from 'utils/user'

import styles from './Layout.module.scss'

interface LayoutProps {
  children?: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { projectName, navItems } = HeaderNavigation()
  const dispatch = useAppDispatch()
  const { app } = useAppSelector((state) => state.app)
  const { user } = useAppSelector((state) => state.user)
  const { wssEndpoint } = app
  const { polkadotWallet } = user
  const router = useRouter()

  useEffect(() => {
    reconnect(dispatch)

    try {
      const endpoint = getApiEndpoint()
      dispatch(appActions.setWssEndpoint(endpoint))
    } catch (error) {
      console.log(error)
    }
  }, [dispatch])

  useEffect(() => {
    let shouldUpdate = true
    const loadNFTs = async (address: string) => {
      dispatch(userActions.isNFTsFecthing(true))
      try {
        const NFTs = await loadUserNFTs(wssEndpoint, address)
        if (shouldUpdate) {
          dispatch(userActions.setUserNFTs(NFTs))
          dispatch(userActions.isNFTsFecthing(false))
        }
      } catch (error) {
        console.log(error)
        dispatch(userActions.isNFTsFecthing(false))
      }
    }

    const loadCollections = async (address: string) => {
      dispatch(userActions.isCollectionsFecthing(true))
      try {
        const collections = await loadUserCollections(wssEndpoint, address)
        if (shouldUpdate) {
          dispatch(userActions.setUserCollections(collections))
          dispatch(userActions.isCollectionsFecthing(false))
        }
      } catch (error) {
        console.log(error)
        dispatch(userActions.isCollectionsFecthing(false))
      }
    }

    const loadMarketplaces = async (address: string) => {
      dispatch(userActions.isMarketplacesFecthing(true))
      try {
        const marketplaces = await loadUserMarketplaces(wssEndpoint, address)
        if (shouldUpdate) {
          dispatch(userActions.setUserMarketplaces(marketplaces))
          dispatch(userActions.isMarketplacesFecthing(false))
        }
      } catch (error) {
        console.log(error)
        dispatch(userActions.isMarketplacesFecthing(false))
      }
    }

    if (polkadotWallet !== undefined) {
      loadNFTs(polkadotWallet.address)
      loadCollections(polkadotWallet.address)
      loadMarketplaces(polkadotWallet.address)
    }
    return () => {
      shouldUpdate = false
    }
  }, [dispatch, polkadotWallet, wssEndpoint])

  return (
    <>
      <Head>
        <title>Ternoa • {projectName}</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content={`${projectName} by Ternoa Blockchain.`} />
      </Head>
      <header className="container">
        <Header ternoaLogo={<TernoaIcon />} projectName={projectName} links={navItems} />
        <MobileHeader ternoaLogo={<TernoaIcon />} projectName={projectName} links={navItems} />
      </header>

      {process.env.NEXT_PUBLIC_GA && process.env.NODE_ENV === 'production' && <Analytics />}

      <main className="container">
        <div className="wrapper">
          <div className={styles.root}>
            {router.pathname.includes('/app/') && (
              <div className={styles.sidebarContainer}>
                <HelperList />
              </div>
            )}
            <div className={styles.mainContainer}>{children}</div>
          </div>
        </div>
      </main>

      <Footer projectName={projectName} isSocials={true} isCredentialCustom={true} isTernoaOfficial={true} />
      <MobileFooter projectName={projectName} isCredentialCustom={true} islinks={true} />
    </>
  )
}

export default Layout
