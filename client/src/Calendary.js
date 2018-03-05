import React, { Component } from "react"
import { Menu } from './components'
import moment from 'moment'
import { getAll } from "./_services/horary.service"
require('moment/locale/pt')

export default class Calendary extends Component {
  constructor(props) {
    super(props)

    this.state = {
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
    return (
      <div>
        <Menu
          title={'Calendary'}
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
              this.state.calendary.map(d => {
                return (
                  <tr key={d._id}>
                    <td>{moment(d.day).format('LL')}</td>
                    <td>10:00</td>
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