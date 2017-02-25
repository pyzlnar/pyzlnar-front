import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { toggleFold }    from '../action-creators/projects'
import { fetchProjects } from '../api/projects'
import { CoolBox }               from './CoolBox'
import { Loading }               from './Loading'
import { NetworkErrorContainer } from './NetworkError'
import { Project }               from './Project'

class ProjectsP extends React.Component {
  componentDidMount () {
    this.props.fetchProjects()
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
      return <NetworkErrorContainer retryAction={ fetchProjects } />
    } else {
      return <Loading />
    }
  }

  renderProjects() {
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

const mapStateToProps = state => {
  return { ...state.projects }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ fetchProjects, toggleFold }, dispatch)
}

export const Projects = connect(mapStateToProps, mapDispatchToProps)(ProjectsP)
