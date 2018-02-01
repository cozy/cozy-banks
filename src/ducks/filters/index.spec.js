import reducer, {
  filterByDoc,
  getFilteredTransactions,
  getAccountsFiltered,
  addFilterByDates,
  resetFilterByDoc
} from '.'
import { ACCOUNT_DOCTYPE, GROUP_DOCTYPE } from 'doctypes'
import { DESTROY_ACCOUNT } from 'actions/accounts'
import { getTransactions, getGroups, getAccounts } from 'selectors'

jest.mock('selectors/index.js')

describe('filter reducer', function () {
  let state
  beforeEach(function () {
    state = {
      filteringDoc: null
    }
  })

  it('should be able to select account/group', function () {
    state = reducer(state, filterByDoc({ id: 'a123', _type: ACCOUNT_DOCTYPE }))
    expect(state.filteringDoc._type).toBe(ACCOUNT_DOCTYPE)
    expect(state.filteringDoc.id).toBe('a123')
  })

  it('should be able to select by group', function () {
    state = reducer(state, filterByDoc({ id: 'g123', _type: GROUP_DOCTYPE }))
    expect(state.filteringDoc._type).toBe(GROUP_DOCTYPE)
    expect(state.filteringDoc.id).toBe('g123')
  })

  it('should reset when there is a delete account event corresponding to the current account', function () {
    const account = { id: 'a123', _type: ACCOUNT_DOCTYPE }
    state = reducer(state, filterByDoc(account))
    state = reducer(state, { type: DESTROY_ACCOUNT, account })
    expect(state.filteringDoc).toBe(null)
  })
})

const isoDate = function (stringDate) {
  return new Date(`${stringDate}T00:00:00Z`)
}

describe('filter selectors', () => {
  let state

  const dispatchOnFilters = action => {
    state = {...state, filters: reducer(state.filters, action) }
  }

  beforeEach(function () {
    state = {
      filters: {}
    }
    state.filters = reducer(
      state.filters,
      addFilterByDates(isoDate('2018-01-01'), isoDate('2018-01-31')),
    )

    getTransactions.mockReturnValue([
      { _id: 't0', account: 'a0', label: 'Transaction 0', date: isoDate('2018-01-02')},
      { _id: 't1', account: 'a1', label: 'Transaction 1', date: isoDate('2018-01-03')},
      { _id: 't2', account: 'a1', label: 'Transaction 2', date: isoDate('2018-01-04')},
      { _id: 't3', account: 'a2', label: 'Transaction 3', date: isoDate('2018-01-05')},
      { _id: 't4', account: 'a0', label: 'Transaction 4', date: isoDate('2018-01-06')},
      { _id: 't4', account: 'a6', label: 'Transaction 5', date: isoDate('2018-01-07')},
      { _id: 't4', account: 'a6', label: 'Transaction 6', date: isoDate('2018-01-08')},
    ])
    getAccounts.mockReturnValue([
      { _id: 'a0', _type: ACCOUNT_DOCTYPE, label: 'Account 0'},
      { _id: 'a1', _type: ACCOUNT_DOCTYPE, label: 'Account 1'},
      { _id: 'a2', _type: ACCOUNT_DOCTYPE, label: 'Account 2'},
    ])
    getGroups.mockReturnValue([
      { _id: 'g0', _type: GROUP_DOCTYPE, label: 'Group 0', accounts: ['a1', 'a0']},
      { _id: 'g1', _type: GROUP_DOCTYPE, label: 'Group 1', accounts: ['a2']}
    ])
  })

  const checkReset = () => {
    dispatchOnFilters(resetFilterByDoc())
    expect(getFilteredTransactions(state).map(x => x._id)).toEqual(['t0', 't1', 't2', 't3', 't4'])
  }

  describe('reset', function () {
    it('should get transactions that have an account', () => {
      expect(getFilteredTransactions(state).map(x => x._id)).toEqual(['t0', 't1', 't2', 't3', 't4'])
    })

    it('should work after a filter has been set', () => {
      dispatchOnFilters(filterByDoc({ _id: 'a0', _type: ACCOUNT_DOCTYPE }))
      checkReset()
    })
  })

  describe('setting filter', () => {
    it('should select transactions belonging to an account', () => {
      dispatchOnFilters(filterByDoc({ _id: 'a0', _type: ACCOUNT_DOCTYPE }))
      expect(getAccountsFiltered(state).map(x => x._id)).toEqual(['a0'])
      expect(getFilteredTransactions(state).map(x => x._id)).toEqual(['t0', 't4'])

      dispatchOnFilters(filterByDoc({ _id: 'a1', _type: ACCOUNT_DOCTYPE }))
      expect(getAccountsFiltered(state).map(x => x._id)).toEqual(['a1'])
      expect(getFilteredTransactions(state).map(x => x._id)).toEqual(['t1', 't2'])

      dispatchOnFilters(filterByDoc({ _id: 'a2', _type: ACCOUNT_DOCTYPE }))
      expect(getAccountsFiltered(state).map(x => x._id)).toEqual(['a2'])
      expect(getFilteredTransactions(state).map(x => x._id)).toEqual(['t3'])

      // unavailable account
      dispatchOnFilters(filterByDoc({ _id: 'a6', _type: ACCOUNT_DOCTYPE }))
      expect(getAccountsFiltered(state).map(x => x._id)).toEqual(['a0', 'a1', 'a2'])

      checkReset()
    })

    it('should select transactions belonging to a group', () => {
      dispatchOnFilters(filterByDoc({ _id: 'g0', _type: GROUP_DOCTYPE }))
      expect(getAccountsFiltered(state).map(x => x._id)).toEqual(['a0', 'a1'])
      expect(getFilteredTransactions(state).map(x => x._id)).toEqual(['t0', 't1', 't2', 't4'])

      dispatchOnFilters(filterByDoc({ _id: 'g1', _type: GROUP_DOCTYPE }))
      expect(getAccountsFiltered(state).map(x => x._id)).toEqual(['a2'])
      expect(getFilteredTransactions(state).map(x => x._id)).toEqual(['t3'])

      // unavailable group
      dispatchOnFilters(filterByDoc({ _id: 'g7', _type: GROUP_DOCTYPE }))
      expect(getAccountsFiltered(state).map(x => x._id)).toEqual(['a0', 'a1', 'a2'])
      expect(getFilteredTransactions(state).map(x => x._id)).toEqual(['t0', 't1', 't2', 't3', 't4'])

      checkReset()
    })
  })

})
