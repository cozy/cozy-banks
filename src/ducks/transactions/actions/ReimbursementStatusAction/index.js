import React from 'react'
import flag from 'cozy-flags'
import { translate, withBreakpoints } from 'cozy-ui/react'
import Icon from 'cozy-ui/react/Icon'
import ButtonAction from 'cozy-ui/react/ButtonAction'
import { flowRight as compose } from 'lodash'
import { withMutations } from 'cozy-client'
import {
  isExpense,
  getReimbursementStatus,
  isReimbursementLate
} from 'ducks/transactions/helpers'
import { TransactionModalRow } from 'ducks/transactions/TransactionModal'
import ReimbursementStatusModal from 'ducks/transactions/actions/ReimbursementStatusAction/ReimbursementStatusModal'
import iconReimbursement from 'assets/icons/icon-reimbursement.svg'

class ReimbursementStatusAction extends React.PureComponent {
  state = {
    showModal: false
  }

  showModal = () => this.setState({ showModal: true })
  hideModal = () => this.setState({ showModal: false })

  handleChange = async e => {
    const { transaction, saveDocument } = this.props
    transaction.reimbursementStatus = e.target.value

    await saveDocument(transaction)
    this.hideModal()
  }

  renderModalItem() {
    const { t, transaction } = this.props

    const status = getReimbursementStatus(transaction)
    const isLate = isReimbursementLate(transaction)
    const translateKey = isLate ? 'late' : status
    const label = t(`Transactions.actions.reimbursementStatus.${translateKey}`)

    return (
      <>
        <TransactionModalRow
          iconLeft={<Icon icon={iconReimbursement} />}
          onClick={this.showModal}
        >
          {label}
        </TransactionModalRow>
        {this.state.showModal && (
          <ReimbursementStatusModal
            into="body"
            dismissAction={this.hideModal}
            mobileFullscreen
            currentStatus={status}
            onChange={this.handleChange}
          />
        )}
      </>
    )
  }

  renderTransactionRow() {
    const {
      breakpoints: { isMobile },
      transaction,
      t
    } = this.props

    const status = getReimbursementStatus(transaction)
    const isLate = isReimbursementLate(transaction)

    if (status !== 'pending') {
      return null
    }

    const translateKey = isLate ? 'late' : status

    return (
      <ButtonAction
        label={t(`Transactions.actions.reimbursementStatus.${translateKey}`)}
        type="error"
        rightIcon={<Icon icon="hourglass" />}
        compact={isMobile}
      />
    )
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
  name: 'ReimbursementStatus',
  match: transaction => {
    return isExpense(transaction) && flag('reimbursement-tag')
  },
  Component: compose(
    translate(),
    withBreakpoints(),
    withMutations()
  )(ReimbursementStatusAction)
}

export default action
