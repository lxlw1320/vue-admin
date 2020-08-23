import Cookie from 'cookie_js'

const token = 'admin_token'
const userName = 'username'

export function getToken() {
  return Cookie.get(token)
}

export function setToken(data) {
  return Cookie.set(token, data)
}

export function removeToken(data) {
  return Cookie.remove(token)
}

export function getUserName() {
  return Cookie.get(userName)
}

export function setUserName(data) {
  return Cookie.set(userName, data)
}

export function removeUserName(data) {
  return Cookie.remove(userName)
}
