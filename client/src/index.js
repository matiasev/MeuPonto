import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, Switch } from "react-router-dom"
import { history } from './_helpers/history'
import { PrivateRoute } from './_components/PrivateRoute'
import Home from './Home'
import Horary from './Horary'
import Calendary from './Calendary'
import Login from './admin/Login'
import Register from './admin/Register'
import registerServiceWorker from './registerServiceWorker'
import './index.css'

ReactDOM.render(
  <Router history={history}>
    <div>
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />

      <Home>
        <PrivateRoute exact path='/' component={Horary} />
        <PrivateRoute path="/calendary" component={Calendary} />
      </Home>
      </Switch>
    </div>
  </Router>
  , document.getElementById('root'));
registerServiceWorker();
