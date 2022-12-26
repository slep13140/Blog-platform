import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as actions from '../../store/actions'

import styles from './SignUpForm.module.scss'

const urlSignUp = 'https://blog.kata.academy/api/users'

function SignUpForm({ logIn, currentUser }) {
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    watch,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
    defaultValues: { isAgree: true },
  })

  const check = `${styles.checkbox}`
  const checkActive = `${styles.active}`

  const createNewUser = async (url, obj) => {
    const response = await fetch(url, obj)
    const result = await response.json()
    return result
  }

  const newUser = {}

  const onSubmit = (data) => {
    console.log(data)
    newUser.username = data.username
    newUser.email = data.email
    newUser.password = data.password
    console.log('newUser >>>', newUser)
    createNewUser(urlSignUp, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({ user: newUser }),
    }).then((s) => {
      if (s.user.token) {
        const defaultOptions = {
          headers: {
            Authorization: `Token ${s.user.token}`,
          },
        }
        currentUser(defaultOptions)
        localStorage.setItem('isLoggedIn', JSON.stringify(true))
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
        <div className={styles.title}>Create new account</div>
        <label>
          Username
          {errors?.username && <p className={styles.errors}></p>}
          <input
            type="text"
            placeholder="Username"
            {...register('username', {
              required: 'Username field is required.',
              minLength: {
                value: 3,
                message: 'Your Username needs to be at least 3 characters.',
              },
              maxLength: {
                value: 20,
                message: 'Your Username must consist of no more than 20 characters.',
              },
            })}
          />
        </label>
        <div>{errors?.username && <p>{errors?.username?.message || 'Error!'}</p>}</div>
        <label>
          Email address
          {errors?.email && <p className={styles.errors}></p>}
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
          {watch('repeatPassword') !== watch('password') && getValues('repeatPassword') ? (
            <p className={styles.errors}></p>
          ) : null}
          <input
            type="password"
            placeholder="Password"
            {...register('password', {
              required: 'Password field is required.',
              minLength: {
                value: 3,
                message: 'Your Password needs to be at least 6 characters.',
              },
              maxLength: {
                value: 20,
                message: 'Your Password must consist of no more than 40 characters.',
              },
            })}
          />
        </label>
        <div>{errors?.password && <p>{errors?.password?.message || 'Error!'}</p>}</div>
        <label>
          Repeat Password
          {watch('repeatPassword') !== watch('password') && getValues('repeatPassword') ? (
            <p className={styles.errors}></p>
          ) : null}
          <input
            type="password"
            placeholder="Password"
            {...register('repeatPassword', { required: 'Password field is required.' })}
          />
        </label>
        <div>
          {watch('repeatPassword') !== watch('password') && getValues('repeatPassword') ? (
            <p>Passwords must match</p>
          ) : null}
        </div>
        <div>{errors?.password && <p>{errors?.password?.message || 'Error!'}</p>}</div>
        <label>
          <input
            className={styles.checkbox}
            type="checkbox"
            {...register('isAgree', { required: 'field is required.' })}
          />
          <span className={watch('isAgree') ? checkActive : check} aria-hidden="true" />
          <span>I agree to the processing of my personal information</span>
        </label>

        <button type="submit" className={styles.button}>
          Create
        </button>
        <div>
          Already have an account? <Link to={'/sign-in'}>Sign In.</Link>
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
export default connect(mapStateToProps, mapDispatchToProps)(SignUpForm)
