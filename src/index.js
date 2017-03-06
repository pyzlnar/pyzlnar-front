// Core Imports
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer, routerMiddleware } from 'react-router-redux'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import 'font-awesome/css/font-awesome.css'

// Local Imports
import { appRoutes } from './routes'
import './../styles/app.scss'

// Reducer Imports
import navbarReducer       from './reducers/navbar'
import networkErrorReducer from './reducers/networkError'
import projectsReducer     from './reducers/projects'
import sitesReducer        from './reducers/sites'

// Reducers initialization
const rootReducer = combineReducers({
  navbar:       navbarReducer,
  networkError: networkErrorReducer,
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

// Root render
const rootRender = () => {
  return (
    <Provider store={store}>
      <Router history={history}>
        { appRoutes() }
      </Router>
    </Provider>
  )
}
ReactDOM.render(rootRender(), document.getElementById('app'))
