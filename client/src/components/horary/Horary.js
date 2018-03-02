import React, { Component } from 'react'
import moment from 'moment'
import { Header, HoraryList, HoraryBtn, Menu, Footer } from './'
import { get, post, put } from "./_services/horary.service"
require('moment/locale/pt')

export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      horary: [],
      error: null,
      result: null,
      clock: moment().format('LT'),
      dateDay: moment().format('dddd') + ', ' + moment().format('ll')
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.componentDidMount = this.componentDidMount.bind(this)
  }

  componentDidMount() {
    get()
      .then(
        horary => {
          this.setState({ horary })
        },
        error => {
          this.setState({ error })
        }
      )

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


  handleSubmit() {
    const { horary } = this.state
    if (horary._id) {
      put(horary._id, horary)
        .then(
          result => {
            this.setState({ result })
            this.componentDidMount()
          },
          error => {
            this.setState({ error })
          }
        )
    } else {
      post(horary)
        .then(
          horary => {
            this.setState({ horary })
            this.componentDidMount()
          },
          error => {
            this.setState({ error })
          }
        )
    }

  }
  render() {
    const { clock, dateDay, horary } = this.state
    return (
      <div>
        <Header
          clock={clock}
          dateDay={dateDay}
        />
        <Menu />
        <HoraryList
          module={moment}
          horary={horary}
        />
        <div className='footer'>
          <HoraryBtn
            handleSubmit={this.handleSubmit}
            horary={horary}
          />
          <Footer />
        </div>

      </div>
    );
  }
}