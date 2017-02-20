import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import sample from 'lodash.sample'
import { CoolBox }       from './CoolBox'
import { Dismissable }   from './Dismissable'
import { SiteContainer } from './Site'
import { setInitialState, onSelectorClick, onFoldClick, onDismiss } from '../action-creators/sitesList'

class SitesList extends React.Component {
  constructor(props) {
    super(props)
    const { sites, selected, route, setInitialState } = this.props
    const display  = selected ? 'details' : 'grid'
    const featured = this.shouldRenderFeatured ? sample(sites) : null
    setInitialState(display, sites, selected, featured)
  }

  shouldRenderFeatured() {
    const { selected, dismissed } = this.props
    return !(selected || dismissed)
  }

  render() {
    return (
      <div>
        { this.renderFeatured() }
        { this.renderContainer() }
      </div>
    )
  }

  renderContainer() {
    return (
      <CoolBox controls={ this.renderSelector() } toolbarSize='small'>
        { this.renderSites() }
      </CoolBox>
    )
  }

  renderSelector() {
    const { display, onSelectorClick } = this.props
    const gridMuted    = display === 'grid'    ? 'c-sites-list__selector--muted' : ''
    const detailsMuted = display === 'details' ? 'c-sites-list__selector--muted' : ''
    return (
      <div>
        <i
          className={ `c-sites-list__selector ${gridMuted} fa fa-th` }
          onClick={ ()=> onSelectorClick('grid') }
        />
        <i
          className={ `c-sites-list__selector ${detailsMuted} fa fa-th-list` }
          onClick={ ()=> onSelectorClick('details') }
        />
      </div>
    )
  }

  renderSites() {
    const { display } = this.props
    return display === 'grid' ? this.renderGrid() : this.renderDetails()
  }

  renderGrid() {
    const { sites } = this.props
    return (
      <div>
        <div className='o-layout'>
          { sites.map(site => this.renderGridSite(site)) }
        </div>
      </div>
    )
  }

  renderFeatured() {
    const { featured, onDismiss } = this.props
    if (!featured || !this.shouldRenderFeatured()) {
      return null
    }
    const title   = `More about ${featured.name}...`
    return (
      <div className='u-margin-bottom'>
        <Dismissable title={title} onDismiss={onDismiss} >
          <SiteContainer site={featured} foldable={false} fold={false} />
        </Dismissable>
      </div>
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

  renderDetails() {
    const { sites, foldedSites, onFoldClick } = this.props
    return sites.map(site => {
      return <SiteContainer
        key      = { site.code }
        site     = { site }
        foldable = { true }
        fold     = { foldedSites[site.code] }
        onFoldClick = { onFoldClick }
      />
    })
  }
}

const mapStateToProps = (state, ownState) => {
  return { ...ownState, ...state.sitesList }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      setInitialState,
      onSelectorClick,
      onFoldClick,
      onDismiss
    },
    dispatch)
}

export const SitesListContainer = connect(mapStateToProps, mapDispatchToProps)(SitesList)
