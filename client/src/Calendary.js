import React, { Component } from "react"
import { Menu } from './components/Menu'
import { getAll } from "./_services/app.service"
import moment from 'moment'
require('moment/locale/pt')

export default class Calendary extends Component {
  constructor(props) {
    super(props)

    this.state = {
      title: 'Calendary',
      error: null,
      calendary: []
    }

    this.componentDidMount = this.componentDidMount.bind(this)
  }

  componentDidMount() {
    getAll()
      .then(
        response => {
          const calendary = response.map(i => {
            const h1 = new Date(i.start).getTime()
            const h2 = new Date(i.startLunch).getTime()
            const h3 = new Date(i.endLunch).getTime()
            const h4 = new Date(i.end).getTime()

            const time = (h2 - h1) + (h4 - h3)
            let hours = Math.floor(time / (1000 * 60 * 60))
            let minutes = Math.floor((time / (1000 * 60 * 60) - hours) * 60)
            if (minutes < 10) { minutes = '0' + minutes }
            if (hours < 10) { hours = '0' + hours }

            if (h4) {
              return {
                id: i._id,
                hours: hours,
                minutes: minutes,
                day: new Date(i.day).getTime()
              }
            }
          }).filter(e => e !== undefined)
            .sort((a, b) => {
              return a.day > b.day ? -1 : a.day < b.day ? 1 : 0;
            })

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