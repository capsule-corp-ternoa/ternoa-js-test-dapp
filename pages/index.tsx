import ClipboardCopy from 'components/ui/ClipboardCopy'
import Input from 'components/ui/Input'
import Loader from 'components/ui/Loader/Loader'
import SearchBar from 'components/ui/SearchBar'
import type { NextPage } from 'next'

const Home: NextPage = () => {
  return (
    <main className="container">
      <div className="wrapper">
        <Input placeholder={'Hello Ternoa'} endComponent={<Loader useLottie={true} size={'small'} />} />
      </div>
      <div className="wrapper">
        <SearchBar placeholder={'Hello Ternoa'} />
      </div>
      <ClipboardCopy content="hello" placeholder="Placeholder to copy" />
    </main>
  )
}

export default Home
