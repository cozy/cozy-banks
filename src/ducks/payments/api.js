import { getBiPayment } from './storage'

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

export const getPayment = () => {
  const biPayment = getBiPayment()
  return biPayment
}

const headers = () => {
  const h = new Headers()
  h.append('Accept', 'application/json')
  h.append('Content-Type', 'application/json')

  const biPayment = getBiPayment()
  const token = biPayment && biPayment.token
  if (token) {
    h.append('Authorization', `Bearer ${token}`)
  }
  return h
}

export const biApi = (method, url, payload) => {
  const config = { method, headers: headers() }
  if (payload) {
    config.body = JSON.stringify(payload)
  }
  return fetch(new Request(url, config)).then(handleErrors)
}

export const getAccessTokenPayload = () => {
  const biPayment = getBiPayment()
  if (!biPayment) return {}
  return {
    client_id: biPayment.clientId,
    client_secret: '***********',
    grant_type: 'client_credentials',
    scope: 'payments'
  }
}

export const getTokenFromFile = async () => {
  const baseUrl = getBiPayment().url
  const response = await biApi(
    'POST',
    `${baseUrl}/auth/token`,
    getAccessTokenPayload()
  )

  const resp = {
    ...response,
    url: baseUrl,
    clientRedirectUri: getBiPayment().client.clientRedirectUri,
    clientId: getBiPayment().client.id
  }
  return resp
}
