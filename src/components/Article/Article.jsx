import React, { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'

import { Articles } from '../Articles'
import { Spinner } from '../Spinner'
import { ErrorIndicator } from '../ErrorIndicator'

import styles from './Article.module.scss'

function Article(props) {
  const [post, setPost] = useState()
  const [articleLoad, setArticleLoad] = useState(true)
  const [articleError, setArticleError] = useState(false)
  const { slugId } = props
  const getPost = () => {
    fetch(`https://blog.kata.academy/api/articles/${slugId}`)
      .then((res) => {
        return res.json()
      })
      .then((body) => {
        setPost(body.article)
        setArticleLoad(false)
      })
      .catch(() => {
        setArticleError(true)
      })
  }
  useEffect(() => {
    getPost()
  }, [slugId])

  if (!articleLoad && articleError) {
    return <ErrorIndicator />
  }
  if (articleLoad && !articleError) {
    return <Spinner />
  }
  return (
    <div className={styles.wrap}>
      <Articles
        author={post.author.username}
        avatar={post.author.image}
        createdDate={post.createdAt}
        tags={post.tagList}
        title={post.title}
        description={post.description}
        slugId={slugId}
      />
      <div className={styles.body}>
        <ReactMarkdown>{post.body}</ReactMarkdown>
      </div>
    </div>
  )
}

export default Article
