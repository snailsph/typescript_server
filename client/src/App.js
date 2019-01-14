import React, { Component } from 'react';
import logo from './logo.svg';
import './style/index.less';
import Login from './pages/login';
import Home from './pages/home';
import NotFound from './pages/404'

import { HashRouter as Router, Route, Switch } from "react-router-dom";
class App extends Component {
  render() {
    return (
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route component={NotFound} />
          </Switch>
        </Router>
    );
  }
}

export default App;
