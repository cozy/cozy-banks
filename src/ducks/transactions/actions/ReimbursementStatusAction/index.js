import React from 'react'
import flag from 'cozy-flags'
import { translate, withBreakpoints } from 'cozy-ui/react'
import Icon from 'cozy-ui/react/Icon'
import { flowRight as compose } from 'lodash'
import { withMutations } from 'cozy-client'
import { isExpense, getReimbursementStatus } from 'ducks/transactions/helpers'
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
    this.forceUpdate()
    this.hideModal()
  }

  render() {
    const { t, transaction, isModalItem } = this.props

    if (!isModalItem) {
      return null
    }

    const status = getReimbursementStatus(transaction)
    const label = t(`Transactions.actions.reimbursementStatus.${status}`)

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
