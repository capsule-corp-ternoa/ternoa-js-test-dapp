import { Sizes } from 'components/ui/types'
import styles from './Loader.module.scss'
import Lottie from '../Lottie'

interface LoaderProps {
  className?: string
  size?: Sizes
  useLottie?: boolean
}
const Loader: React.FC<LoaderProps> = ({ className, size, useLottie = false }) => {
  return useLottie ? (
    <Lottie path={'/JSON/lottieLoaderWhite.json'} className={`${styles.rootLottie} ${size && styles[size]} ${className}`} />
  ) : (
    <div className={`${styles.root} ${size && styles[size]} ${className}`}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  )
}

export default Loader
