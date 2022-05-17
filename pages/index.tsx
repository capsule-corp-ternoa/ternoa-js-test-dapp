import Input from 'components/ui/Input'
import Loader from 'components/ui/Loader/Loader'
import type { NextPage } from 'next'

const Home: NextPage = () => {
  return (
    <main className="container">
      <div className="wrapper">
        <Input placeholder={'Hello Ternoa'} endComponent={<Loader useLottie={true} size={'small'} />} />
      </div>
    </main>
  )
}

export default Home
