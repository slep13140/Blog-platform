import React from 'react'
import { Tag } from 'antd'

import styles from './ArticlesTags.module.scss'

function ArticlesTags({ tags }) {
  let elements = null
  if (tags) {
    elements = tags.map((item, index) => {
      const tagId = index
      let newStr = String(item).trim()

      if (newStr) {
        newStr = newStr[0].toUpperCase() + newStr.slice(1)
      }

      let tag = newStr
      if (newStr.length > 10) {
        tag = newStr.slice(0, 8).trim() + '...'
      }
      return <Tag key={tagId}>{tag}</Tag>
    })
  }
  const newElem = elements.filter((item) => item.props.children.length > 0)

  return <div className={styles.wrap}>{newElem.slice(0, 2)} </div> || null
}

export default ArticlesTags
