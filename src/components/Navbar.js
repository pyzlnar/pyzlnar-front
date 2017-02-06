import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

class Navbar extends React.Component {
  onClick(path){
    this.props.dispatch(push(path));
  }

  render() {
    const items = [
      {name: 'Home', path: '/'},
      {name: 'About', links: [{name: 'Me', path: '/about/me'}, {name: 'Pyzlnar', path: '/about/site'}]},
      {name: 'Sites', path: '/sites'},
      {name: 'Projects', path: '/projects'}
    ]
    return(
      <ul className="o-list-inline c-navbar">
        <div className="c-navbar__container">
          { items.map(item => this.renderItems(item)) }
        </div>
      </ul>
    );
  }

  renderItems(item) {
    if (item.links) {
      return this.renderMenu(item);
    } else {
      return this.renderLink(item);
    }
  }

  renderMenu(menu){
    return (
      <li key={menu.name} className="o-list-inline__item c-navbar__item c-navbar__item--menu">
        <div>{menu.name}</div>
        <ul className="o-list-bare c-navbar__dropdown">
          {menu.links.map(link => this.renderLink(link, 'c-navbar__dropdown__item'))}
        </ul>
      </li>
    )
  }

  renderLink(link, className='o-list-inline__item c-navbar__item c-navbar__item--clickable'){
    return (
      <li
        key={link.name}
        onClick={() => this.onClick(link.path)}
        className={className}
      >
      {link.name}
      </li>
    );
  }
}

export const NavbarContainer = connect()(Navbar);
