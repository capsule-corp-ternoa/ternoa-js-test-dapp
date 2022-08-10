import CodeSnippet from 'components/ui/CodeSnippet'
import React from 'react'
import styles from './Box.module.scss'

interface BoxProps {
  children: React.ReactNode
  codeSnippet?: string
  codeSnippetLink?: string
  codeSnippetTitle?: string
  summary?: string
  title: string
}

const Box: React.FC<BoxProps> = ({ children, codeSnippet, codeSnippetLink, codeSnippetTitle = 'Javascript SDK', title, summary }) => (
  <div className={styles.outterContainer}>
    <div className={styles.mainContainer}>
      <h2 className={styles.title}>{title}</h2>
      {summary && <div className={styles.summary}>{summary}</div>}
      <div className={styles.body}>
        <div className={styles.formContainer}>{children}</div>
        {codeSnippet && (
          <div className={styles.codeSnippet}>
            <CodeSnippet link={codeSnippetLink} snippet={codeSnippet} title={codeSnippetTitle} />
          </div>
        )}
      </div>
    </div>
  </div>
)

export default Box
