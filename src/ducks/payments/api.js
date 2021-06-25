async function handleErrors(response) {
  if (!response.ok) {
    const error = await response.json()
    throw {
      status: `${response.status} - ${response.statusText}`,
      message: error
    }
  }
  const data = await response.json()
  return data
}

const headers = token => {
  const h = new Headers()
  h.append('Accept', 'application/json')
  h.append('Content-Type', 'application/json')

  if (token) {
    h.append('Authorization', `Bearer ${token}`)
  }
  return h
}

export const biApi = (method, url, { payload, token }) => {
  const config = { method, headers: headers(token) }
  if (payload) {
    config.body = JSON.stringify(payload)
  }
  return fetch(new Request(url, config)).then(handleErrors)
}

export const getAccessTokenPayload = biPayment => {
  if (!biPayment) return {}
  return {
    client_id: biPayment.clientId,
    client_secret: '***********',
    grant_type: 'client_credentials',
    scope: 'payments'
  }
}

export const getToken = stackClient => {
  const token = stackClient
    .fetchJSON('POST', '/remote/com.budgetinsight.maifsandbox.api', {})
    .then(resp => resp.token)
  return token
}
