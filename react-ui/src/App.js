import React, { Component } from 'react';
import './App.css';
import "primeflex/primeflex.css";
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

import Header from './Header.js';
import Body from './Body.js';

class App extends Component {
  render() {
    return (
        <div className="App">
          <Header />
          <Body />
        </div>
    )
  }
}

export default App;
