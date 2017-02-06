// Core Imports
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

// Local Imports
import { App } from './components/App';
import './../styles/app.scss';

// Reducers initialization
const rootReducer = (state, action) => {
  return state;
}

// Store creation
const store = createStore(rootReducer);

// Root render
const rootRender = () => {
  return (
    <Provider store={store}>
    <App/>
    </Provider>
  );
}
ReactDOM.render(rootRender(), document.getElementById('app'));
