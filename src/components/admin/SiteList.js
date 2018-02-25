import React                  from 'react'
import { bindActionCreators } from 'redux'
import { connect }            from 'react-redux'

import {
  deleteSite,
  fetchSites,
  reloadSites
} from '../../api/sites'

import { Loading }      from '../Loading'
import { NetworkError } from '../NetworkError'
import AdminTable       from './AdminTable'

class SiteList extends React.Component {
  componentDidMount() {
    this.props.fetchSites()
  }

  shouldRenderSites() {
    const { isFetching, sites } = this.props
    return !isFetching && sites.length !== 0
  }

  shouldRenderError() {
    return this.props.fetchFailed
  }

  render() {
    return (
      <div>
        <h3>Manage Sites</h3>
        { this.renderBody() }
      </div>
    )
  }

  renderBody() {
    const { sites, fetchSites, reloadSites } = this.props
    if (this.shouldRenderSites()) {
      return <AdminTable items={sites} path='/admin/sites' reload={reloadSites} deleteItem={deleteSite}/>
    } else if (this.shouldRenderError()) {
      return <NetworkError retryAction={fetchSites} />
    } else {
      return <Loading />
    }
  }
}

const mapStateToProps = state => ( { ...state.sites } )

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    fetchSites,
    reloadSites
  }, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(SiteList)
