import React                  from 'react'
import { bindActionCreators } from 'redux'
import { connect }            from 'react-redux'
import { push }               from 'react-router-redux'

class Admin extends React.Component {
  render() {
    const { push } = this.props
    return (
      <div>
        <h2>Admin pages!</h2>
        <ul className='o-list-bare'>
          <li className='o-list-bare__item'>
            <a className='u-clickable' onClick={()=> push('/admin/projects')}>Projects</a>
          </li>
          <li className='o-list-bare__item'>
            <a className='u-clickable' onClick={()=> push('/admin/sites')}>Sites</a>
          </li>
        </ul>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => (
  bindActionCreators({ push }, dispatch)
)

export default connect(null, mapDispatchToProps)(Admin)
