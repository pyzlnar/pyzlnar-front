import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { SiteContainer }   from './Site'
import { onSelectorClick } from '../action-creators/sitesList'

class SitesList extends React.Component {
  render() {
    return (
      <div className='c-sites-list'>
        <div className='c-sites-list__toolbar'>
           { this.renderSelector() }
        </div>
        <div className='c-sites-list__sites'>
          { this.renderSites() }
        </div>
      </div>
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
      <div className='o-layout'>
        { sites.map(site => this.renderGridSite(site)) }
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
    const { sites } = this.props
    return sites.map(site => <SiteContainer key={ site.code } site={ site } />)
  }
}

const mapStateToProps = (state, ownState) => {
  return { sites: ownState.sites, ...state.sitesList }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ onSelectorClick }, dispatch)
}

export const SitesListContainer = connect(mapStateToProps, mapDispatchToProps)(SitesList)
