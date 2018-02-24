import React                  from 'react'
import { bindActionCreators } from 'redux'
import { connect }            from 'react-redux'

import {
  newProject,
  createProject
} from '../../api/projects'

import { ProjectForm } from '../forms'

class ProjectNew extends React.Component {
  render() {
    const { createProject } = this.props
    return (
      <div>
        <h2>New Project</h2>
        <ProjectForm project={newProject()} onSubmit={createProject}/>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ createProject }, dispatch)
}

export default connect(null, mapDispatchToProps)(ProjectNew)
