// Core Imports
import React from 'react'
import { Route, IndexRoute } from 'react-router'

// Pages
import { App }      from './components/App'
import { Home }     from './components/Home'
import { About }    from './components/About'
import { Sites }    from './components/Sites'
import { Projects } from './components/Projects'
import { Rem }      from './components/Rem'
import { NotFound } from './components/NotFound'

export const appRoutes = () => {
  return (
    <Route component={ App } path='/'>
      <IndexRoute component={ Home } />
      <Route component={ Home }     path='/home'                />
      <Route component={ About }    path='/about(/:who)'        />
      <Route component={ Sites }    path='/sites(/:site)'       />
      <Route component={ Projects } path='/projects(/:project)' />
      <Route component={ Rem }      path='/rem'                 />
      <Route component={ NotFound } path='*'                    />
    </Route>
  )
}
