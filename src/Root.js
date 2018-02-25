// Core Imports
import React                         from 'react'
import { bindActionCreators }        from 'redux'
import { connect }                   from 'react-redux'
import { Router, Route, IndexRoute } from 'react-router'

import { authenticate, authorize } from './api/auth'

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

// Admin Pages
import {
  Admin,
  AdminProjectList,
  AdminProjectNew,
  AdminProjectShow,
  AdminProjectEdit,
  AdminSiteList,
  AdminSiteNew,
  AdminSiteShow,
  AdminSiteEdit
} from './components/admin'

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
          { this.renderAuthorizedRoutes() }
          <Route component={ NotFound } path='*' />
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

  renderAuthorizedRoutes() {
    const { authorize } = this.props
    return (
      <Route onEnter={authorize}>
        <Route component={ Admin }            path='/admin'                     />
        <Route component={ AdminProjectList } path='/admin/projects'            />
        <Route component={ AdminProjectNew }  path='/admin/projects/new'        />
        <Route component={ AdminProjectShow } path='/admin/projects/:code'      />
        <Route component={ AdminProjectEdit } path='/admin/projects/:code/edit' />
        <Route component={ AdminSiteList }    path='/admin/sites'               />
        <Route component={ AdminSiteNew }     path='/admin/sites/new'           />
        <Route component={ AdminSiteShow }    path='/admin/sites/:code'         />
        <Route component={ AdminSiteEdit }    path='/admin/sites/:code/edit'    />
      </Route>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    authenticate,
    authorize
  }, dispatch)
}

export default connect(null, mapDispatchToProps)(Routes)
