import React                  from 'react'
import { bindActionCreators } from 'redux'
import { connect }            from 'react-redux'
import { push }               from 'react-router-redux'

class SiteShow extends React.Component {
  render() {
    const { push, site } = this.props
    return (
      <div>
        <h2>{site.name}</h2>
        <dl>
          <dt>code</dt>
          <dd>{site.code}</dd>
          <dt>url</dt>
          <dd>{site.url}</dd>
          <dt>status</dt>
          <dd>{site.status}</dd>
          <dt>topics</dt>
          <dd>{site.topics}</dd>
          <dt>description</dt>
          <dd>{site.description}</dd>
        </dl>
        <button className='btn' onClick={() => push('/admin/sites')}>Back</button>
      </div>
    )
  }
}

const mapStateToProps = (state, ownState) => {
  const { params: { code } } = ownState
  const { sites: { sites } } = state
  const site = sites.find(site => site.code === code) || {}
  return { site }
}

const mapDispatchToProps = dispatch => (
  bindActionCreators({ push }, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(SiteShow)
