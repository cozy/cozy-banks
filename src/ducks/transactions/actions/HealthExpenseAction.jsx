import React from 'react'
import { some } from 'lodash'
import { translate } from 'cozy-ui/react'
import icon from 'assets/icons/actions/icon-file.svg'
import { Component as BillComponent } from './BillAction'

const name = 'healthExpenseBill'

const Component = ({ t, transaction, actionProps }) => {
  return (
    <span>
      {transaction.reimbursements.map(reimbursement => {
        if (!reimbursement.bill) {
          return
        }
        return (
          <BillComponent
            t={t}
            actionProps={{
              ...actionProps,
              bill: reimbursement.bill,
              text: t(`Transactions.actions.${name}`).replace(
                '%{vendor}',
                reimbursement.bill.vendor
              )
            }}
          />
        )
      })}
    </span>
  )
}

const action = {
  name,
  icon,
  defaultAction: false,
  match: transaction =>
    some(transaction.reimbursements, reimbursement => reimbursement.bill),
  Component: translate()(Component)
}

export default action
