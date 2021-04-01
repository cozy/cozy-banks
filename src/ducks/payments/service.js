import logger from 'cozy-logger'
import { biApi, getPayment } from './api'
import { makePayload } from './helpers'
import { waitForRealtimeEvent } from 'cozy-harvest-lib/dist/services/jobUtils'
import { TRANSACTION_DOCTYPE } from 'doctypes'
import get from 'lodash/get'

const log = logger.namespace('payment-service')

export const createBiPayment = async client => {
  const jobResponse = await client.stackClient.jobs.create('konnector', {
    mode: 'getPaymentToken',
    konnector: 'caissedepargne1'
  })
  const event = await waitForRealtimeEvent(
    client,
    jobResponse.data.attributes,
    'result',
    30 * 1000
  )
  return event.data.result
}

const savePaymentCreation = async (client, paymentCreation) => {
  const label = get(paymentCreation, 'instructions[0].label')
  const beneficiaryAccount = get(
    paymentCreation,
    'instructions[0].beneficiary.identification'
  )
  const beneficiaryLabel = get(
    paymentCreation,
    'instructions[0].beneficiary.label'
  )
  const executionDate = get(paymentCreation, 'register_date')
  const executionDateType = get(
    paymentCreation,
    'instructions[0].execution_date_type'
  )
  const currency = get(paymentCreation, 'instructions[0].currency.id')
  try {
    await client.save({
      _type: TRANSACTION_DOCTYPE,
      date: executionDate,
      dateType: executionDateType,
      transferId: paymentCreation.id,
      status: paymentCreation.status,
      label,
      beneficiaryLabel,
      beneficiaryAccount,
      currency
    })
  } catch (e) {
    log('error', "Can't save transaction with payment object")
    log('error', e)
  }
}

export const createPaymentCreation = async (client, payment) => {
  const payload = makePayload(payment)
  const biPayment = getPayment()
  const baseUrl = biPayment && biPayment.url
  const paymentCreation = await biApi('POST', `${baseUrl}/payments`, payload)
  await savePaymentCreation(client, paymentCreation)

  return paymentCreation
}

export const getUrlWebView = async paymentId => {
  const biPayment = getPayment()
  const clientId = biPayment && biPayment.clientId
  const token = biPayment && biPayment.token
  const baseUrl = biPayment && biPayment.url
  const url = `${baseUrl}/auth/webview/payment?payment_id=${paymentId}&client_id=${clientId}&code=${token}`
  return url
}
