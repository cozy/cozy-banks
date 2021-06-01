import { GROUP_DOCTYPE, transactionsConn } from 'doctypes'

/**
 * Outputs a connection to fetch transactions
 * based on the current filtering doc
 *
 * @param  {FilterTransactionsConnOptions} options - Options
 * @return {Connection}
 */
export const makeFilteredTransactionsConn = options => {
  const { filteringDoc, groups, accounts } = options
  let enabled = true
  if (!groups.lastUpdate || !accounts.lastUpdate) {
    enabled = false
  }

  let indexFields
  let whereClause
  let sortByClause = []

  if (enabled) {
    if (filteringDoc) {
      if (filteringDoc._type === GROUP_DOCTYPE) {
        // The query issued does not use the index "by_account_and_date"
        // because of the $or. It is therefore much slower than queries
        // with only the account. We haven't found a satisfactory solution
        // yet.
        let accounts
        if (filteringDoc.virtual) {
          accounts = filteringDoc.accounts.raw || []
        } else {
          const group = groups.data.find(g => g._id === filteringDoc._id)
          accounts = group ? group.accounts.raw : []
        }
        indexFields = ['account', 'date']
        whereClause = {
          $or: accounts.map(a => ({ account: a }))
        }
        sortByClause = [{ account: 'desc' }, { date: 'desc' }]
      } else {
        indexFields = ['account', 'date']
        whereClause = { account: filteringDoc._id }
        sortByClause = [{ account: 'desc' }, { date: 'desc' }]
      }
    } else {
      indexFields = ['date', '_id']
      whereClause = {
        _id: {
          $gt: null
        }
      }
      sortByClause = [{ date: 'desc' }]
    }
  }

  return {
    query: () =>
      transactionsConn
        .query()
        .where(whereClause)
        .indexFields(indexFields)
        .sortBy(sortByClause)
        .limitBy(100),
    fetchPolicy: transactionsConn.fetchPolicy,
    as: `transactions-${filteringDoc ? filteringDoc._id : 'all'}`,
    enabled: enabled
  }
}
