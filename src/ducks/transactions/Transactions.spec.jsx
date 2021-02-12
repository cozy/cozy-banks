/* global mount */

import React from 'react'
import { render } from '@testing-library/react'
import { RowDesktop, RowMobile } from './TransactionRow'
import { sortByDate, TransactionsDumb } from './Transactions'
import data from '../../../test/fixtures'
import store from '../../../test/store'
import AppLike from '../../../test/AppLike'
import TransactionPageErrors from 'ducks/transactions/TransactionPageErrors'
import { createMockClient } from 'cozy-client/dist/mock'
import { ACCOUNT_DOCTYPE, TRANSACTION_DOCTYPE } from 'doctypes'

// No need to test this here
jest.mock('ducks/transactions/TransactionPageErrors', () => () => null)

const allTransactions = data['io.cozy.bank.operations']
const accounts = data['io.cozy.bank.accounts']

describe('transaction row', () => {
  let client, transaction

  const setup = (row, withTable) => {
    return render(
      <AppLike store={store} client={client}>
        {withTable ? (
          <table>
            <tbody>{row}</tbody>
          </table>
        ) : (
          row
        )}
      </AppLike>
    )
  }

  beforeEach(() => {
    client = createMockClient({
      queries: {
        transactions: {
          doctype: TRANSACTION_DOCTYPE,
          data: allTransactions
        },
        accounts: {
          doctype: ACCOUNT_DOCTYPE,
          data: accounts
        }
      }
    })
    client.ensureStore()
    transaction = client.hydrateDocument({
      ...client.getDocumentFromState(TRANSACTION_DOCTYPE, 'compteisa1'),
      account: {
        data: {
          ...client.getDocumentFromState(ACCOUNT_DOCTYPE, 'compteisa1')
        }
      }
    })
  })

  it('should render correctly on desktop', () => {
    const root = setup(
      <RowDesktop transaction={transaction} urls={{}} brands={[]} />,
      true
    )
    expect(root.getByText('Compte courant Isabelle - BNPP')).toBeTruthy()
  })

  it('should render correctly on mobile', () => {
    const handleRef = jest.fn()
    const root = setup(
      <RowMobile
        onRef={handleRef}
        transaction={transaction}
        urls={{}}
        brands={[]}
      />,
      false
    )

    expect(root.getByText('Compte courant Isabelle - BNPP')).toBeTruthy()
    expect(handleRef).toHaveBeenCalled()
  })
})

describe('Transactions', () => {
  let i = 0
  const mockTransactions = data['io.cozy.bank.operations'].map(x => ({
    _id: `transaction-id-${i++}`,
    ...x
  }))
  const setup = ({ showTriggerErrors }) => {
    const Wrapper = ({ transactions = mockTransactions }) => {
      return (
        <AppLike>
          <TransactionsDumb
            breakpoints={{ isDesktop: false }}
            transactions={transactions}
            showTriggerErrors={showTriggerErrors}
            TransactionSections={() => <div />}
          />
        </AppLike>
      )
    }
    const root = mount(<Wrapper />)

    return { root, transactions: mockTransactions }
  }

  describe('when showTriggerErrors is false', () => {
    it('should not show transaction errors', () => {
      const { root } = setup({ showTriggerErrors: false })
      expect(root.find(TransactionPageErrors).length).toBe(0)
    })
  })

  describe('when showTriggerErrors is true', () => {
    it('should show transaction errors', () => {
      const { root } = setup({ showTriggerErrors: true })
      expect(root.find(TransactionPageErrors).length).toBe(1)
    })
  })

  it('should sort transactions from props on mount and on update', () => {
    const { root, transactions } = setup({ isOnSubcategory: false })

    const instance = root.find(TransactionsDumb).instance()
    expect(instance.transactions).toEqual(sortByDate(transactions))

    const slicedTransactions = transactions.slice(0, 10)
    root.setProps({ transactions: slicedTransactions })

    const instance2 = root.find(TransactionsDumb).instance()
    expect(instance2.transactions).toEqual(sortByDate(slicedTransactions))
  })
})
