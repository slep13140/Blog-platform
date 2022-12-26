import React from 'react'
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { UserOutlined } from '@ant-design/icons'
import { Avatar } from 'antd'

import * as actions from '../../store/actions'

import styles from './BlogHeader.module.scss'

const { username, image, isLoggedIn } = JSON.parse(localStorage.getItem('loggedData'))

function BlogHeader({ logOut, currentUser = username, userImg = image, logIn = isLoggedIn }) {
  const picture = userImg ? <img alt="example" src={`${userImg}`} /> : <Avatar size={46} icon={<UserOutlined />} />
  if (logIn) {
    return (
      <div className={styles.wrap}>
        <span className={styles.title}>Realworld Blog</span>
        <Link to={'/'}>
          <button className={styles.create_article} type="button">
            Create article
          </button>
        </Link>
        <Link to={'/profile'}>
          <div className={styles.profile}>
            <span>{currentUser}</span>
            {picture}
          </div>
        </Link>
        <Link to={'/'}>
          <button type="button" className={styles.logout} onClick={logOut}>
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
        <span className={styles.signIn}>Sign In</span>
      </Link>
      <Link to={'/sign-up'}>
        <button className={styles.signUp} type="button">
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
