import React from 'react'
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { UserOutlined } from '@ant-design/icons'
import { Avatar } from 'antd'

import * as actions from '../../store/actions'

import styles from './BlogHeader.module.scss'

function BlogHeader({ logOut, currentUser, userImg, logIn }) {
  let isLogIn
  if (JSON.parse(localStorage.getItem('loggedData'))) {
    isLogIn = JSON.parse(localStorage.getItem('loggedData')).isLoggedIn
  }

  const currentLoggedIn = logIn || isLogIn

  if (currentLoggedIn) {
    const { username, image } = JSON.parse(localStorage.getItem('loggedData'))
    const currentName = currentUser || username
    const currentPicture = userImg || image
    const picture = currentPicture ? (
      <img alt="example" src={`${currentPicture}`} />
    ) : (
      <Avatar size={46} icon={<UserOutlined />} />
    )
    return (
      <div className={styles.wrap}>
        <span className={styles.title}>Realworld Blog</span>
        <Link to={'/new-article'}>
          <button className={styles.create_article} type="button" aria-label="Create new article">
            Create article
          </button>
        </Link>
        <Link to={'/profile'}>
          <div className={styles.profile}>
            <span>{currentName}</span>
            {picture}
          </div>
        </Link>
        <Link to={'/'}>
          <button type="button" className={styles.logout} onClick={logOut} aria-label="Log Out">
            Log Out
          </button>
        </Link>
      </div>
    )
  }

  return (
    <div className={styles.wrap}>
      <span className={styles.title}>Realworld Blog</span>
      <Link to={'/sign-in'}>
        <button className={styles.create_article} type="button" aria-label="Create new article">
          Create article
        </button>
      </Link>
      <Link to={'/sign-in'}>
        <span className={styles.signIn}>Sign In</span>
      </Link>
      <Link to={'/sign-up'}>
        <button className={styles.signUp} type="button" aria-label="Sign Up new account">
          Sign Up
        </button>
      </Link>
    </div>
  )
}
const mapStateToProps = (state) => ({
  logIn: state.isLoggedIn,
  currentUser: state.username,
  userImg: state.image,
})

const mapDispatchToProps = (dispatch) => {
  const { logOut } = bindActionCreators(actions, dispatch)

  return {
    logOut,
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(BlogHeader)
