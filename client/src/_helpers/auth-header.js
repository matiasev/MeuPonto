export function authHeader(){
  let user = JSON.parse(localStorage.setItem('x-access-token'))

  if (user && user.token) {
    return {'User': user.token }
  }else{
    return {}
  }
}