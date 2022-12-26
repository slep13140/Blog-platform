import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as actions from '../../store/actions'

import styles from './SignInForm.module.scss'

function SignInForm({ logIn, currentUser }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
  })

  const urlSignIn = 'https://blog.kata.academy/api/users/login'
  const enteredData = {}

  const signIn = async (url, obj) => {
    const response = await fetch(url, obj)
    const result = await response.json()
    return result
  }

  const onSubmit = (data) => {
    enteredData.email = data.email
    enteredData.password = data.password
    signIn(`${urlSignIn}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({
        user: enteredData,
      }),
    }).then((s) => {
      if (s.user.token) {
        const defaultOptions = {
          headers: {
            Authorization: `Token ${s.user.token}`,
          },
        }
        currentUser(defaultOptions)
      }
    })
    reset()
  }

  if (logIn) {
    return <Redirect to="/" />
  }

  return (
    <div className={styles.container}>
      <form className={styles.wrap} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.title}>Sign In</div>
        <label>
          Email address
          <input
            type="text"
            placeholder="Email address"
            {...register('email', {
              required: 'Email field is required.',
              pattern: /^[a-z0-9._%+-]+@[A-Z0-9.-]+\.[a-z]{2,}$/i,
            })}
          />
        </label>
        <div>{errors?.email && <p>{errors?.email?.message || 'Error!'}</p>}</div>
        <label>
          Password
          <input
            type="password"
            placeholder="Password"
            {...register('password', {
              required: 'Password field is required.',
            })}
          />
        </label>

        <button type="submit" className={styles.button}>
          Login
        </button>
        <div>
          Don’t have an account? <Link to={'/sign-up'}>Sign Up.</Link>
        </div>
      </form>
    </div>
  )
}

const mapStateToProps = (state) => ({
  logIn: state.isLoggedIn,
})

const mapDispatchToProps = (dispatch) => {
  const { currentUser } = bindActionCreators(actions, dispatch)

  return {
    currentUser,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignInForm)
