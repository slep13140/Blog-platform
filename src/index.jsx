/* eslint-disable no-underscore-dangle */
import React from 'react'
import thunk from 'redux-thunk'
import { createRoot } from 'react-dom/client'
import { createStore, compose, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'

import reducer from './store/reducer'
import { App } from './components/App'
import './index.module.scss'

const a = typeof window === 'object'
const b = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__

const composeEnhancers = a && b ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose

const enhancer = composeEnhancers(applyMiddleware(thunk))

const store = createStore(reducer, enhancer)

const root = createRoot(document.getElementById('root'))

const element = (
  <Provider store={store}>
    <App />
  </Provider>
)
root.render(element)
