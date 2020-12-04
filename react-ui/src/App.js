import React, { Component } from 'react';
import './App.css';
import "primeflex/primeflex.css";
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

import Header from './Header.js';
import SearchTab from './SearchTab/SearchTab';

import { Router, Route } from "react-router-dom";
import { createBrowserHistory } from "history";
import OldSearchesList from './SearchHistoryTab/OldSearchesList';
const history = createBrowserHistory();

class App extends Component {
  render() {
    return (
    <div className="App">       
      <Router history={history}>     
        <Header />    
        <Route exact path="/" component={SearchTab} />
        <Route path="/history" component={OldSearchesList} />
      </Router>
    </div> 
    )
  }
}

export default App;
