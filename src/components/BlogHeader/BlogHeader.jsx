import React from 'react'

import styles from './BlogHeader.module.scss'

function BlogHeader() {
  return (
    <div className={styles.wrap}>
      <span>Realworld Blog</span>
      <span>Sign In</span>
      <button type="button">Sign Up</button>
    </div>
  )
}

export default BlogHeader
