import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import BlogHeader from '../BlogHeader/BlogHeader'
import ArticlesList from '../ArticlesList/ArticlesList'
import Article from '../Article/Article'

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
          render={({ match }) => {
            const { slug } = match.params
            console.log(match)
            return <Article slugId={slug} />
          }}
        />
      </BrowserRouter>
    </div>
  )
}

export default App
