import React                  from 'react'
import { bindActionCreators } from 'redux'
import { connect }            from 'react-redux'

import {
  newSite,
  createSite
} from '../../api/sites'

import { SiteForm } from '../forms'

class SiteNew extends React.Component {
  render() {
    const { createSite } = this.props
    return (
      <div>
        <h2>New Site</h2>
        <SiteForm site={newSite()} onSubmit={createSite}/>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ createSite }, dispatch)
}

export default connect(null, mapDispatchToProps)(SiteNew)
