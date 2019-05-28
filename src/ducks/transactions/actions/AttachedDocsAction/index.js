import React from 'react'
import flag from 'cozy-flags'
import { hasBills, hasReimbursements } from 'ducks/transactions/helpers'

class AttachedDocsAction extends React.PureComponent {
  render() {
    return <div>AttachedDocsAction</div>
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
