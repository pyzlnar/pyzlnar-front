// Core Imports
import React                         from 'react'
import { bindActionCreators }        from 'redux'
import { connect }                   from 'react-redux'
import { Router, Route, IndexRoute } from 'react-router'

import { authenticate } from './api/auth'

// Pages
import { App }      from './components/App'
import { Home }     from './components/Home'
import { Login }    from './components/Login'
import { About }    from './components/About'
import { Sites }    from './components/Sites'
import { Projects } from './components/Projects'
import { Me }       from './components/Me'
import { MeEdit }   from './components/MeEdit'
import { Rem }      from './components/Rem'
import { NotFound } from './components/NotFound'

class Routes extends React.Component {
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
          { this.renderAuthenticatedRoutes() }
          <Route component={ NotFound } path='*'                    />
        </Route>
      </Router>
    )
  }

  renderAuthenticatedRoutes() {
    const { authenticate } = this.props
    return (
      <Route onEnter={authenticate}>
        <Route component={ Me }     path='/me'      />
        <Route component={ MeEdit } path='/me/edit' />
      </Route>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    authenticate
  }, dispatch)
}

export default connect(null, mapDispatchToProps)(Routes)
