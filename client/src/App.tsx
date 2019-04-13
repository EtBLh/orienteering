import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import HomePage from './pages/HomePage'
import MapPage from './pages/MapPage'
import AboutPage from './pages/AboutPage'
import './App.global.css';

class App extends Component {
  render() {
    return (
      <Router>
        <Route path="/" exact component={HomePage}/>
        <Route path="/map" component={MapPage} />
        <Route path="/about" component={AboutPage} />
      </Router>
    );
  }
}

export default App;
