import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { onItemClick, onMenuMouseEnter, onMenuMouseLeave } from './../action-creators/navbar';

class NavbarP extends React.Component {
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
    if (item.items) {
      return this.renderMenu(item);
    } else {
      return this.renderItem(item);
    }
  }

  renderMenu(menu){
    const { onMenuMouseEnter, onMenuMouseLeave } = this.props;
    return (
      <li
        key={menu.name}
        onMouseEnter={()=> onMenuMouseEnter(menu.name)}
        onMouseLeave={()=> onMenuMouseLeave(menu.name)}
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
    );
  }

  renderItem(item, className='o-list-inline__item c-navbar__item c-navbar__item--clickable'){
    const { onItemClick } = this.props;
    return (
      <li
        key={item.name}
        onClick={() => onItemClick(item.path)}
        className={className}
      >
      {item.name}
      </li>
    );
  }
}

const mapStateToProps = (state) => {
  return { items: state.navbar }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    onItemClick,
    onMenuMouseEnter,
    onMenuMouseLeave
  }, dispatch);
}

export const Navbar = connect(mapStateToProps, mapDispatchToProps)(NavbarP);
