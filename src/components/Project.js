import React from 'react'

export class Project extends React.Component {
  render() {
    const { fold } = this.props
    if (fold) {
      return this.renderFolded()
    } else {
      return this.renderExtended()
    }
  }

  renderFolded() {
    const { project, foldable } = this.props
    return (
      <div className='c-coolbox__item--bordered u-padding-small'>
        { foldable ? this.renderFolder() : null }
        { this.renderTitle(project) }
        <div className='text--tiny text--small@tablet'>
          { this.renderStatus(project) }
          { this.renderTags(project) }
        </div>
        <div className='text--small text--normal@tablet text--italic'>
          <p> { project.short } </p>
        </div>
      </div>
    )
  }

  renderExtended() {
    const { project, foldable } = this.props
    return (
      <div className='c-coolbox__item--bordered u-padding-small'>
        { foldable ? this.renderFolder() : null }
        { this.renderTitle(project) }
        <div className='text--tiny text--small@tablet'>
          { this.renderDates(project) }
          { this.renderTags(project) }
        </div>
        <div>
          <p> { project.description } </p>
        </div>
      </div>
    )
  }

  renderFolder() {
    const { project, fold, onFoldClick } = this.props
    if (fold) {
      return <i onClick={ () => onFoldClick(project.code) } className='c-site__chevron fa fa-chevron-down fa-2x' />
    } else {
      return <i onClick={ () => onFoldClick(project.code) } className='c-site__chevron fa fa-chevron-up fa-2x' />
    }
  }

  renderTitle(project) {
    return (
      <span className='u-h4 u-h3@tablet'>
        <span className='u-margin-right-tiny'>
          { project.name }
        </span>
        { this.renderLink(project) }
      </span>
    )
  }

  renderLink(project) {
    if (!project.url) {
      return <i className='fa fa-external-link-square text--small text--super u-clickable' />
    }
    return (
      <a href={ project.url } target='_blank'>
        <i className='fa fa-external-link text--small text--super u-clickable--light' />
      </a>
    )
  }

  renderStatus(project) {
    let iconClass
    switch (project.status) {
      case 'active':
        iconClass = 'fa fa-play'
        break
      case 'stalled':
        iconClass = 'fa fa-pause'
        break
      case 'dead':
        iconClass = 'fa fa-stop'
    }

    return (
      <div>
        <i className={ iconClass } />
        <span className='text--capitalize u-padding-left-tiny'>{ project.status }</span>
      </div>
    )
  }

  renderDates(project) {
    return (
      <span>
        { this.renderDatesStatus(project) }
        &nbsp;
        <span className='text--italic'>
          { project.start_date }
          &nbsp;-&nbsp;
          { project.end_date ? project.end_date : 'Today' }
        </span>
      </span>
    )
  }

  renderDatesStatus(project) {
    let iconClass
    switch (project.status) {
      case 'active':
        iconClass = 'fa fa-calendar-check-o'
        break
      case 'stalled':
        iconClass = 'fa fa-calendar-o'
        break
      case 'dead':
        iconClass = 'fa fa-calendar-times-o'
    }

    return <i className={ iconClass } />
  }

  renderTags(project) {
    return (
      <div>
        <i className='fa fa-tags u-padding-right-tiny' />
        { project.topics.map(tag => this.renderTag(tag)) }
      </div>
    )
  }

  renderTag(tag) {
    return <span key={ tag } className='text--capitalize'>{ `${tag} ` }</span>
  }
}
