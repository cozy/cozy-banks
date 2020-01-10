import React from 'react'
import { shallow } from 'enzyme'
import { DumbHealthReimbursements } from './HealthReimbursements'
import Loading from 'components/Loading'
import fixtures from 'test/fixtures/unit-tests.json'
import { TransactionsWithSelection } from 'ducks/transactions/Transactions'
import { StoreLink } from 'components/StoreLink'

describe('HealthReimbursements', () => {
  const setup = ({ triggers, transactions, groupedHealthExpenses }) => {
    return shallow(
      <DumbHealthReimbursements
        fetchStatus="loaded"
        t={key => key}
        triggers={triggers || { fetchStatus: 'loaded' }}
        transactions={transactions || { fetchStatus: 'loaded' }}
        groupedHealthExpenses={groupedHealthExpenses || {}}
        addFilterByPeriod={jest.fn()}
        brands={[]}
      />
    )
  }
  it('should show a loading if the transactions are loading', () => {
    const root = setup({
      transactions: { fetchStatus: 'loading' }
    })

    expect(root.find(Loading).length).toBe(1)
  })

  it('should show a loading if the brands are loading', () => {
    const root = setup({ triggers: { fetchStatus: 'loading' } })

    expect(root.find(Loading).length).toBe(1)
  })

  it('should show the pending reimbursements', () => {
    const pending = fixtures['io.cozy.bank.operations'].filter(
      transaction => transaction._id === 'paiementdocteur2'
    )

    // Wrapping in `AppLike` instead of giving `t` manually makes the test
    // fail: no `TransactionsWithSelection` exists
    const root = setup({
      groupedHealthExpenses: {
        pending
      }
    })

    expect(root.find(TransactionsWithSelection).length).toBe(1)
  })

  it('should show the reimbursed transactions', () => {
    const reimbursed = fixtures['io.cozy.bank.operations'].filter(
      transaction => transaction._id === 'paiementdocteur'
    )

    const root = setup({
      groupedHealthExpenses: {
        reimbursed
      }
    })

    expect(root.find(TransactionsWithSelection).length).toBe(1)
  })

  it('should show a button to open the store if there is no reimbursed transactions and no health brand with trigger', () => {
    const root = setup({
      groupedHealthExpenses: {}
    })

    expect(root.find(StoreLink).length).toBe(1)
  })
})
