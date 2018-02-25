import React                  from 'react'
import { bindActionCreators } from 'redux'
import { connect }            from 'react-redux'
import { push }               from 'react-router-redux'

class ProjectShow extends React.Component {
  render() {
    const { push, project } = this.props
    return (
      <div>
        <h2>{project.name}</h2>
        <dl>
          <dt>code</dt>
          <dd>{project.code}</dd>
          <dt>start_date</dt>
          <dd>{project.start_date}</dd>
          <dt>end_date</dt>
          <dd>{project.end_date}</dd>
          <dt>url</dt>
          <dd>{project.url}</dd>
          <dt>status</dt>
          <dd>{project.status}</dd>
          <dt>topics</dt>
          <dd>{project.topics}</dd>
          <dt>short</dt>
          <dd>{project.short}</dd>
          <dt>description</dt>
          <dd>{project.description}</dd>
        </dl>
        <button className='btn' onClick={() => push('/admin/projects')}>Back</button>
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

const mapDispatchToProps = dispatch => (
  bindActionCreators({ push }, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(ProjectShow)
