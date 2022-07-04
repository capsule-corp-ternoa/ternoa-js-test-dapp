import React from 'react'

import styles from './PingpongLoader.module.scss'

const PingpongLoader = () => (
  <div className={styles.root}>
    <span className={styles.dot} />
    <span className={styles.dot} />
    <span className={styles.dot} />
  </div>
)

export default PingpongLoader
