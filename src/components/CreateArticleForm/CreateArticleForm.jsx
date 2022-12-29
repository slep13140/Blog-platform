import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { useParams, withRouter } from 'react-router-dom'
import { useForm, useFieldArray } from 'react-hook-form'

// import { DoNewRequest } from '../DoNewRequest'
import * as actions from '../../store/actions'

import styles from './CreateArticleForm.module.scss'

function CreateArticleForm({ history, newArticle }) {
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    watch,
    control,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      tags: [{ name: '' }],
    },
  })
  const { slug } = useParams()

  let createArticleUrl = 'https://blog.kata.academy/api/articles'
  let titleForm = 'Create new article'
  let methodRequest = 'POST'
  if (slug) {
    titleForm = 'Edit article'
    methodRequest = 'PUT'
    createArticleUrl = `https://blog.kata.academy/api/articles/${slug}`
  }

  const { fields, append, remove } = useFieldArray({
    name: 'tags',
    control,
  })

  const [...tagsData] = watch('tags')

  const tokenUser = JSON.parse(localStorage.getItem('loggedData')).token
  const articleData = {}

  const onSubmit = (data) => {
    articleData.title = data.title
    articleData.description = data.description
    articleData.body = data.article
    articleData.tagList = data.tags.map((item) => item.name)
    const createOptions = {
      method: methodRequest,
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Token ${tokenUser}`,
      },
      body: JSON.stringify({ article: articleData }),
    }
    newArticle(createArticleUrl, createOptions).then(() => history.push('/'))
    reset()
  }

  return (
    <div className={styles.container}>
      <form className={styles.wrap} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.title}>{titleForm}</div>
        <label>
          Title
          <input
            type="text"
            placeholder="Title"
            {...register('title', {
              required: 'Title field is required.',
              maxLength: {
                value: 5000,
                message: 'Your Title must consist of no more than 5000 characters.',
              },
            })}
          />
        </label>
        <div>{errors?.title && <p>{errors?.title?.message || 'Error!'}</p>}</div>
        <label>
          Short description
          <input
            type="text"
            placeholder="Title"
            {...register('description', {
              required: 'Title field is required.',
            })}
          />
        </label>
        <div>{errors?.description && <p>{errors?.description?.message || 'Error!'}</p>}</div>
        <label>
          Text
          <textarea
            placeholder="Text"
            {...register('article', {
              required: 'Text field is required.',
            })}
          />
        </label>
        <div>{errors?.article && <p>{errors?.article?.message || 'Error!'}</p>}</div>

        <label className={styles.tags}>
          <span>Tags</span>
          {fields.map((field, index) => {
            return (
              <section key={field.id}>
                <input
                  {...register(`tags.${index}.name`, {
                    minLength: {
                      value: 1,
                      message: 'Your Username needs to be at least 3 characters.',
                    },
                    validate: {
                      tagsValid: (value) => {
                        let errorMessage
                        tagsData.forEach((item, itemIndex) => {
                          if (itemIndex !== index && value === item.name) {
                            errorMessage = 'Fix duplicate tag'
                          }
                          if (tagsData.length > 1 && value.trim() === '') {
                            errorMessage = 'The field should not be empty'
                          }
                        })
                        return errorMessage || true
                      },
                    },
                  })}
                />

                <button
                  type="button"
                  onClick={() => {
                    if (tagsData.length > 1) {
                      remove(index)
                    } else {
                      return
                    }
                  }}
                  aria-label="Delete tag"
                >
                  Delete
                </button>

                <button
                  type="button"
                  onClick={() => {
                    append({
                      name: '',
                    })
                  }}
                  aria-label="Add more tag"
                >
                  Add tag
                </button>
                {tagsData.length > 1 && getValues(`tags.${index}.name`).length === 0 ? (
                  <p>The field should not be empty</p>
                ) : null}
                <div>{errors?.tags && <p>{errors?.tags[index]?.name.message || 'Error!'}</p>}</div>
              </section>
            )
          })}
        </label>

        <button type="submit" className={styles.button} aria-label="Send form">
          Send
        </button>
      </form>
    </div>
  )
}

const mapStateToProps = (state) => ({
  articleLists: state.articlesData,
  dataLoad: state.loading,
  dataError: state.error,
  logIn: state.isLoggedIn,
})

const mapDispatchToProps = (dispatch) => {
  const { newArticle } = bindActionCreators(actions, dispatch)

  return {
    newArticle,
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateArticleForm))
