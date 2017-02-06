// Core Imports
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

// Local Imports
import { appRoutes } from './routes';
import './../styles/app.scss';

// Reducers initialization
const rootReducer = combineReducers({
  routing: routerReducer
});

// Store creation
const store = createStore(rootReducer);
const history = syncHistoryWithStore(browserHistory, store);

// Root render
const rootRender = () => {
  return (
    <Provider store={store}>
      <Router history={history}>
        { appRoutes() }
      </Router>
    </Provider>
  );
}
ReactDOM.render(rootRender(), document.getElementById('app'));
