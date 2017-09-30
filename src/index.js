// Core Imports
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { browserHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer, routerMiddleware } from 'react-router-redux'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import { AppContainer } from 'react-hot-loader';
import 'font-awesome/css/font-awesome.css'

// Local Imports
import OldRoot from './Root'
import '../styles/app.scss'

// Reducer Imports
import authReducer     from './reducers/auth'
import projectsReducer from './reducers/projects'
import sitesReducer    from './reducers/sites'

// Reducers initialization
const rootReducer = combineReducers({
  auth:         authReducer,
  projects:     projectsReducer,
  routing:      routerReducer,
  sites:        sitesReducer,
})

// Middleware initialization
let devMiddleware = []
if (process.env.NODE_ENV !== 'production') {
  const loggerMiddleware = createLogger()
  devMiddleware = [loggerMiddleware]
}
const middleware = [
  routerMiddleware(browserHistory),
  thunkMiddleware,
  ...devMiddleware
]

// Store creation
const store = createStore(rootReducer, applyMiddleware(...middleware))
const history = syncHistoryWithStore(browserHistory, store)

// Render
const render = Root => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <Root history={history} />
      </Provider>
    </AppContainer>,
    document.getElementById('app'))
}
render(OldRoot)

if (module.hot) {
  module.hot.accept('./Root', () => {
    const NewRoot = require('./Root').default
    render(NewRoot)
  })
}
