import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import { BlogHeader } from '../BlogHeader'
import { ArticlesList } from '../ArticlesList'
import { Article } from '../Article'
import { SignUpForm } from '../SignUpForm'
import { SignInForm } from '../SignInForm'
import { EditProfileForm } from '../EditProfileForm'
import { CreateArticleForm } from '../CreateArticleForm'

import styles from './App.module.scss'

function App() {
  return (
    <div className={styles.wrap}>
      <BrowserRouter>
        <BlogHeader />
        <Route path="/" exact component={ArticlesList} />
        <Route path="/articles" exact component={ArticlesList} />
        <Route
          path="/articles/:slug"
          exact
          render={({ match }) => {
            const { slug } = match.params
            return <Article slugId={slug} />
          }}
        />
        <Route path="/sign-up" exact component={SignUpForm} />
        <Route path="/sign-in" exact component={SignInForm} />
        <Route path="/profile" exact component={EditProfileForm} />
        <Route path="/new-article" exact component={CreateArticleForm} />
        <Route path="/articles/:slug/edit" exact component={CreateArticleForm} />
      </BrowserRouter>
    </div>
  )
}

export default App
