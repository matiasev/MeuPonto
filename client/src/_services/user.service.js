
export const login = (email, password) => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  }

  return fetch('/user/authenticate', requestOptions)
    .then(res => res.json())
    .then(
      result => {
        if (result.data) {
          localStorage.setItem('x-access-token', JSON.stringify(result))
          window.location.href = "/"
        }
        return result
      }
    )
}

export const register = (user) => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify(user)
  }

  return fetch('/user', requestOptions).then(handleResponse)
}

const handleResponse = (response) => {
  if (!response.ok) { 
      return Promise.reject(response.statusText)
  }

  return response.json()
}