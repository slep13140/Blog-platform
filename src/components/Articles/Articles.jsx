import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Card, Avatar, Popconfirm } from 'antd'
import { HeartOutlined } from '@ant-design/icons'
import { format } from 'date-fns'
import { Link, withRouter } from 'react-router-dom'

import { ArticlesTags } from '../ArticlesTags'
import * as actions from '../../store/actions'

import styles from './Articles.module.scss'

const { Meta } = Card

function Articles(props) {
  const { author, avatar, createdDate } = props
  const { tags, title, description } = props
  const { slug, like, slugId } = props
  const { history, logIn } = props
  const { setFavorite } = props

  const release = format(new Date(createdDate), 'PP')
  let nameArticle = title
  const currentUser = JSON.parse(localStorage.getItem('loggedData')).username
  const tokenUser = JSON.parse(localStorage.getItem('loggedData')).token

  const deleteOptions = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: `Token ${tokenUser}`,
    },
  }
  const confirm = () => {
    getPost(deleteOptions)
  }
  const cancel = () => {
    return
  }
  const getPost = (option) => {
    fetch(`https://blog.kata.academy/api/articles/${slugId}`, option).then(() => history.push('/'))
  }

  const setFavorites = () => {
    if (logIn) {
      setFavorite(slug, tokenUser)
    } else {
      return
    }
  }

  if (currentUser === author) {
    return (
      <Card className={styles.wrap}>
        <div className={styles.container}>
          <Meta
            className={styles.meta}
            title={author}
            description={release}
            avatar={<Avatar size={46} src={avatar} />}
          />
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
        <div className={styles.describe}>
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
    <Card className={styles.wrap}>
      <div className={styles.container}>
        <Meta className={styles.meta} title={author} description={release} avatar={<Avatar size={46} src={avatar} />} />
        <div>
          <div className={styles.titles}>
            <Link key={slug} to={`/articles/${slug}`}>
              {nameArticle}
            </Link>
            <HeartOutlined onClick={setFavorites} />
            <span>{like}</span>
          </div>
          <ArticlesTags className={styles.tag} tags={tags} />
        </div>
      </div>
      <div className={styles.describeNoCurrent}>
        <span>{description}</span>
      </div>
    </Card>
  )
}

const mapStateToProps = (state) => ({
  articleLists: state.articlesData,
  dataLoad: state.loading,
  dataError: state.error,
  logIn: state.isLoggedIn,
})

const mapDispatchToProps = (dispatch) => {
  const { setFavorite } = bindActionCreators(actions, dispatch)

  return {
    setFavorite,
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Articles))
