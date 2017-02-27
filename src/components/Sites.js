import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import {
  toggleDisplay,
  toggleFold,
  setFeatured,
  dismissFeatured
} from '../action-creators/sites'
import { fetchSites } from '../api/sites'

import { CoolBox }               from './CoolBox'
import { Dismissable }           from './Dismissable'
import { Loading }               from './Loading'
import { NetworkErrorContainer } from './NetworkError'
import { Site }                  from './Site'

class Sites extends React.Component {
  constructor(props) {
    super(props)
    this.props.setFeatured(this.props.selected)
  }

  componentDidMount() {
    this.props.fetchSites(this.props.selected)
  }

  shouldRenderSites() {
    const { isFetching, sites } = this.props
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
    const { display } = this.props
    return (
      <div>
        { this.renderFeatured() }
        { display === 'grid' ? this.renderGrid() : this.renderList() }
      </div>
    )
  }

  renderFeatured() {
    const { featured, selected, dismissFeatured } = this.props
    if (featured.dismissed || !featured.site) {
      return null
    }

    const title = `More about ${featured.site.name}...`
    return (
      <div className='u-margin-bottom'>
        <Dismissable title={ title } onDismiss={ dismissFeatured } >
          <Site
            site    ={ featured.site }
            fold    ={ false }
            foldable={ false }
          />
        </Dismissable>
      </div>
    )
  }

  renderSelector() {
    const { display, toggleDisplay } = this.props
    const gridMuted    = display === 'grid'    ? 'c-sites-list__selector--muted' : ''
    const detailsMuted = display === 'details' ? 'c-sites-list__selector--muted' : ''
    return (
      <div>
        <i
          className={ `c-sites-list__selector ${gridMuted} fa fa-th` }
          onClick={ ()=> toggleDisplay('grid') }
        />
        <i
          className={ `c-sites-list__selector ${detailsMuted} fa fa-th-list` }
          onClick={ ()=> toggleDisplay('details') }
        />
      </div>
    )
  }

  renderGrid() {
    const { sites } = this.props
    return (
      <CoolBox controls={ this.renderSelector() } toolbarSize='small'>
        <div className='o-layout'>
          { sites.map(site => this.renderGridSite(site)) }
        </div>
      </CoolBox>
    )
  }

  renderGridSite(site) {
    return (
      <div key={ site.code } className='o-layout__item c-sites-list__item u-1/2 u-1/5@tablet'>
        <a className='c-sites-list__link' href={ site.url } target='_blank'>
          <img src={ `/static/img/sites/${site.code}.png` } alt={ site.name } title={ site.name } />
        </a>
      </div>
    )
  }

  renderList() {
    const { sites } = this.props
    return (
      <CoolBox controls={ this.renderSelector() } toolbarSize='small'>
        { sites.map(site => this.renderListSite(site)) }
      </CoolBox>
    )
  }

  renderListSite(site) {
    const { foldedSites, toggleFold } = this.props
    return <Site
      key      = { site.code }
      site     = { site }
      foldable = { true }
      fold     = { foldedSites[site.code] }
      onFoldClick = { toggleFold }
    />
  }
}

const mapStateToProps = (state, ownState) => {
  return { ...state.sites, selected: ownState.params.site }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    fetchSites,
    setFeatured,
    dismissFeatured,
    toggleDisplay,
    toggleFold,
  }, dispatch)
}

export const SitesContainer = connect(mapStateToProps, mapDispatchToProps)(Sites)
