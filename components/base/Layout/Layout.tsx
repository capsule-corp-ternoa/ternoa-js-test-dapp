import { useEffect } from 'react'
import Head from 'next/head'
import { getApiEndpoint } from 'ternoa-js'

import TernoaIcon from 'assets/svg/Components/TernoaIcon'
import Analytics from 'components/base/Analytics'
import Footer from 'components/base/Footer'
import MobileFooter from 'components/base/MobileFooter'
import Header from 'components/base/Header'
import MobileHeader from 'components/base/Header/MobileHeader'
import Sidebar from 'components/base/Sidebar/Sidebar'
import { reconnect } from 'helpers/polkadot'
import { actions } from 'redux/app/actions'
import { useAppDispatch } from 'redux/hooks'
import HeaderNavigation from 'utils/_mocks/Header'

import styles from './Layout.module.scss'

interface LayoutProps {
  children?: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { projectName, navItems } = HeaderNavigation()
  const dispatch = useAppDispatch()

  useEffect(() => {
    reconnect(dispatch)

    try {
      const endpoint = getApiEndpoint()
      dispatch(actions.setWssEndpoint(endpoint))
    } catch (error) {
      console.log(error)
    }
  }, [dispatch])

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
            <div className={styles.sidebarContainer}>
              <Sidebar />
            </div>
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
