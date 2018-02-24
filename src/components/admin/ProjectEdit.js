import React                  from 'react'
import { bindActionCreators } from 'redux'
import { connect }            from 'react-redux'

import {
  newProject,
  updateProject
} from '../../api/projects'

import { ProjectForm } from '../forms'

class ProjectEdit extends React.Component {
  render() {
    const { project, updateProject } = this.props
    return (
      <div>
        <h2>Edit Project</h2>
        <ProjectForm project={project} onSubmit={updateProject}/>
      </div>
    )
  }
}

const mapStateToProps = (state, ownState) => {
  const { params: { code } } = ownState
  const { projects: { projects } } = state
  const project = projects.find(project => project.code === code) || newProject()
  return { project }
}

const mapDispatchToProps = (dispatch, ownState) => {
  const { params: { code } } = ownState
  return bindActionCreators({ updateProject: updateProject(code) }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectEdit)
