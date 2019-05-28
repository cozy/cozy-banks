import React from 'react'
import flag from 'cozy-flags'
import { hasBills, hasReimbursements } from 'ducks/transactions/helpers'
import Bill from 'ducks/transactions/actions/AttachedDocsAction/Bill'

class AttachedDocsAction extends React.PureComponent {
  renderTransactionRow() {
    const { transaction } = this.props

    if (hasBills(transaction)) {
      return this.renderTransactionRowBills()
    } else if (hasReimbursements(transaction)) {
      return this.renderTransactionRowReimbursements()
    } else {
      return null
    }
  }

  renderTransactionRowBills() {
    const { transaction } = this.props
    const bills = transaction.bills.data.filter(Boolean)

    return bills.map(bill => <Bill bill={bill} key={bill._id} />)
  }

  renderTransactionRowReimbursements() {
    const { transaction } = this.props

    const reimbursements = transaction.reimbursements.data.filter(
      reimbursement => reimbursement && reimbursement.bill
    )

    return reimbursements.map(reimbursement => (
      <Bill bill={reimbursement.bill} key={reimbursement.bill._id} />
    ))
  }

  render() {
    const { isModalItem } = this.props

    if (isModalItem) {
      return null
    } else {
      return this.renderTransactionRow()
    }
  }
}

const action = {
  name: 'AttachedDocs',
  match: transaction => {
    return (
      flag('reimbursement-tag') &&
      (hasBills(transaction) || hasReimbursements(transaction))
    )
  },
  Component: AttachedDocsAction
}

export default action
