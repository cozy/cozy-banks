/* global cozy */
import React from 'react'
import { get } from 'lodash'
import { translate } from 'cozy-ui/react'
import icon from 'assets/icons/actions/icon-link-out.svg'
import ActionLink from './ActionLink'
import FileOpener from '../FileOpener'

const name = 'bill'
const billCache = {}

export const getBillInvoice = bill => {
  if (!bill.invoice) {
    throw new Error('This bill has no invoice : ', bill)
  }

  const [doctype, id] = bill.invoice.split(':')

  if (!doctype || !id) {
    throw new Error('Invoice is malformed. invoice: ' + bill.invoice)
  }

  return [doctype, id]
}

const getBill = async (transaction) => {
  const billRef = get(transaction, 'bills[0]')
  console.log('kosssi0', transaction)
  if (billRef) {
    console.log('kosssi1')
    const [billDoctype, billId] = billRef.split(':')
    if (!billCache[billId]) {
      const doc = await cozy.client.data.find(billDoctype, billId)
      billCache[billId] = doc
    }
    console.log('kosssi')
    return billCache[billId]
  }
}

const Component = ({t, transaction, actionProps: { urls }}) => {
  const billRef = get(transaction, 'bills[0]')
  const [, billId] = billRef.split(':')
  const bill = billCache[billId]
  return (
    <FileOpener getFileId={() => getBillInvoice(bill)}>
      <ActionLink
        text={t('Transactions.actions.bill')}
      />
    </FileOpener>
  )
}

const action = {
  name,
  icon,
  match: async (transaction, {urls}) => {
    return getBill(transaction)
  },
  Component: translate()(Component)
}

export default action
