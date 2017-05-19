import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import App from './containers/App'
import app from './modules/app'

export default function prerender () {
  return ReactDOMServer.renderToString(
    <Provider store={createStore(app)}>
      <App />
    </Provider>
  )
}
