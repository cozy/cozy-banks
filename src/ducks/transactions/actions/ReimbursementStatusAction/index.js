import React from 'react'
import flag from 'cozy-flags'
import { translate } from 'cozy-ui/react'
import Icon from 'cozy-ui/react/Icon'
import Chip from 'cozy-ui/react/Chip'
import Alerter from 'cozy-ui/react/Alerter'
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
import { logException } from 'lib/sentry'

class ReimbursementStatusAction extends React.PureComponent {
  state = {
    showModal: false
  }

  showModal = () => this.setState({ showModal: true })
  hideModal = () => this.setState({ showModal: false })

  handleChange = async e => {
    const { transaction, saveDocument, t } = this.props
    transaction.reimbursementStatus = e.target.value

    this.hideModal()

    try {
      await saveDocument(transaction)
    } catch (err) {
      logException(err)
      Alerter.error(t('Transactions.reimbursementStatusUpdateError'))
    }
  }

  renderModalItem() {
    const { t, transaction } = this.props

    const status = getReimbursementStatus(transaction)
    const isLate = isReimbursementLate(transaction)
    const translateKey = isLate ? 'late' : status
    const label = t(`Transactions.actions.reimbursementStatus.${translateKey}`)

    return (
      <TransactionModalRow
        iconLeft={<Icon icon={iconReimbursement} />}
        onClick={this.showModal}
      >
        {label}
      </TransactionModalRow>
    )
  }

  renderTransactionRow() {
    const { transaction, t } = this.props

    const status = getReimbursementStatus(transaction)
    const isLate = isReimbursementLate(transaction)

    if (status !== 'pending') {
      return null
    }

    const translateKey = isLate ? 'late' : status

    return (
      <Chip
        size="small"
        variant="outlined"
        theme={isLate ? 'error' : 'normal'}
        onClick={this.showModal}
      >
        {t(`Transactions.actions.reimbursementStatus.${translateKey}`)}
        <Chip.Separator />
        <Icon icon="hourglass" size={12} />
      </Chip>
    )
  }

  render() {
    const { isModalItem, transaction } = this.props

    return (
      <>
        {isModalItem ? this.renderModalItem() : this.renderTransactionRow()}
        {this.state.showModal && (
          <ReimbursementStatusModal
            into="body"
            dismissAction={this.hideModal}
            mobileFullscreen
            transaction={transaction}
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
    withMutations()
  )(ReimbursementStatusAction)
}

export default action
