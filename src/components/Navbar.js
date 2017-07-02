import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import {
  getInitialState,
  toggleHover
} from '../action-creators/navbar'

export class NavbarP extends React.Component {
  constructor(props) {
    super(props)
    this.state = getInitialState()
  }

  render() {
    const { items } = this.state
    return(
      <ul className="o-list-inline c-navbar">
        <div className="c-navbar__container">
          { items.map(item => this.renderItems(item)) }
        </div>
      </ul>
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
    const { onMenuMouseEnter, onMenuMouseLeave } = this.props
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

  renderMenuDropdown(items) {
    return (
      <ul className="o-list-bare c-navbar__dropdown">
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

export const Navbar = connect()(NavbarP)
