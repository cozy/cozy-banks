import React from 'react'
// import { some } from 'lodash'
import { translate } from 'cozy-ui/react'
import icon from 'assets/icons/actions/icon-file.svg'
import { BillComponent } from './BillAction'

const name = 'healthExpenseBill'

export const Component = ({ t, transaction, actionProps, compact }) => {
  return (
    <span>
      {transaction.reimbursements.map((reimbursement, index) => {
        if (!reimbursement.bill) {
          return
        }
        return (
          <BillComponent
            key={index}
            t={t}
            actionProps={{
              ...actionProps,
              bill: reimbursement.bill,
              text: t(`Transactions.actions.${name}`).replace(
                '%{vendor}',
                reimbursement.bill.vendor
              )
            }}
            compact={compact}
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
  // match: transaction =>
  //   some(transaction.reimbursements, reimbursement => reimbursement.bill),
  match: () => false, // We temporary need to hide these actions
  Component: translate()(Component)
}

export default action
