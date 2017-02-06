import React from 'react';
import { Header } from './Header'

export class App extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <div className="content">
          <div className="c-body">
            { this.props.children }
          </div>
        </div>
      </div>
    );
  }
}
