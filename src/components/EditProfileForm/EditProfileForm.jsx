import React from 'react'
import { Redirect } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as actions from '../../store/actions'

import styles from './EditProfileForm.module.scss'

function EditProfileForm({ currentUser }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
  })
  const tokenUser = JSON.parse(localStorage.getItem('loggedData')).token
  const editedData = {}
  const onSubmit = (data) => {
    if (data.email) {
      editedData.email = data.email
    }
    if (data.password) {
      editedData.password = data.password
    }
    if (data.username) {
      editedData.username = data.username
    }
    if (data.avatarImage) {
      editedData.image = data.avatarImage
    }
    const emptyEditedData = !Object.keys(editedData).length
    if (!emptyEditedData) {
      const defaultOptions = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          Authorization: `Token ${tokenUser}`,
        },
        body: JSON.stringify({ user: editedData }),
      }
      currentUser(defaultOptions)
    }

    reset()
    return <Redirect to="/" />
  }

  return (
    <div className={styles.container}>
      <form className={styles.wrap} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.title}>Edit Profile</div>
        <label>
          Username
          {errors?.username && <p className={styles.errors}></p>}
          <input
            type="text"
            placeholder="Username"
            {...register('username', {
              required: false,
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
            type="email"
            placeholder="Email address"
            {...register('email', {
              required: false,
              pattern: /^[a-z0-9._%+-]+@[A-Z0-9.-]+\.[a-z]{2,}$/i,
            })}
          />
        </label>
        <div>{errors?.email && <p>{errors?.email?.message || 'Error!'}</p>}</div>
        <label>
          New password
          {errors?.password && <p className={styles.errors}></p>}
          <input
            type="password"
            placeholder="New password"
            {...register('password', {
              required: false,
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
          Avatar image (url)
          {errors?.avatarImage && <p className={styles.errors}></p>}
          <input type="url" placeholder="Avatar image" {...register('avatarImage', { required: false })} />
        </label>
        <div>{errors?.avatarImage && <p>{errors?.password?.message || 'Error!'}</p>}</div>

        <button type="submit" className={styles.button} aria-label="save changes">
          Save
        </button>
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
export default connect(mapStateToProps, mapDispatchToProps)(EditProfileForm)
