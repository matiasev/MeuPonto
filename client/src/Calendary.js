import React, { Component } from "react"
import { Menu } from './components/Menu'
import moment from 'moment'
import { getAll } from "./_services/horary.service"
require('moment/locale/pt')

export default class Calendary extends Component {
  constructor(props) {
    super(props)

    this.state = {
      title: 'Calendary',
      error: null,
      calendary: []
    }

    this.componentWillMount = this.componentWillMount.bind(this)
  }

  componentWillMount() {
    getAll()
      .then(
        calendary => {
          this.setState({ calendary })
        },
        error => {
          this.setState({ error })
        }
      )
  }
  render() {
    const { calendary, title } = this.state
    return (
      <div>
        <Menu
          title={title}
        />
      
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Day</th>
              <th scope="col">Horary</th>
            </tr>
          </thead>
          <tbody>
          {
              calendary.map(d => {
                return (
                  <tr key={d.id}>
                    <td>{moment(d.day).format('LL')}</td>
                    <td>{d.hours + ':' + d.minutes}</td>
                  </tr>
                );
              })
            }
          </tbody>
        </table>
      </div>
    )
  }
}