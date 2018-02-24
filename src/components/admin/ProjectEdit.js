import React                  from 'react'
import { bindActionCreators } from 'redux'
import { connect }            from 'react-redux'

import { ProjectForm } from '../forms'

class ProjectEdit extends React.Component {
  render() {
    const { project } = this.props
    return (
      <div>
        <h2>Edit Project</h2>
        <ProjectForm project={project} />
      </div>
    )
  }
}

const mapStateToProps = (state, ownState) => {
  const { params: { code } } = ownState
  const { projects: { projects } } = state
  const project = projects.find(project => project.code === code) || {}
  return { project }
}

export default connect(mapStateToProps)(ProjectEdit)
