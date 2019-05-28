import React from 'react'
import flag from 'cozy-flags'
import { hasBills, hasReimbursements } from 'ducks/transactions/helpers'
import BillChip from 'ducks/transactions/actions/AttachedDocsAction/BillChip'
import { TransactionModalRow } from 'ducks/transactions/TransactionModal'
import iconAttachment from 'assets/icons/icon-attachment.svg'

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

    return bills.map(bill => <BillChip bill={bill} key={bill._id} />)
  }

  renderTransactionRowReimbursements() {
    const { transaction } = this.props

    const reimbursements = transaction.reimbursements.data.filter(
      reimbursement => reimbursement && reimbursement.bill
    )

    return reimbursements.map(reimbursement => (
      <BillChip bill={reimbursement.bill} key={reimbursement.bill._id} />
    ))
  }

  renderModalItem() {
    const { transaction } = this.props

    return (
      <TransactionModalRow iconLeft={iconAttachment} align="top">
        {hasBills(transaction) && this.renderModalItemBills()}
        {hasReimbursements(transaction) && this.renderModalItemReimbursements()}
      </TransactionModalRow>
    )
  }

  renderModalItemBills() {
    const { transaction } = this.props
    const bills = transaction.bills.data.filter(Boolean)

    return bills.map(bill => (
      <TransactionModalRow key={bill._id}>
        <BillChip bill={bill} />
      </TransactionModalRow>
    ))
  }

  renderModalItemReimbursements() {
    const { transaction } = this.props

    const reimbursements = transaction.reimbursements.data.filter(
      reimbursement => reimbursement && reimbursement.bill
    )

    return reimbursements.map(reimbursement => (
      <TransactionModalRow key={reimbursement.bill._id}>
        <BillChip bill={reimbursement.bill} />
      </TransactionModalRow>
    ))
  }

  render() {
    const { isModalItem } = this.props

    if (isModalItem) {
      return this.renderModalItem()
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
