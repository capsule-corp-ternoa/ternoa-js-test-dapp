import { useEffect, useState } from 'react'
import Head from 'next/head'
import { getApiEndpoint } from 'ternoa-js'

import { useAppDispatch } from 'redux/hooks'
import { reconnect } from 'helpers/polkadot'
import Analytics from '../Analytics'

import Header from '../Header'
import HeaderNavigation from 'utils/_mocks/Header'
import MobileHeader from '../Header/MobileHeader'
import Footer from '../Footer'
import MobileFooter from '../MobileFooter'
import TernoaIcon from 'assets/svg/Components/TernoaIcon'

interface LayoutProps {
  children?: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { projectName, navItems } = HeaderNavigation()
  const [wssEndpoint, setWssEndpoint] = useState<string>('')
  const dispatch = useAppDispatch()

  const getEndpoint = async () => {
    try {
      const endpoint = await getApiEndpoint()
      setWssEndpoint(endpoint)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    reconnect(dispatch)
  }, [dispatch])

  useEffect(() => {
    getEndpoint()
  }, [])

  return (
    <>
      <Head>
        <title>Ternoa • {projectName}</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content={`${projectName} by Ternoa Blockchain.`} />
      </Head>
      <header className="container">
        <Header ternoaLogo={<TernoaIcon />} projectName={projectName} links={navItems} wss={wssEndpoint} />
        <MobileHeader ternoaLogo={<TernoaIcon />} projectName={projectName} links={navItems} wss={wssEndpoint} />
      </header>
      {process.env.NEXT_PUBLIC_GA && process.env.NODE_ENV === 'production' && <Analytics />}
      {children}
      <Footer projectName={projectName} isSocials={true} isCredentialCustom={true} isTernoaOfficial={true} />
      <MobileFooter projectName={projectName} isCredentialCustom={true} islinks={true} />
    </>
  )
}

export default Layout
