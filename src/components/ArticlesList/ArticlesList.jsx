import React, { useEffect, useState } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { List } from 'antd'

import { Articles } from '../Articles'
import { Spinner } from '../Spinner'
import { ErrorIndicator } from '../ErrorIndicator'
import * as actions from '../../store/actions'

import './ArticlesList.scss'

const ArticlesList = ({ articlesData, articleLists, dataLoad, dataError }) => {
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    articlesData(0)
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
      className="wrap-articlesList"
      size="large"
      pagination={{
        onChange: (page) => {
          if (page % 4 === 0 && page > offset) {
            setOffset(page)
            articlesData(page * 5)
          }
        },
        pageSize: 5,
      }}
      dataSource={articleLists}
      renderItem={(item) => {
        return (
          <List.Item>
            <Articles
              author={item.author.username}
              avatar={item.author.image}
              key={item.slug}
              createdDate={item.createdAt}
              tags={item.tagList}
              title={item.title}
              description={item.description}
              slug={item.slug}
              like={item.favoritesCount}
              favorited={item.favorited}
            />
          </List.Item>
        )
      }}
    />
  )
}

const mapStateToProps = (state) => ({
  articleLists: state.articlesData,
  dataLoad: state.loading,
  dataError: state.error,
})

const mapDispatchToProps = (dispatch) => {
  const { articlesData } = bindActionCreators(actions, dispatch)

  return {
    articlesData,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticlesList)
