

export const get = () => {
  const user = JSON.parse(localStorage.getItem('x-access-token'))
  const requestOptions = {
    method: 'GET',
    headers: { 'x-access-token': user.token }
  }
  return fetch('/horary', requestOptions).then(res => res.json())
}

export const getAll = () => {
  const user = JSON.parse(localStorage.getItem('x-access-token'))
  const requestOptions = {
    method: 'GET',
    headers: { 'x-access-token': user.token }
  }
  return fetch('/horary/all', requestOptions)
    .then(res => res.json())
    .then(result => {
      var res = result.map(i => {
        
        var start = new Date(i.start).getTime()
        var startLunch = new Date(i.startLunch).getTime()
        var sum = startLunch - start

        // m: Math.abs(Math.round(df / (60 * 1000)) - (60 * 1000)), //minutos
        return {
          day: Math.round(sum / (60 * 60 * 1000))
        }
      })
      console.log(res)
      return res
    })

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
  return fetch('/horary/' + id, requestOptions).then(res => res.json())
}

const handleResponse = (response) => {
  if (!response.ok) {
    return Promise.reject(response.statusText);
  }

  return response.json();
}