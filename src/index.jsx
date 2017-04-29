import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import app from './modules/app'
import './index.scss'
import App from './containers/App'

const store = createStore(app)
const rootEl = document.getElementById('root')

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootEl
)
