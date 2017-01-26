import React from 'react';

export class Navbar extends React.Component {
  render() {
    return(
      <ul className="o-list-inline c-navbar">
        <div className="c-navbar__container">
          <li className="o-list-inline__item c-navbar__btn">Home</li>
          <li className="o-list-inline__item c-navbar__btn">About</li>
        </div>
      </ul>
    );
  }
}
