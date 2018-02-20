import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import HomePage from '../HomePage/HomePage';
import LoginPage from '../LoginPage/LoginPage';
import { PrivateRoute } from '../_components/PrivateRoute';

export default class App extends Component {
  render() {
    return (
      <div>
        <Router >
          <div>
            <PrivateRoute exact path='/' component={HomePage} />
            <Route path="/login" component={LoginPage} />
          </div>
        </Router>
      </div>
    );
  }
}