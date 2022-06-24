import { useEffect } from 'react'
import hljs from 'highlight.js'
import javascript from 'highlight.js/lib/languages/javascript'
hljs.registerLanguage('javascript', javascript)
import 'highlight.js/styles/night-owl.css'

import LinkArrow from 'assets/svg/Components/LinkArrow'
import ClipboardCopy from 'components/ui/ClipboardCopy'

import styles from './CodeSnippet.module.scss'

interface ICodeSnippetProps {
  link?: string
  snippet: string
  title: string
}
export default function CodeSnippet({ link, snippet, title }: ICodeSnippetProps) {
  useEffect(() => {
    hljs.highlightAll()
    hljs.configure({ ignoreUnescapedHTML: true })
  }, [])

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        {link ? (
          <a href={link} className={styles.title} target="_blank" rel="noreferrer noopener">
            {title}
            <LinkArrow className={styles.linkArrow} />
          </a>
        ) : (
          title
        )}
        <div className={styles.clipboard}>
          <ClipboardCopy content={snippet} placeholder="copy" />
        </div>
      </div>
      <pre className={styles.snippet}>
        <code className="javascript">{snippet}</code>
      </pre>
    </div>
  )
}
