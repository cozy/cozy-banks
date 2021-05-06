import decode from 'jwt-decode'

export const makePayload = (payment, clientRedirectUri) => {
  const payload = {
    client_redirect_uri: clientRedirectUri,
    beneficiary: {
      scheme_name: 'iban',
      identification: payment.identification,
      label: payment.beneficiaryLabel
    },
    instructions: [
      {
        amount: parseInt(payment.amount),
        currency: 'EUR',
        label: payment.label,
        execution_date_type: 'first_open_day'
      }
    ]
  }

  return payload
}

const getClientRedirectUri = token => {
  const { hostname, protocol, port: p } = window.location
  const port = p.length === 0 ? '' : `:${p}`
  const uri = `${protocol}//${hostname}${port}/#/payments?token=${token}`
  return uri
}

export const createBiPayment = token => {
  const decoded = decode(token)

  const clientRedirectUri = getClientRedirectUri(token)
  return {
    token,
    clientId: decoded.iss,
    clientRedirectUri,
    url: `https://${decoded.domain}/2.0`
  }
}

export const iconsState = {
  rejected: '❌',
  pending: '🕓'
}

export const getSearchParams = location => {
  const urlSearchParams = new URLSearchParams(
    window.location.search + location.search.replace('?', '&')
  )
  const state = urlSearchParams.get('state')
  const paymentState = urlSearchParams.get('payment_state')
  const errorCode = urlSearchParams.get('error_code')
  const paymentId = urlSearchParams.get('id_payment')
  const token = urlSearchParams.get('token')
  return { state, paymentState, errorCode, paymentId, token }
}
