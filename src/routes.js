// Core Imports
import React from 'react';
import { Route, IndexRoute } from 'react-router'

// Pages
import { App }      from './components/App';
import { Home }     from './components/Home';
import { NotFound } from './components/NotFound';

export const appRoutes = () => {
  return (
    <Route path="/" component={App}>
      <IndexRoute name='Home' component={Home} />
      <Route name='NotFound' path="*" component={NotFound}/>
    </Route>
  );
}
