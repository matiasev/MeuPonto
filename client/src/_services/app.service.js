

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
        var h1 = new Date(i.start).getTime()
        var h2 = new Date(i.startLunch).getTime()
        var h3 = new Date(i.endLunch).getTime()
        var h4 = new Date(i.end).getTime()

        var time = (h2 - h1) + (h4 - h3)
        var hours = Math.floor(time / (1000 * 60 * 60))
        var minutes = Math.floor((time / (1000 * 60 * 60) - hours) * 60)
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
    return Promise.reject(response.statusText)
  }

  return response.json()
}