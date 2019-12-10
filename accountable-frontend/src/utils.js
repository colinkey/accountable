export function apiRequest(method, path, data, requiresAuth = true) {
  const base = 'http://localhost:3000'

  const reqHeaders = new Headers()

  reqHeaders.set('Content-Type', 'application/json')

  if (requiresAuth) {
    const tokens = JSON.parse(sessionStorage.getItem('accountable'))
    Object.keys(tokens).forEach(token => reqHeaders.set(token, tokens[token]))
  }

  const options = {
    method,
    headers: reqHeaders
  }

  if (method === "POST" || method === "PATCH") {
    options.body = JSON.stringify(data)
  }

  return fetch(`${base}${path}`, options).then(resp => {
    /* eslint-disable no-console */

    const tokens = {
      'access-token': resp.headers.get('access-token'),
      client: resp.headers.get('client'),
      uid: resp.headers.get('uid')
    }

    if (tokens['access-token']) {
      sessionStorage.setItem('accountable', JSON.stringify(tokens))
    }

    return resp.json()
  }).catch(error => console.log(error))
}

export function checkForUser() {
  return sessionStorage.getItem('accountable')
}