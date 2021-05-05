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
