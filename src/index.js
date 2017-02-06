// Core Imports
import React from 'react';
import ReactDOM from 'react-dom';

// Local Imports
import { App } from './components/App';
import './../styles/app.scss';

// Root render
const rootRender = () => {
  return (
    <App/>
  );
}
ReactDOM.render(rootRender(), document.getElementById('app'));
