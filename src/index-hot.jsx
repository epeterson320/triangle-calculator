import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { AppContainer } from 'react-hot-loader'

import app from './modules/app'
import { init, pushStateToHistory } from './modules/query'
import App from './containers/App'
import '../styles/index.scss'

// eslint-disable-next-line no-underscore-dangle
const devExt = window.__REDUX_DEVTOOLS_EXTENSION__
const devtools = devExt && devExt()
const store = createStore(app, devtools)
const rootEl = document.getElementById('root')

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <Component />
      </Provider>
    </AppContainer>,
    rootEl
  )
}

render(App)

// Hot Module Replacement API
if (module.hot) module.hot.accept('./containers/App', () => { render(App) })

store.dispatch(init(window.location))

store.subscribe(() => {
  pushStateToHistory(window)(store.getState())
})
