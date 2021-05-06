import logger from 'cozy-logger'
import { biApi } from './api'
import { makePayload } from './helpers'
import { TRANSACTION_DOCTYPE } from 'doctypes'
import get from 'lodash/get'
import decode from 'jwt-decode'
import { Q } from 'cozy-client'

const log = logger.namespace('payment-service')

/**
 * Save payment object in transaction doctype
 *
 * @param client
 * @param paymentCreation
 */
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

/**
 * Save payment object at BI
 *
 * @param client
 * @param payment
 * @param biPayment
 * @returns {Promise<*|null>}
 */
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

/**
 * Get Url WebView to access the transfer
 *
 * @param paymentId
 * @param biPayment
 * @param token
 * @returns {Promise<string>}
 */
export const getUrlWebView = async (paymentId, biPayment, token) => {
  const clientId = biPayment && biPayment.clientId
  const baseUrl = biPayment && biPayment.url
  const url = `${baseUrl}/auth/webview/payment?payment_id=${paymentId}&client_id=${clientId}&code=${token}`
  return url
}

/**
 * Update payment object in
 * @param client
 * @param data
 * @param state
 *
 */
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

/**
 * Get payment status from BI and update transaction doctype
 *
 * @param client
 * @param paymentId
 * @param token
 */
export const updatePaymentStatus = async ({ client, paymentId, token }) => {
  const decoded = decode(token)
  const url = `https://${decoded.domain}`

  log('info', 'Checking payment tatus')
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
    log('info', 'Updating Payment Status')
    await updateStatePayment(client, data, paymentStatus.state)
  }
}
