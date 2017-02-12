import React from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class SitesList extends React.Component {
  render() {
    return (
      <div className='c-sites-list'>
        <div className='c-sites-list__selector'>
          <span>Im making space!</span>
        </div>
        { this.renderSites() }
      </div>
    )
  }

  renderSites() {
    const { sites } = this.props
    return (
      <div className='o-layout'>
        { sites.map(site => this.renderHSite(site)) }
      </div>
    )
  }

  renderHSite(site) {
    return (
      <div key={ site.code } className='c-sites-list__item o-layout__item u-1/2 u-1/5@tablet'>
        <a href={site.url} target="_blank">
          <img src={`/static/img/sites/${site.code}`} alt={site.name}/>
        </a>
      </div>
    )
  }
}

const mapStateToProps = (state, ownState) => {
  return { sites: ownState.sites }
}

export const SitesListContainer = connect(mapStateToProps)(SitesList)
