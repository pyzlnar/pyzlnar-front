import React from 'react'
import { connect } from 'react-redux'

class Site extends React.Component {
  render() {
    const { fold } = this.props
    return fold ? this.renderFolded() : this.renderExtended()
  }

  renderFolded() {
    const { site, foldable } = this.props
    return (
      <div className="c-site">
        { foldable ? this.renderFolder() : null }
        <img className="c-site__logo" src={ `/static/img/sites/${site.code}.png` } alt={ site.name }/>
        <div>
          <span className='u-h3'> { site.name } </span>
          <a className='c-site__link' href={ site.url } target='_blank'>
            <i className='fa fa-external-link' />
          </a>
        </div>
        <div>
          { this.renderStatus(site) }
          { this.renderTags(site) }
        </div>
      </div>
    )
  }

  renderExtended() {
    return this.renderFolded()
  }

  renderFolder() {
    const { site, fold, onFoldClick } = this.props
    if (fold) {
      return <i onClick={ () => onFoldClick(site.code) } className='c-site__chevron fa fa-chevron-down fa-2x' />
    } else {
      return <i onClick={ () => onFoldClick(site.code) } className='c-site__chevron fa fa-chevron-up fa-2x' />
    }
  }

  renderStatus(site) {
    var iconClass
    if (site.status === 'active') {
      iconClass = 'fa fa-check'
    } else {
      iconClass = 'fa fa-times'
    }
    return (
      <div>
        <i className={ iconClass } />
        <span className='text--capitalize u-padding-left-tiny'>{ site.status }</span>
      </div>
    )

  }

  renderTags(site) {
    return (
      <div>
        <i className="fa fa-tags u-padding-right-tiny" />
        { site.topics.map(tag => this.renderTag(tag)) }
      </div>
    )
  }

  renderTag(tag) {
    return <span key={ tag } className='text--capitalize'>{ `${tag} ` }</span>
  }
}

const mapStateToProps = (state, ownState) => {
  return { ...ownState }
}

const mapDispatchToProps = (dispatch, ownState) => {
  if (!ownState.onFoldClick) {
    return {}
  }

  return bindActionCreators({ onFoldClick: ownState.onFoldClick }, dispatch)
}

export const SiteContainer = connect(mapStateToProps)(Site)
