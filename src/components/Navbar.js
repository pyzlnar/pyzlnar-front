import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { onClick, onMouseEnter, onMouseLeave } from './../action-creators/navbar';

class Navbar extends React.Component {
  render() {
    const { items } = this.props;
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
    const { onMouseEnter, onMouseLeave } = this.props;
    return (
      <li
        key={menu.name}
        onMouseEnter={()=> onMouseEnter(menu.name)}
        onMouseLeave={()=> onMouseLeave(menu.name)}
        className="o-list-inline__item c-navbar__item c-navbar__item--menu"
      >
        <div>{menu.name}</div>
        { menu.hover ? this.renderMenuDropdown(menu.links) : null }
      </li>
    )
  }

  renderMenuDropdown(links) {
    return (
      <ul className="o-list-bare c-navbar__dropdown">
        {links.map(link => this.renderLink(link, 'c-navbar__dropdown__item'))}
      </ul>
    );
  }

  renderLink(link, className='o-list-inline__item c-navbar__item c-navbar__item--clickable'){
    const { onClick } = this.props;
    return (
      <li
        key={link.name}
        onClick={() => onClick(link.path)}
        className={className}
      >
      {link.name}
      </li>
    );
  }
}

const mapStateToProps = (state) => {
  return { items: state.navbar }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    onClick,
    onMouseEnter,
    onMouseLeave
  }, dispatch);
}

export const NavbarContainer = connect(mapStateToProps, mapDispatchToProps)(Navbar);
