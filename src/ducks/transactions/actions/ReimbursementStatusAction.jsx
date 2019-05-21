import React from 'react'
import flag from 'cozy-flags'
import { translate, withBreakpoints } from 'cozy-ui/react'
import Icon from 'cozy-ui/react/Icon'
import { flowRight as compose } from 'lodash'
import { isExpense } from 'ducks/transactions/helpers'
import { TransactionModalRow } from 'ducks/transactions/TransactionModal'

const ReimbursementStatusAction = props => {
  const { t, transaction, isModalItem } = props

  if (!isModalItem) {
    return null
  }

  const translateKey = transaction.reimbursementStatus || 'no-reimbursement'
  const label = t(`Transactions.actions.reimbursementStatus.${translateKey}`)

  return (
    <TransactionModalRow iconLeft={<Icon icon="restore" />}>
      {label}
    </TransactionModalRow>
  )
}

const action = {
  name: 'ReimbursementStatus',
  match: transaction => {
    return isExpense(transaction) && flag('reimbursement-tag')
  },
  Component: compose(
    translate(),
    withBreakpoints()
  )(ReimbursementStatusAction)
}

export default action
