import React                  from 'react'
import { bindActionCreators } from 'redux'
import { connect }            from 'react-redux'

import { fetchProjects } from '../../api/projects'

import { Loading }      from '../Loading'
import { NetworkError } from '../NetworkError'
import AdminTable       from './AdminTable'

class ProjectList extends React.Component {
  componentDidMount() {
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
        <h3>Manage Projects</h3>
        { this.renderBody() }
      </div>
    )
  }

  renderBody() {
    if (this.shouldRenderProjects()) {
      return this.renderProjects()
    } else if (this.shouldRenderError()) {
      return <NetworkError retryAction={ this.props.fetchProjects } />
    } else {
      return <Loading />
    }
  }

  renderProjects() {
    const { projects } = this.props
    return <AdminTable items={projects} />
  }

  renderProject(project) {
    return (
      <div>
        <span>{project.name}</span>
        <ul className='o-list-inline'>
          <li className='o-list-inline__item'>View</li>
          <li className='o-list-inline__item'>Edit</li>
          <li className='o-list-inline__item'>Delete</li>
        </ul>
      </div>
    )
  }
}

const mapStateToProps = state => ( { ...state.projects } )

const mapDispatchToProps = dispatch => (
  bindActionCreators({ fetchProjects }, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(ProjectList)
