import React, { Component } from 'react'
import './loginPage.css'
import { Link } from "react-router-dom"
import { userService } from "../_services/user.service"

export default class LoginPage extends Component {

  constructor(props) {
    super(props)

    this.state = {
      email: '',
      password: '',
      error: null,
      isLoaded: false,
      result: null
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e) {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }

  handleSubmit(e) {
    e.preventDefault()

    const { email, password } = this.state
    this.setState({ isLoaded: true })

    userService.login(email, password)
      .then(
        result => {
          if (!result.data) {
            this.setState({ isLoaded: false, result })
          }
        },
        error => {
          this.setState({ isLoaded: false, error });
        }
      )
  }

  render() {
    const { email, password, error, result, isLoaded } = this.state
    if (error) {
      return <div>Error: {error.message}</div>;
    } else {
      return (
        <div>
          <div className="jumbotron jumbotron-fluid">
            <div className="container">
              <h1 className="display-4">Login</h1>
            </div>
          </div>
          <div className="container">
            <form name="form" onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label>Email address</label>
                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="email" value={email} onChange={this.handleChange} />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input type="password" className="form-control" id="exampleInputPassword1" name="password" value={password} onChange={this.handleChange} />
              </div>

              {result &&
                <div class="alert alert-danger" role="alert">{result.message}</div>
              }

              <button className="btn btn-primary">Login</button>
              {isLoaded &&
                <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />

              }

              <Link to="/register">Register</Link>

            </form>
          </div>
        </div>
      )
    }
  }
}