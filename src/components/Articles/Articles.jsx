import React from 'react'
import { Card, Avatar } from 'antd'
import { HeartOutlined } from '@ant-design/icons'
import { format } from 'date-fns'
import { Link } from 'react-router-dom'

import ArticlesTags from '../ArticlesTags'

import styles from './Articles.module.scss'

const { Meta } = Card

function Articles(props) {
  const { author, avatar, createdDate } = props
  const { tags, title, description } = props
  const { slug, like } = props
  const release = format(new Date(createdDate), 'PP')
  let nameArticle = title

  return (
    <Card className={styles.wrap}>
      <div className={styles.container}>
        <Meta className={styles.meta} title={author} description={release} avatar={<Avatar size={46} src={avatar} />} />
        <div>
          <div className={styles.titles}>
            <Link key={slug} to={`/articles/${slug}`}>
              {nameArticle}
            </Link>
            <HeartOutlined />
            <span>{like}</span>
          </div>
          <ArticlesTags className={styles.tag} tags={tags} />
        </div>
      </div>
      <div className={styles.describe}>{description}</div>
    </Card>
  )
}

export default Articles
