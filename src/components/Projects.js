import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import {
  toggleFold,
  setFeatured,
  dismissFeatured
} from '../action-creators/projects'
import { fetchProjects }           from '../api/projects'

import { CoolBox }      from './CoolBox'
import { Dismissable }  from './Dismissable'
import { Loading }      from './Loading'
import { NetworkError } from './NetworkError'
import { Project }      from './Project'

class ProjectsP extends React.Component {
  constructor(props) {
    super(props)
    this.props.setFeatured(this.props.selected)
  }

  componentDidMount () {
    this.props.fetchProjects(this.props.selected)
  }

  shouldRenderProjects() {
    const { isFetching, projects } = this.props
    return !isFetching && projects.length !== 0
  }

  shouldRenderError() {
    return this.props.fetchFailed
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
        <h2>Projects</h2>
        <p>
          Every now and then I get this necessity to make something. Sometimes this ends up
          being in a tweet, a blog post or a fun exercise. Some other times I end up building
          weird stuff for fun. In here you'll find record of different projects I've been involved
          in during the years.
        </p>
      </div>
    )
  }

  renderBody() {
    if (this.shouldRenderProjects()) {
      return this.renderProjects()
    } else if (this.shouldRenderError()) {
      return <NetworkError retryAction={ fetchProjects } />
    } else {
      return <Loading />
    }
  }

  renderProjects() {
    return (
      <div>
        { this.renderFeatured() }
        { this.renderProjectsList() }
      </div>
    )
  }

  renderFeatured() {
    const { featured, selected, dismissFeatured } = this.props
    if (featured.dismissed || !featured.project) {
      return null
    }

    let title
    if (selected === featured.project.code) {
      title = ''
    } else {
      title = 'For example...'
    }

    return (
      <div className='u-margin-bottom'>
        <Dismissable title={ title } onDismiss={ dismissFeatured }>
          <Project
            project  = { featured.project }
            foldable = { false }
            fold     = { false }
          />
        </Dismissable>
      </div>
    )
  }

  renderProjectsList() {
    const { projects, foldedProjects, toggleFold } = this.props
    return (
      <CoolBox>
        {
          projects.map(project => {
            return <Project
              key         = { project.code }
              project     = { project }
              foldable    = { true }
              fold        = { foldedProjects[project.code] }
              onFoldClick = { toggleFold }
            />
          })
        }
      </CoolBox>
    )
  }
}

const mapStateToProps = (state, ownState) => {
  return { ...state.projects, selected: ownState.params.project }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    fetchProjects,
    toggleFold,
    setFeatured,
    dismissFeatured
  }, dispatch)
}

export const Projects = connect(mapStateToProps, mapDispatchToProps)(ProjectsP)
