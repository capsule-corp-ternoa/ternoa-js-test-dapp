import Head from 'next/head'
import Analytics from '../Analytics'
import Footer from '../Footer'
import Header from '../Header'
import MobileHeader from '../MobileHeader'

interface LayoutProps {
  children?: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const projectName = 'toolkit' //must be completed
  return (
    <>
      <Head>
        <title>Ternoa • {projectName}</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content={`Ternoa Blockchain ${projectName} by Ternoa.`} />
      </Head>
      <header className="container">
        <Header />
        <MobileHeader />
      </header>
      {process.env.NEXT_PUBLIC_GA && process.env.NODE_ENV === 'production' && <Analytics />}
      {children}
      <Footer />
    </>
  )
}

export default Layout
