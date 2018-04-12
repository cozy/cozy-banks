import React from 'react'
import { connect } from 'react-redux'
import compose from 'lodash/flowRight'
import { ACCOUNT_DOCTYPE, TRANSACTION_DOCTYPE, GROUP_DOCTYPE } from 'doctypes'
import {
  getFilteredTransactions,
  getFilteredAccountIds
} from 'ducks/filters'
import { hydrateTransaction } from 'documents/transaction'
import { Query } from 'cozy-client'

const mapStateToProps = (state, ownProps) => {
  const state2 = {
    filters: state.filters,
    accounts: ownProps.accounts,
    groups: ownProps.groups,
    transactions: ownProps.transactions
  }

  const filteredTransactions = getFilteredTransactions(state2)
    .map(transaction => hydrateTransaction(state2, transaction))

  return {
    filteredTransactions,
    accountIds: getFilteredAccountIds(state2)
  }
}

const accountsQ = client => client.all(ACCOUNT_DOCTYPE)
const groupsQ = client => client.all(GROUP_DOCTYPE)
const transactionsQ = client => {
  const qd = client.all(TRANSACTION_DOCTYPE)
  qd.limit = null
  return qd
}

const wrapper = Component => (props, context) => {
  const state = context.store.getState()
  return (
    <Query query={accountsQ} as='accounts'>{accounts => (
      <Query as='groups' query={groupsQ}>{groups => (
        <Query as='transactions' query={transactionsQ}>{transactions => (
          <Component {...props}
            transactions={transactions}
            filteredTransactions={getFilteredTransactions({
              accounts,
              groups,
              transactions,
              ...state
            })} />
        )}</Query>
      )}</Query>
    )}</Query>
  )
}

export default compose(
  connect(mapStateToProps),
  wrapper
)
