export const userService = {
  login,
  register
}

function login(email, password) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  }

  return fetch('http://localhost:5000/user/authenticate', requestOptions)
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

function register(user) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify(user)
  }

  return fetch('http://localhost:5000/user', requestOptions).then(handleResponse)
}

function handleResponse(response) {
  if (!response.ok) { 
      return Promise.reject(response.statusText);
  }

  return response.json();
}