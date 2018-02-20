import { authHeader } from '../_helpers'

export const userService = {
  login
}

login = (userName, password) => {
  const requestOptions = {
    method: POST,
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': localStorage.getItem('x-access-token')
    },
    body: JSON.stringify(userName, password)
  }

  return fetch('/user/authenticate', requestOptions)
    .then(response => {
      if (!response.ok) {
        return Promise.reject(response.statusText)
      }

      return response.json()
    })
    .then(user => {
      if (user && user.token) {
        localStorage.setItem('x-access-token', JSON.stringify(user))
      }

      return user
    })
}