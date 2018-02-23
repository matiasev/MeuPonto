import React, { Component } from 'react'
import { Link } from "react-router-dom"
import { userService } from "../_services/user.service"

export default class Register extends Component {
  constructor(props) {
    super(props)

    this.state = {
      user: {
        name: '',
        email: '',
        password: '',
      },
      error: null,
      result: null,
      isLoaded: false
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e) {
    const { name, value } = e.target
    const { user } = this.state
    this.setState({
      user: {
        ...user,
        [name]: value
      }
    })
  }


  handleSubmit(e) {
    e.preventDefault()

    this.setState({ isLoaded: true })

    const { user } = this.state
    if (user.name && user.email && user.password) {
      userService.register(user)
        .then(
          result => {
            if (!result.data) {
              this.setState({ isLoaded: false, result })
              window.location.href = "/login"
            }
          },
          error => {
            this.setState({ isLoaded: false, error });
          }
        )
    }
  }

  render() {
    const { user, error, result, isLoaded } = this.state
    if (error) {
      return <div>Error: {error}</div>;
    } else {
      return (
        <div>
          <div className="jumbotron jumbotron-fluid">
            <div className="container">
              <h1 className="display-4">Register</h1>
            </div>
          </div>
          <div className="container">
            <form name="form" onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label>Name</label>
                <input type="text" className="form-control" name="name" value={user.name} onChange={this.handleChange} />
              </div>
              <div className="form-group">
                <label>Email address</label>
                <input type="email" className="form-control" name="email" value={user.email} onChange={this.handleChange} />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input type="password" className="form-control" name="password" value={user.password} onChange={this.handleChange} />
              </div>

              {result &&
                <div className="alert alert-primary" role="alert">{result.message}</div>
              }

              <button className="btn btn-primary">Register</button>
              {isLoaded &&
                <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />

              }

            </form>
          </div>
        </div>
      )
    }
  }
}