import React                  from 'react'
import { bindActionCreators } from 'redux'
import { connect }            from 'react-redux'

import {
  deleteProject,
  fetchProjects,
  reloadProjects
} from '../../api/projects'

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
    const { projects, reloadProjects } = this.props
    if (this.shouldRenderProjects()) {
      return <AdminTable items={projects} path='/admin/projects' reload={reloadProjects} deleteItem={deleteProject}/>
    } else if (this.shouldRenderError()) {
      return <NetworkError retryAction={ this.props.fetchProjects } />
    } else {
      return <Loading />
    }
  }
}

const mapStateToProps = state => ( { ...state.projects } )

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    fetchProjects,
    reloadProjects
  }, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(ProjectList)
