/* global mount */

import React from 'react'
import { find } from 'lodash'
import { TableTrDesktop, TableTrNoDesktop } from './Transactions'
import data from '../../../test/fixtures'
import store from '../../../test/store'
import AppLike from '../../../test/AppLike'
import { Caption } from 'cozy-ui/react'

const allTransactions = data['io.cozy.bank.operations']
const allAccounts = data['io.cozy.bank.accounts']

const wrapRow = row => (
  <AppLike store={store}>
    <table>
      <tbody>{row}</tbody>
    </table>
  </AppLike>
)

describe('transaction row', () => {
  let root

  const rawTransaction = allTransactions[0]
  const transaction = {
    ...rawTransaction,
    account: find(allAccounts, a => a._id == rawTransaction.account)
  }

  it('should render correctly on desktop', () => {
    root = mount(
      wrapRow(
        <TableTrDesktop transaction={transaction} urls={{}} brands={[]} />
      )
    )
    expect(root.find(Caption).text()).toBe('Compte courant Isabelle - BNPP')
  })

  it('should render correctly on mobile', () => {
    root = mount(
      wrapRow(
        <TableTrNoDesktop transaction={transaction} urls={{}} brands={[]} />
      )
    )
    expect(root.find(Caption).text()).toBe('Compte courant Isabelle - BNPP')
  })
})
