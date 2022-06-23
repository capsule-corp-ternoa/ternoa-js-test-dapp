import Head from 'next/head'
import Analytics from '../Analytics'
import Footer from '../Footer'
import Header from '../Header'
import MobileFooter from '../MobileFooter'
import MobileHeader from '../Header/MobileHeader'
import TernoaIcon from 'assets/svg/Components/TernoaIcon'
import HeaderNavigation from 'utils/_mocks/Header'

interface LayoutProps {
  children?: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { projectName, navItems, web3Providers } = HeaderNavigation()
  return (
    <>
      <Head>
        <title>Ternoa • {projectName}</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content={`${projectName} by Ternoa Blockchain.`} />
      </Head>
      <header className="container">
        <Header ternoaLogo={<TernoaIcon />} projectName={projectName} isNetworkPill={true} links={navItems} web3Providers={web3Providers} />
        <MobileHeader ternoaLogo={<TernoaIcon />} projectName={projectName} links={navItems} web3Providers={web3Providers} />
      </header>
      {process.env.NEXT_PUBLIC_GA && process.env.NODE_ENV === 'production' && <Analytics />}
      {children}
      <Footer projectName={projectName} isSocials={true} isCredentialCustom={true} isTernoaOfficial={true} />
      <MobileFooter projectName={projectName} isCredentialCustom={true} islinks={true} />
    </>
  )
}

export default Layout
