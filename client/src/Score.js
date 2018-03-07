import React, { Component } from "react"
import { Menu } from './components/Menu'
import moment from 'moment'
import { getAll } from "./_services/app.service"
require('moment/locale/pt')

export default class Score extends Component {
  constructor(props) {
    super(props)

    this.state = {
      title: 'Score',
      error: null,
      score: []
    }

    this.componentWillMount = this.componentWillMount.bind(this)
  }

  componentWillMount() {
    getAll()
      .then(
        score => {
          this.setState({ score })
        },
        error => {
          this.setState({ error })
        }
      )
  }
  render() {
    const { score, title } = this.state
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
              score.map(d => {
                return (
                  <tr key={d.id}>
                    <td>{moment(d.day).format('MMMM YYYY')}</td>
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