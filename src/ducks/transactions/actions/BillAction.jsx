/* global cozy */
import React from 'react'
import { get, some } from 'lodash'
import { translate } from 'cozy-ui/react'
import icon from 'assets/icons/actions/icon-file.svg'
import ActionLink from './ActionLink'
import FileOpener from '../FileOpener'

const name = 'bill'
const billCache = {}

const getBillInvoice = bill => {
  if (!bill.invoice) {
    throw new Error('This bill has no invoice : ', bill)
  }

  const [doctype, id] = bill.invoice.split(':')

  if (!doctype || !id) {
    throw new Error('Invoice is malformed. invoice: ' + bill.invoice)
  }

  return [doctype, id]
}

const getBill = async transaction => {
  const billRef = get(transaction, 'bills[0]')

  if (!billRef) {
    return
  }

  const [billDoctype, billId] = billRef.split(':')
  if (!billCache[billId]) {
    try {
      const doc = await cozy.client.data.find(billDoctype, billId)
      billCache[billId] = doc
    } catch (e) {
      return
    }
  }

  return billCache[billId]
}

export const Component = ({
  t,
  transaction,
  actionProps: { urls, bill, text }
}) => {
  if (!bill) {
    const billRef = get(transaction, 'bills[0]')
    if (!billRef) {
      // eslint-disable-next-line no-console
      console.warn(`Why!`, transaction, urls, bill, text)
      return
    }
    const [, billId] = billRef.split(':')
    bill = billCache[billId]
  }
  return (
    <FileOpener getFileId={() => getBillInvoice(bill)}>
      <ActionLink text={text || t('Transactions.actions.bill')} />
    </FileOpener>
  )
}

const action = {
  name,
  icon,
  match: async transaction => {
    const bill = await getBill(transaction)
    if (bill && bill._id) {
      return !some(transaction.reimbursements, reimbursement => {
        try {
          if (reimbursement.billId) {
            const [, billId] = reimbursement.billId.split(':')
            return billId === bill._id
          }
          // eslint-disable-next-line no-empty
        } catch (e) {}
        return false
      })
    }
    return false
  },
  Component: translate()(Component)
}

export default action
