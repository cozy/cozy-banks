/* global cozy */

import { get } from 'lodash'
import { updateDocument } from 'cozy-client'

export const getLabel = transaction => transaction.label.toLowerCase().replace(/(?:^|\s)\S/g, a => a.toUpperCase())
export const getBill = transaction => get(transaction, 'bills[0]')
export const getInvoice = async transaction => {
  const billRef = getBill(transaction)
  const [billDoctype, billId] = billRef.split(':')
  const doc = await cozy.client.data.find(billDoctype, billId)
  const [doctype, id] = doc.invoice.split(':')
  if (!doctype || !id) {
    throw new Error('Invoice is malformed. invoice: ' + doc.invoice)
  }
  return [doctype, id]
}

export const updateCategory = (props, category) => {
  let { transaction } = props
  transaction.categoryId = category.id
  props.dispatch(updateDocument(transaction))
}
