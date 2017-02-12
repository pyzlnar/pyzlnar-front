import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { onSelectorClick } from '../action-creators/sitesList'

class SitesList extends React.Component {
  render() {
    return (
      <div className='c-sites-list'>
        <div className='c-sites-list__selector'>
           { this.renderSelector() }
        </div>
        { this.renderSites() }
      </div>
    )
  }

  renderSelector() {
    const { onSelectorClick } = this.props
    return (
      <div>
        <span onClick={ ()=> onSelectorClick('grid') }>Grid</span>
        <span onClick={ ()=> onSelectorClick('details') }>Details</span>
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
      <div key={ site.code } className='c-sites-list__item o-layout__item u-1/2 u-1/5@tablet'>
        <a href={ site.url } target="_blank">
          <img src={ `/static/img/sites/${site.code}` } alt={ site.name }/>
        </a>
      </div>
    )
  }

  renderDetails() {
    const { sites } = this.props
    return null
  }
}

const mapStateToProps = (state, ownState) => {
  return { sites: ownState.sites, ...state.sitesList }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ onSelectorClick }, dispatch)
}

export const SitesListContainer = connect(mapStateToProps, mapDispatchToProps)(SitesList)
