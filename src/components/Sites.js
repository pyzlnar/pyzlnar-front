import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { fetchSites } from '../api/sites'
import { Loading }               from './Loading'
import { NetworkErrorContainer } from './NetworkError'
import { SitesListContainer }    from './SitesList'

class Sites extends React.Component {
  componentDidMount() {
    this.props.fetchSites()
  }

  shouldRenderSites() {
    const { isFetching, sites } = this.props.sites
    return !isFetching && sites.length !== 0
  }

  shouldRenderError() {
    return this.props.sites.fetchFailed
  }

  render() {
    return (
      <div>
        { this.renderIntro() }
        { this.renderBody()  }
      </div>
    )
  }

  renderIntro() {
    return (
      <div>
        <h2>Sites</h2>
        <p>
          In here you will find links to several sites and profiles I have around the internet.
          Feel free to reach me out in any of them if you want to!
        </p>
      </div>
    )
  }

  renderBody() {
    if (this.shouldRenderSites()) {
      return this.renderSites()
    } else if (this.shouldRenderError()) {
      return <NetworkErrorContainer retryAction={ fetchSites }/>
    } else {
      return <Loading />
    }
  }

  renderSites() {
    const { selected } = this.props
    const sites        = this.props.sites.sites
    return <SitesListContainer sites={sites} selected={selected} />
  }

  renderSite(site) {
    return (
      <li key={site.code}>
        { site.name }
        <p> { site.description } </p>
      </li>
    )
  }
}

const mapStateToProps = (state, ownState) => {
  return { sites: state.sites, selected: ownState.params.site }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ fetchSites }, dispatch)
}

export const SitesContainer = connect(mapStateToProps, mapDispatchToProps)(Sites)
