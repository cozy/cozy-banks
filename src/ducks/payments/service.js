import logger from 'cozy-logger'
import { biApi } from './api'
import { makePayload } from './helpers'
import { TRANSACTION_DOCTYPE } from 'doctypes'
import get from 'lodash/get'
import decode from 'jwt-decode'
import { Q } from 'cozy-client'

const log = logger.namespace('payment-service')

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
      state: paymentCreation.state,
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

export const createPaymentCreation = async ({ client, payment, biPayment }) => {
  const { url, token, clientRedirectUri } = biPayment
  const payload = makePayload(payment, clientRedirectUri)

  let paymentCreation
  try {
    paymentCreation = await biApi('POST', `${url}/payments`, {
      token,
      payload
    })
  } catch (e) {
    throw e
  }
  if (paymentCreation) {
    await savePaymentCreation(client, paymentCreation)
    return paymentCreation
  }
  return null
}

export const getUrlWebView = async (paymentId, biPayment, token) => {
  const clientId = biPayment && biPayment.clientId
  const baseUrl = biPayment && biPayment.url
  const url = `${baseUrl}/auth/webview/payment?payment_id=${paymentId}&client_id=${clientId}&code=${token}`
  return url
}

export const updateStatePayment = async (client, data, state) => {
  try {
    await client.save({
      ...data,
      state
    })
  } catch (e) {
    log('error', "Can't update transaction with payment object")
    log('error', e)
  }
}

export const updatePaymentStatus = async ({ client, paymentId, token }) => {
  const decoded = decode(token)
  const url = `https://${decoded.domain}`
  const paymentStatus = await biApi('GET', `${url}/payments/${paymentId}`, {
    token
  })
  const paymentResponse = await client.query(
    Q('io.cozy.bank.settings').where({
      transferId: parseInt(paymentId)
    })
  )
  const data = get(paymentResponse, 'data[0]')
  if (data) {
    await updateStatePayment(client, data, paymentStatus.state)
  }
}
