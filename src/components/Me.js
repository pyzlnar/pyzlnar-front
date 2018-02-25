import React       from 'react'
import { connect } from 'react-redux'

export class MeP extends React.Component {
  render() {
    const { me } = this.props

    return (
      <div className='o-layout o-layout--reverse'>
        <div className='o-layout__item u-1/1 u-1/3@tablet'>
          <img className='o-thumbnail' src={me.thumbnail} />
        </div>
        <div className='o-layout__item u-1/1 u-2/3@tablet'>
          <h2>Me</h2>
          <ul className='o-list-bare'>
            <li className='o-list-bare__item'>{me.username}</li>
            <li className='o-list-bare__item'>{me.email}</li>
          </ul>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return { me: state.auth.user }
}

export const Me = connect(mapStateToProps)(MeP)
