import type { AppProps } from 'next/app'
import Layout from '../components/base/Layout'
import '../styles/_main.scss'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
