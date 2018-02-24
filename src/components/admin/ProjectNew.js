import React                  from 'react'
import { bindActionCreators } from 'redux'
import { connect }            from 'react-redux'

import { ProjectForm } from '../forms'

class ProjectNew extends React.Component {
  render() {
    return (
      <div>
        <h2>New Project</h2>
        <ProjectForm />
      </div>
    )
  }
}

export default connect()(ProjectNew)
