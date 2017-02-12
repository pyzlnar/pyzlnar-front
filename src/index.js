// Core Imports
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer, routerMiddleware } from 'react-router-redux'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'

// Local Imports
import { appRoutes } from './routes'
import './../styles/app.scss'

// Reducer Imports
import navbarReducer    from './reducers/navbar'
import sitesReducer     from './reducers/sites'
import sitesListReducer from './reducers/sitesList'

// Reducers initialization
const rootReducer = combineReducers({
  navbar:    navbarReducer,
  routing:   routerReducer,
  sites:     sitesReducer,
  sitesList: sitesListReducer
})

// Store creation
const loggerMiddleware = createLogger()
const middleware = [
  routerMiddleware(browserHistory),
  thunkMiddleware,
  loggerMiddleware
]
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
