import CodeSnippet from 'components/ui/CodeSnippet'
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
      <div className="wrapper">
        <CodeSnippet title="Javasciprt SDK" placeholder="copy" />
      </div>
    </main>
  )
}

export default Home
