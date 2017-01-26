import React from 'react';

export class Header extends React.Component {
  render(){
    return (
      <div className="c-header o-media">
        <img src={'/static/img/logo.png'} className="c-header__logo o-media__img" />
        <div className ="c-header__body o-media__body text--center">
          <span className="c-header__title text--bold">Pyzlnar</span>
          <span className="c-header__subtitle">Systems engineer, Anime junkie, Dedicated gamer</span>
        </div>
      </div>
    );
  }
}
