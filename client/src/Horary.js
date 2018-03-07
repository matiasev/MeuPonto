import React, { Component } from 'react'
import moment from 'moment'
import { Menu } from './components/Menu'
import { get, post, put } from "./_services/app.service"
require('moment/locale/pt')

export default class Horary extends Component {
  constructor(props) {
    super(props)

    this.state = {
      title: 'Horary',
      horary: [],
      error: null,
    }

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
  }

  render() {
    const { title, horary } = this.state
    return (
      <div>
        <Menu
          title={title}
        />
        <ul className="list-group list-group-flush">
          <li className="list-group-item d-flex justify-content-between">Entrada
            {horary.start &&
              <span>{moment(horary.start).format('LT')}</span>
            }
            {!horary.start &&
              <span>--:--</span>
            }
          </li>
          <li className="list-group-item d-flex justify-content-between">Inicio do intervalo
            {horary.startLunch &&
              <span >{moment(horary.startLunch).format('LT')}</span>
            }
            {!horary.startLunch &&
              <span>--:--</span>
            }
          </li>
          <li className="list-group-item d-flex justify-content-between">Saida do intervalo
            {horary.endLunch &&
              <span >{moment(horary.endLunch).format('LT')}</span>
            }
            {!horary.endLunch &&
              <span>--:--</span>
            }
          </li>
          <li className="list-group-item d-flex justify-content-between">Saida
            {horary.end &&
              <span >{moment(horary.end).format('LT')}</span>
            }
            {!horary.end &&
              <span>--:--</span>
            }
          </li>
        </ul>

        <Submit
          horary={horary}
          componentDidMount={this.componentDidMount}
        />



      </div>
    )
  }
}

export class Submit extends Component {
  constructor(props) {
    super(props)

    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleSubmit() {
    const { horary, componentDidMount } = this.props
    if (horary._id) {
      put(horary._id, horary)
        .then(
          result => {
            this.setState({ result })
            componentDidMount()
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
            componentDidMount()
          },
          error => {
            this.setState({ error })
          }
        )
    }
  }
  render() {
    const { horary, handleSubmit } = this.props
    return (
      <div className="btnSubmit">
        {!horary.start &&
          <button type="button" className="btn btn-success btn-lg btn-block" onClick={this.handleSubmit}>Entrada</button>
        }
        {!horary.startLunch && horary.start &&
          <button type="button" className="btn btn-danger btn-lg btn-block" onClick={this.handleSubmit}>Inicio do intervalo</button>
        }
        {!horary.endLunch && horary.startLunch &&
          <button type="button" className="btn btn-success btn-lg btn-block" onClick={this.handleSubmit}>Saida do intervalo</button>
        }
        {!horary.end && horary.startLunch && horary.endLunch &&
          <button type="button" className="btn btn-danger btn-lg btn-block" onClick={this.handleSubmit}>Saida</button>
        }
      </div>
    )
  }
}
