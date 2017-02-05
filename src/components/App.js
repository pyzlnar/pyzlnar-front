import React from 'react';
import { Header } from './Header'

export class App extends React.Component {
  render() {
    return (
      <div>
        <Header />
        { this.renderWIP() }
      </div>
    );
  }

  renderWIP() {
    return (
      <div className="content">
        <div className="c-body">
          <h3>Hey Listen!</h3>
          <span>I know you're excited but this is still a WIP. Come back later to see how this has advanced!</span>
          <br />
          <span>Code will be made public on github once this goes live, so do not panic in case you're curious.</span>
        </div>
      </div>
    );
  }
}
