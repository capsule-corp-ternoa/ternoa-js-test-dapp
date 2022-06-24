import type { NextPage } from 'next'

import CreateNFTBlock from 'components/blocks/CreateNFTBlock/CreateNFTBlock'

const Home: NextPage = () => (
  <main className="container">
    <div className="wrapper">
      <CreateNFTBlock />
    </div>
  </main>
)

export default Home
