import { getBiPayment } from './storage'

export const makePayload = payment => {
  const biPayment = getBiPayment()
  const clientRedirectUri = biPayment && biPayment.clientRedirectUri
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
