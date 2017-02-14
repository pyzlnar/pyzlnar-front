import React from 'react'
import { connect } from 'react-redux'

class Site extends React.Component {
  render() {
    const { site, fold } = this.props
    return (
      <div className="c-site">
        <img className="c-site__logo" src={ `/static/img/sites/${site.code}.png` } alt={ site.name }/>
        <div className="c-site__title u-h3">{ site.name }</div><i className="fa fa-arrow-right" />
        <span className="">{ site.status }</span>
      </div>
    )
  }

  renderFolded() {
  }
}

const mapStateToProps = (state, ownState) => {
  return { ...ownState }
}

export const SiteContainer = connect(mapStateToProps)(Site)
