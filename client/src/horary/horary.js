import React, { Component } from 'react';
import './horary.css';

class Horary extends Component {
  constructor() {
    super()
    this.state = {
      horary: []
    }
  }

  componentDidMount() {
    const requestOptions = {
      method: 'GET',
      headers: {
        'x-access-token': localStorage.getItem('x-access-token')
      }
    };

    return fetch('/horary', requestOptions)
      .then(res => res.json())
      .then(horary => this.setState(horary, () => console.log('Horary', horary)))
  }

  render() {
    return (
      <div>
        <h1>Hello Horary</h1>
      </div>
    )
  }
}

export default Horary;