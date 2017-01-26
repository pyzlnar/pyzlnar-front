import React from 'react';
import { Header } from './Header'
import { Navbar } from './Navbar'

export class App extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <Navbar />
      </div>
    );
  }
}
