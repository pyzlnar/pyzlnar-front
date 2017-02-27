import React from 'react'
import { connect } from 'react-redux'

class SiteP extends React.Component {
  render() {
    const { fold } = this.props
    return fold ? this.renderFolded() : this.renderExtended()
  }

  renderFolded() {
    const { site, foldable } = this.props
    return (
      <div className="c-site">
        { foldable ? this.renderFolder() : null }
        { this.renderLogo(site) }
        { this.renderTitle(site) }
        { this.renderStatus(site) }
        { this.renderTags(site) }
      </div>
    )
  }

  renderExtended() {
    const { site, foldable } = this.props
    return (
      <div className='c-site c-site--extended'>
        { foldable ? this.renderFolder() : null }

        <div className='o-media o-media--tiny'>
          <div className='o-media__img'>
            { this.renderLogo(site) }
          </div>
          <div className='o-media__body'>
            { this.renderTitle(site) }
            { this.renderStatus(site) }
            { this.renderTags(site) }
          </div>
        </div>
        <div className='c-site__desc'>
          <p>
            { site.description }
          </p>
        </div>
      </div>
    )
  }

  renderFolder() {
    const { site, fold, onFoldClick } = this.props
    if (fold) {
      return <i onClick={ () => onFoldClick(site.code) } className='c-site__chevron fa fa-chevron-down fa-2x' />
    } else {
      return <i onClick={ () => onFoldClick(site.code) } className='c-site__chevron fa fa-chevron-up fa-2x' />
    }
  }

  renderLogo(site) {
    return <img className="c-site__logo" src={ `/static/img/sites/${site.code}.png` } alt={ site.name }/>
  }

  renderTitle(site) {
    return (
      <div>
        <span className='u-h4 u-h3@tablet'> { site.name } </span>
        <a className='c-site__link text--small text--normal@tablet' href={ site.url } target='_blank'>
          <i className='fa fa-external-link' />
        </a>
      </div>
    )
  }

  renderStatus(site) {
    var iconClass
    if (site.status === 'active') {
      iconClass = 'fa fa-check'
    } else {
      iconClass = 'fa fa-times'
    }
    return (
      <div className='text--tiny text--small@tablet'>
        <i className={ iconClass } />
        <span className='text--capitalize u-padding-left-tiny'>{ site.status }</span>
      </div>
    )

  }

  renderTags(site) {
    return (
      <div className='text--tiny text--small@tablet'>
        <i className='fa fa-tags u-padding-right-tiny' />
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

export const Site = connect(mapStateToProps)(SiteP)
