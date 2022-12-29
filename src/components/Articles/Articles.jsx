import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Card, Avatar, Popconfirm } from 'antd'
import { HeartOutlined } from '@ant-design/icons'
import { format } from 'date-fns'
import { Link, withRouter } from 'react-router-dom'

import { ArticlesTags } from '../ArticlesTags'
import * as actions from '../../store/actions'

import './Articles.scss'

const { Meta } = Card

function Articles(props) {
  const { author, avatar, createdDate } = props
  const { tags, title, description } = props
  const { slug, like, slugId } = props
  const { history } = props
  const { setFavorite, delArticle } = props
  let currentUser
  let tokenUser
  let currenLogState
  const release = format(new Date(createdDate), 'PP')
  let nameArticle = title
  if (JSON.parse(localStorage.getItem('loggedData'))) {
    currentUser = JSON.parse(localStorage.getItem('loggedData')).username
    tokenUser = JSON.parse(localStorage.getItem('loggedData')).token
    currenLogState = JSON.parse(localStorage.getItem('loggedData')).isLoggedIn
  }

  const deleteOptions = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: `Token ${tokenUser}`,
    },
  }
  const confirm = () => {
    delArticle(slugId, deleteOptions, tokenUser).then(() => history.push('/'))
  }
  const cancel = () => {
    return
  }

  const setFavorites = () => {
    if (currenLogState) {
      setFavorite(slug, tokenUser)
    } else {
      return
    }
  }

  if (currentUser === author) {
    return (
      <Card className="wrap-articles">
        <div className="container-articles">
          <Meta
            className="meta-articles"
            title={author}
            description={release}
            avatar={<Avatar size={46} src={avatar} />}
          />
          <div>
            <div className="titles-articles">
              <Link key={slug} to={`/articles/${slug}`}>
                {nameArticle}
              </Link>
              <HeartOutlined />
              <span>{like}</span>
            </div>
            <ArticlesTags tags={tags} />
          </div>
        </div>
        <div className="describe-articles">
          <span>{description}</span>
          <Popconfirm
            title="Are you sure to delete this article?"
            onConfirm={confirm}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            <Link to={'/'}>
              <button type="button">Delete</button>
            </Link>
          </Popconfirm>
          <Link to={`/articles/${slugId}/edit`}>
            <button type="button">Edit</button>
          </Link>
        </div>
      </Card>
    )
  }

  return (
    <Card className="wrap-articles">
      <div className="container-articles">
        <Meta
          className="meta-articles"
          title={author}
          description={release}
          avatar={<Avatar size={46} src={avatar} />}
        />
        <div>
          <div className="titles-articles">
            <Link key={slug} to={`/articles/${slug}`}>
              {nameArticle}
            </Link>
            <HeartOutlined onClick={setFavorites} />
            <span>{like}</span>
          </div>
          <ArticlesTags tags={tags} />
        </div>
      </div>
      <div className="describeNoCurrent-articles">
        <span>{description}</span>
      </div>
    </Card>
  )
}

const mapStateToProps = (state) => ({
  articleLists: state.articlesData,
  dataLoad: state.loading,
  dataError: state.error,
})

const mapDispatchToProps = (dispatch) => {
  const { setFavorite, delArticle } = bindActionCreators(actions, dispatch)

  return {
    setFavorite,
    delArticle,
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Articles))
