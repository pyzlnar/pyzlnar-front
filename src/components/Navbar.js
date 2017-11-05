import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import {
  getUserItems,
  initialState,
  toggleHover
} from '../action-creators/navbar'

export class NavbarP extends React.Component {
  constructor(props) {
    super(props)
    this.state = initialState
  }

  render() {
    const { items } = this.state
    const { loggedIn } = this.props
    return(
      <ul className="o-list-inline c-navbar">
        <div className="c-navbar__container">
          { items.map(item => this.renderItems(item)) }
          { loggedIn && this.renderUserMenu() }
        </div>
      </ul>
    )
  }

  renderUserMenu() {
    const { showUserMenu } = this.state
    const { user }         = this.props
    const { thumbnail }    = user
    return (
      <div
        onMouseEnter={()=> this.setState({showUserMenu: true}) }
        onMouseLeave={()=> this.setState({showUserMenu: false}) }
        className='o-list-inline__item c-navbar__user c-navbar__item--clickable c-navbar__item--menu'
      >
        <img src={thumbnail} className='c-navbar__user__thumb'/>
        { showUserMenu && this.renderMenuDropdown(getUserItems(user), false) }
      </div>
    )
  }

  renderItems(item) {
    if (item.items) {
      return this.renderMenu(item)
    } else {
      return this.renderItem(item)
    }
  }

  renderMenu(menu){
    return (
      <li
        key={menu.name}
        onMouseEnter={()=> this.setState(prevState => toggleHover(prevState, menu.name))}
        onMouseLeave={()=> this.setState(prevState => toggleHover(prevState, menu.name))}
        className="o-list-inline__item c-navbar__item c-navbar__item--menu"
      >
        <div>{menu.name}</div>
        { menu.hover ? this.renderMenuDropdown(menu.items) : null }
      </li>
    )
  }

  renderMenuDropdown(items, alignLeft = true) {
    const align = alignLeft ? '' : 'c-navbar__dropdown--right'
    const className = `o-list-bare c-navbar__dropdown ${align}`
    return (
      <ul className={className}>
        {items.map(item => this.renderItem(item, 'c-navbar__dropdown__item'))}
      </ul>
    )
  }

  renderItem(item, className='o-list-inline__item c-navbar__item c-navbar__item--clickable'){
    const { dispatch } = this.props
    return (
      <li
        key={item.name}
        onClick={() => dispatch(push(item.path))}
        className={className}
      >
      {item.name}
      </li>
    )
  }
}

const mapStateToProps = state => {
  return { ...state.auth }
}

export const Navbar = connect(mapStateToProps)(NavbarP)
