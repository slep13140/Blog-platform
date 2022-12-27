import React, { useEffect, useState } from 'react'
import { List } from 'antd'

import { Articles } from '../Articles'
import { Spinner } from '../Spinner'
import { ErrorIndicator } from '../ErrorIndicator'

import styles from './ArticlesList.module.scss'

const ArticlesList = () => {
  const [data, setData] = useState([])
  const [offset, setOffset] = useState(0)
  const [dataLoad, setDataLoad] = useState(true)
  const [dataError, setDataError] = useState(false)
  const dataUrl = 'https://blog.kata.academy/api/articles/?offset='
  const appendData = (id) => {
    fetch(`${dataUrl}${id}`)
      .then((res) => res.json())
      .then((body) => {
        setData(data.concat(body.articles))
        setDataLoad(false)
      })
      .catch(() => {
        setDataError(true)
      })
  }
  useEffect(() => {
    appendData(0)
  }, [])

  if (!dataLoad && dataError) {
    return <ErrorIndicator />
  }
  if (dataLoad && !dataError) {
    return <Spinner />
  }
  return (
    <List
      itemLayout="vertical"
      className={styles.wrap}
      size="large"
      pagination={{
        onChange: (page) => {
          if (page % 4 === 0 && page > offset) {
            setOffset(page)
            appendData(page * 5)
          }
        },
        pageSize: 5,
      }}
      dataSource={data}
      renderItem={(item, index) => {
        const keyId = index

        return (
          <List.Item className={styles.articles}>
            <Articles
              author={item.author.username}
              avatar={item.author.image}
              key={keyId}
              createdDate={item.createdAt}
              tags={item.tagList}
              title={item.title}
              description={item.description}
              slug={item.slug}
              like={item.favoritesCount}
            />
          </List.Item>
        )
      }}
    />
  )
}

export default ArticlesList
