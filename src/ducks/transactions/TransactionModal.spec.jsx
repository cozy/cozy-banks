/* global mount */

import React from 'react'
import { DumbTransactionModal as TransactionModal } from './TransactionModal'
import data from '../../../test/fixtures'
import AppLike from 'test/AppLike'
import store from 'test/store'
import pretty from 'pretty'

jest.mock('preact-portal', () => ({ children }) => children)

const allTransactions = data['io.cozy.bank.operations']
const allAccounts = data['io.cozy.bank.accounts']

describe('transaction modal', () => {
  it('should render correctly', () => {
    // need to fix number of the account otherwise its randomly
    // set by the fixture
    const transaction = { ...allTransactions[0], _id: '2' }
    const account = { ...allAccounts[0], number: 1 }
    const root = mount(
      <AppLike store={store}>
        <TransactionModal
          transactionId={transaction._id}
          transaction={transaction}
          account={account}
          showCategoryChoice={() => {}}
          requestClose={() => {}}
          urls={{}}
          brands={[]}
        />
      </AppLike>
    )
    expect(pretty(root.html())).toMatchSnapshot()
  })
})
