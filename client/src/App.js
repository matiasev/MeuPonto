import React, { Component } from "react"
import { Link } from "react-router-dom"
import moment from 'moment'
require('moment/locale/pt')

export default class App extends Component {

  render() {
    return (
      <div>
        <Header />
        <div>
          {this.props.children}
        </div>
        <div className="footer">
          <Footer />
        </div>
      </div>
    )
  }
}

export class Header extends Component {
  constructor(props) {
    super(props)

    this.state = {
      clock: moment().format('LT'),
      dateDay: moment().format('dddd') + ', ' + moment().format('ll')
    }
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000,
    )
  }
  
  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      clock: moment().format('LT'),
    });
  }
  render() {
    const { dateDay, clock } = this.state
    return (
      <div className="jumbotron jumbotron-home jumbotron-fluid bg-primary text-white">
        <div className="container">
          <p className="lead">{dateDay}</p>
          <h1 className="display-5">{clock}</h1>
        </div>
      </div>
    )
  }
}

export class Footer extends Component {
  render() {
    return (
      <div>
        <ul className="nav d-flex justify-content-between">
          <li className="nav-item">
            <Link className="nav-link active" to="/"><i className="material-icons">fingerprint</i></Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/calendary"><i className="material-icons">event_note</i></Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/sobre"><i className="material-icons">person</i></Link>
          </li>
        </ul>
      </div>
    )
  }
}