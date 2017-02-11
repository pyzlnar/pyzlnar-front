import React from 'react';
import { NavbarContainer } from './Navbar'

export class Header extends React.Component {
  render(){
    return (
      <div className="c-header">
        <div className="content">
          <div className ="c-header__body text--center">
            <img  className="c-header__logo" src={'/static/img/logo.png'} />
            <span className="c-header__title text--bold">Pyzlnar</span>
            <span className="c-header__subtitle">Systems engineer, Anime junkie, Dedicated gamer</span>
          </div>
          <NavbarContainer />
        </div>
      </div>
    );
  }
}
