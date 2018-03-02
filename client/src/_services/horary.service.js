
export const get = () => {
  const user = JSON.parse(localStorage.getItem('x-access-token'))
  const requestOptions = {
    method: 'GET',
    headers: { 'x-access-token': user.token }
  }
  return fetch('/horary', requestOptions).then(res => res.json())
}

export const post = (horary) => {
  const user = JSON.parse(localStorage.getItem('x-access-token'))
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': user.token
    },
    body: JSON.stringify(horary)
  }
  return fetch('/horary', requestOptions).then(handleResponse)
}

export const put = (id, horary) => {
  const user = JSON.parse(localStorage.getItem('x-access-token'))
  const requestOptions = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': user.token
    },
    body: JSON.stringify(horary)
  }
  return fetch('/horary/'+ id, requestOptions).then(res => res.json())
}

const handleResponse = (response) => {
  if (!response.ok) { 
      return Promise.reject(response.statusText);
  }

  return response.json();
}