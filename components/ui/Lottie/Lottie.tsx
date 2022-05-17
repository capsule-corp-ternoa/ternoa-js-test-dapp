import React, { useEffect, useRef, useState } from 'react'

interface Props {
  path: string
  className?: string
}

const Lottie = ({ path, className }: Props) => {
  const ref = useRef(null)
  const [lottie, setLottie] = useState<any>(null)
  const [lottieLoaded, setLottieLoaded] = useState(false)

  useEffect(() => {
    let shouldImport = true
    import('lottie-web').then((Lottie) => {
      if (shouldImport) {
        setLottie(Lottie.default)
      }
    })

    return () => {
      shouldImport = false
    }
  }, [])

  useEffect(() => {
    let shouldUpdate = true
    const getLottieLoader = async () => {
      try {
        if (lottie && ref.current) {
          const animation = await lottie.loadAnimation({
            container: ref.current,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            path,
          })
          if (shouldUpdate) return () => animation.destroy()
        }
      } catch (error) {
        console.log(error)
      }
    }

    const timer = setTimeout(() => {
      return
    }, 2000)
    getLottieLoader()
    if (shouldUpdate) setLottieLoaded(true)

    return () => {
      shouldUpdate = false
      clearTimeout(timer)
    }
  }, [lottie, path])

  return lottieLoaded ? <div className={className} ref={ref} /> : null
}

export default Lottie
