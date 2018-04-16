/* global cozy */
import React, { Component } from 'react'
import { get, some } from 'lodash'
import { translate, ButtonAction } from 'cozy-ui/react'
import icon from 'assets/icons/actions/icon-file.svg'
import ActionLink from './ActionLink'
import FileOpener from '../FileOpener'
import AugmentedModal from 'components/AugmentedModal'

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

const isVentePrivee = transaction =>
  transaction.label.indexOf('Vente Privée') > -1

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

class AugmentedModalButton extends React.Component {
  open() {
    this.setState({ opened: true })
  }

  close() {
    this.setState({ opened: false })
  }

  render() {
    const { bill, transaction } = this.props
    return (
      <ButtonAction
        onClick={() => this.open()}
        label="Voir facture"
        rightIcon="file"
      >
        {this.state.opened ? (
          <AugmentedModal
            bill={bill}
            transaction={transaction}
            onClose={() => this.close()}
          />
        ) : null}
      </ButtonAction>
    )
  }
}

export class BillComponent extends Component {
  render({
    t,
    transaction,
    isMenuItem = false,
    actionProps: { urls, bill, text }
  }) {
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

    text = text || t('Transactions.actions.bill')

    if (isVentePrivee(transaction)) {
      return <AugmentedModalButton transaction={transaction} bill={bill} />
    }

    return (
      <FileOpener getFileId={() => getBillInvoice(bill)}>
        {isMenuItem ? (
          <ActionLink text={text} />
        ) : (
          <ButtonAction label={text} rightIcon="file" />
        )}
      </FileOpener>
    )
  }
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
  Component: translate()(BillComponent)
}

export default action
