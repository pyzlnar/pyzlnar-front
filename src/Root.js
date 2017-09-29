// Core Imports
import React from 'react'
import { Router, Route, IndexRoute } from 'react-router'

// Pages
import { App }      from './components/App'
import { Home }     from './components/Home'
import { Login }    from './components/Login'
import { About }    from './components/About'
import { Sites }    from './components/Sites'
import { Projects } from './components/Projects'
import { Rem }      from './components/Rem'
import { NotFound } from './components/NotFound'

export default class extends React.Component {
  render() {
    const { history } = this.props
    return (
      <Router history={history}>
        <Route component={ App } path='/'>
          <IndexRoute component={ Home } />
          <Route component={ Home }     path='/home'                />
          <Route component={ Login }    path='/login'               />
          <Route component={ About }    path='/about(/:who)'        />
          <Route component={ Sites }    path='/sites(/:site)'       />
          <Route component={ Projects } path='/projects(/:project)' />
          <Route component={ Rem }      path='/rem'                 />
          <Route component={ NotFound } path='*'                    />
        </Route>
      </Router>
    )
  }
}
