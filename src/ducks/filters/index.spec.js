import reducer, { filterByAccount, filterByGroup } from '.'
import { ACCOUNT_DOCTYPE, GROUP_DOCTYPE } from 'doctypes'
import { DESTROY_ACCOUNT } from 'actions/accounts'

describe('filter reducer', function () {
  let state
  beforeEach(function () {
    state = {
      accountOrGroupType: null,
      accountOrGroupId: null
    }
  })

  it('should be able to select account/group', function () {
    state = reducer(state, filterByAccount({ id: 'a123' }))
    expect(state.accountOrGroupType).toBe(ACCOUNT_DOCTYPE)
    expect(state.accountOrGroupId).toBe('a123')
  })

  it('should be able to select by group', function () {
    state = reducer(state, filterByGroup({ id: 'g123' }))
    expect(state.accountOrGroupType).toBe(GROUP_DOCTYPE)
    expect(state.accountOrGroupId).toBe('g123')
  })

  it('should reset when there is a delete account event corresponding to the current account', function () {
    const account = { id: 'a123' }
    state = reducer(state, filterByAccount(account))
    state = reducer(state, { type: DESTROY_ACCOUNT, account })
    expect(state.accountOrGroupType).toBe(null)
    expect(state.accountOrGroupId).toBe(null)
  })
})
