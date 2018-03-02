import React                  from 'react'
import ReactDOM               from 'react-dom'
import { Router, Route }      from "react-router-dom"
import { history }            from './_helpers/history'
import { PrivateRoute }       from './_components/PrivateRoute'
import Horary                 from './components/horary'
import Login                  from './components/admin/Login'
import Register               from './components/admin/Register'
import registerServiceWorker  from './registerServiceWorker'
import './index.css'

ReactDOM.render(
  <Router history={history}>
    <div>
      <PrivateRoute exact path='/' component={Horary} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
    </div>
  </Router>
  , document.getElementById('root'));
registerServiceWorker();
