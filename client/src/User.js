import React, { Component } from "react"
import { Menu } from './components/Menu'

export default class User extends Component {
  constructor(props) {
    super(props)

    this.state = {
      title: 'User',
      user: {}
    }

    this.componentDidMount = this.componentDidMount.bind(this)
    this.handleUpdate = this.handleUpdate.bind(this)
  }

  componentDidMount() {
    const user = JSON.parse(localStorage.getItem('x-access-token')).data
    this.setState({ user })
  }

  handleUpdate() {
    localStorage.clear('x-access-token')
    window.location.reload();
  }
  render() {
    const { user, title, handleUpdate } = this.state
    return (
      <div>
        <Menu
          title={title}
        />

        <div className="card text-center">
          <div className="card-body">
            <h5 className="card-title">{user.name}</h5>
            <p className="card-text">{user.email}</p>
            <button type="button" className="btn btn-danger" onClick={this.handleUpdate}>Logout</button>
          </div>
        </div>
      </div>
    )
  }
}
