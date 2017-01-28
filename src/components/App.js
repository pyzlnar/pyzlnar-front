import React from 'react';
import { Header } from './Header'
import { Navbar } from './Navbar'

export class App extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <Navbar />
        { this.renderWIP() }
      </div>
    );
  }

  renderWIP() {
    return (
      <div className="c-navbar">
        <h3>Hey Listen!</h3>
        <span>I know you're excited but this is still a WIP. Come back later to see how this has advanced!</span>
        <br />
        <span>Code will be made public on github once this goes live, so do not panic in case you're curious.</span>
      </div>
    );
  }
}
