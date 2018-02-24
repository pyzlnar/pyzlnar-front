import React                  from 'react'
import { bindActionCreators } from 'redux'
import { connect }            from 'react-redux'

import {
  newSite,
  updateSite
} from '../../api/sites'

import { SiteForm } from '../forms'

class SiteEdit extends React.Component {
  render() {
    const { site, updateSite } = this.props
    return (
      <div>
        <h2>Edit Site</h2>
        <SiteForm site={site} onSubmit={updateSite}/>
      </div>
    )
  }
}

const mapStateToProps = (state, ownState) => {
  const { params: { code } } = ownState
  const { sites: { sites } } = state
  const site = sites.find(site => site.code === code) || newSite()
  return { site }
}

const mapDispatchToProps = (dispatch, ownState) => {
  const { params: { code } } = ownState
  return bindActionCreators({ updateSite: updateSite(code) }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SiteEdit)
