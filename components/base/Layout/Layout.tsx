import Head from 'next/head'
import Analytics from '../Analytics'

interface LayoutProps {
  children?: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const projectName = '' //must be completed
  return (
    <>
      <Head>
        <title>Ternoa • {projectName}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content={`Ternoa Blockchain ${projectName} by Ternoa.`} />
      </Head>
      {process.env.NEXT_PUBLIC_GA && process.env.NODE_ENV === 'production' && <Analytics />}
      <div className="container">{children}</div>
    </>
  )
}

export default Layout
