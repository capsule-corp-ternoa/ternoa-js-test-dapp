import { useEffect } from 'react'
import hljs from 'highlight.js'
import javascript from 'highlight.js/lib/languages/javascript'
hljs.registerLanguage('javascript', javascript)
import 'highlight.js/styles/night-owl.css'
import ClipboardCopy from 'components/ui/ClipboardCopy'

import styles from './CodeSnippet.module.scss'

interface ICodeSnippetProps {
  title: string
  placeholder: string
}
export default function CodeSnippet({ title, placeholder }: ICodeSnippetProps) {
  useEffect(() => {
    hljs.highlightAll()
    hljs.configure({ ignoreUnescapedHTML: true })
  }, [])

  const snippet = `
  import { createNft } from "ternoa-js/nft";
  import { generateSeed, getKeyringFromSeed } from "ternoa-js/account"
  const createMyFirstNFT = async () => {
      try {
          const account = await generateSeed()
          const keyring = await getKeyringFromSeed(account.seed)
          const address = keyring.address
          await createNft(address, "My first NFT", 10, null, false, keyring)
      } catch(e) {
          console.log(e)
      }
  }
  `

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <a href="https://ternoa-js.ternoa.dev/" className={styles.title} target="_blank" rel="noreferrer noopener">
          {title}
        </a>
        <div className={styles.clipboard}>
          <ClipboardCopy content={snippet} placeholder={placeholder} />
        </div>
      </div>
      <pre className={styles.snippet}>
        <code className="javascript">{snippet}</code>
      </pre>
    </div>
  )
}
