import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, Switch} from "react-router-dom"
import { history } from './_helpers/history'
import { PrivateRoute } from './components/PrivateRoute'
import App from './App'
import Horary from './Horary'
import Calendary from './Calendary'
import User from './User'
import Login from './admin/Login'
import Register from './admin/Register'
import './index.css'

ReactDOM.render(
  <Router history={history}>
    <div>
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />

      <App>
        <PrivateRoute exact path='/' component={Horary} />
        <PrivateRoute path="/calendary" component={Calendary} />
        <PrivateRoute path="/user" component={User} />
      </App>
      </Switch>
    </div>
  </Router>
  , document.getElementById('root'))