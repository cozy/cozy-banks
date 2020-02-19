import React from 'react'
import { mount, shallow } from 'enzyme'
import { DumbReimbursements } from './Reimbursements'
import Loading from 'components/Loading'
import fixtures from 'test/fixtures/unit-tests.json'
import { TransactionList } from 'ducks/transactions/Transactions'
import AppLike from 'test/AppLike'
import Polyglot from 'node-polyglot'
import en from 'locales/en'
import format from 'date-fns/format'
import { createMockClient } from 'cozy-client'
import { render } from '@testing-library/react'

const diveUntilAfter = (shallowMount, selector) => {
  let cur = shallowMount
  while (!cur.is(selector)) {
    cur = cur.dive()
  }
  return cur.dive()
}

const polyglot = new Polyglot()
polyglot.extend(en)

describe('Reimbursements', () => {
  const setup = ({
    mount: shouldMount = false,
    triggers,
    transactions,
    groupedExpenses
  }) => {
    const client = createMockClient({})
    client.intents = {
      getRedirectionURL: jest
        .fn()
        .mockResolvedValue('http://store.cozy.tools:8080')
    }

    const instance = (shouldMount ? mount : shallow)(
      <AppLike client={client}>
        <DumbReimbursements
          fetchStatus="loaded"
          t={polyglot.t.bind(polyglot)}
          f={format}
          triggers={triggers || { fetchStatus: 'loaded' }}
          transactions={transactions || { fetchStatus: 'loaded' }}
          groupedExpenses={groupedExpenses || {}}
          addFilterByPeriod={jest.fn()}
          brands={[]}
          currentPeriod="2020-01"
        />
      </AppLike>
    )

    return shouldMount ? instance : diveUntilAfter(instance, DumbReimbursements)
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

    const root = setup({
      groupedExpenses: {
        pending
      }
    })

    expect(root.find(TransactionList).length).toBe(1)
  })

  it('should show the current filter value if no pending reimbursements', () => {
    const pending = []

    const root = setup({
      groupedExpenses: {
        pending
      },
      mount: true
    })
    expect(root.text()).toContain(
      'No awaiting reimbursement for expenses in January 2020.'
    )
  })

  it('should show the reimbursed transactions', () => {
    const reimbursed = fixtures['io.cozy.bank.operations'].filter(
      transaction => transaction._id === 'paiementdocteur'
    )

    const root = setup({
      groupedExpenses: {
        reimbursed
      }
    })

    expect(root.find(TransactionList).length).toBe(1)
  })

  it('should show a button to open the store if there is no reimbursed transactions and no health brand with trigger', () => {
    const client = createMockClient({})
    client.intents = {
      getRedirectionURL: jest
        .fn()
        .mockResolvedValue('http://store.cozy.tools:8080')
    }

    const { getByText } = render(
      <AppLike client={client}>
        <DumbReimbursements
          fetchStatus="loaded"
          t={polyglot.t.bind(polyglot)}
          f={format}
          triggers={{ fetchStatus: 'loaded' }}
          transactions={{ fetchStatus: 'loaded' }}
          groupedExpenses={{}}
          addFilterByPeriod={jest.fn()}
          brands={[]}
          currentPeriod="2020-01"
        />
      </AppLike>
    )

    expect(getByText('My reimbursements')).toBeDefined()
  })
})
