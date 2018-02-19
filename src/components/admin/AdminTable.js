import React                  from 'react'
import { bindActionCreators } from 'redux'
import { connect }            from 'react-redux'
import { push }               from 'react-router-redux'

import { CoolBox } from '../CoolBox'

class AdminTable extends React.Component {
  render() {
    return (
      <CoolBox>
        <div className='o-layout u-padding-horizontal-small u-margin-top-small'>
          { this.renderTopMenu() }
          { this.props.items.map(item => this.renderItem(item)) }
        </div>
      </CoolBox>
    )
  }

  renderTopMenu() {
    const { path, push, reload } = this.props
    return (
      <div className='o-layout__item u-margin-bottom-small text--right'>
        <a className='c-btn c-btn--info'    onClick={() => reload() }> Refresh </a>
        <a className='c-btn c-btn--warning' onClick={() => push(`${path}/new`)}> Add New </a>
      </div>
    )
  }

  renderItem(item) {
    const { path, push } = this.props
    return (
      <div className='o-layout__item'>
        <span className='u-h4'>{item.name}</span>
        <ul className='o-list-inline'>
          <li className='o-list-inline__item'>
            <a className='c-btn c-btn--info' onClick={() => push(`${path}/${item.code}`)}>
              View
            </a>
          </li>
          <li className='o-list-inline__item'>
            <a className='c-btn c-btn--warning' onClick={() => push(`${path}/${item.code}/edit`)}>
              Edit
            </a>
          </li>
          <li className='o-list-inline__item'>
            <button className='c-btn c-btn--danger'>
              Delete
            </button>
          </li>
        </ul>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => (
  bindActionCreators({ push }, dispatch)
)

export default connect(null, mapDispatchToProps)(AdminTable)
