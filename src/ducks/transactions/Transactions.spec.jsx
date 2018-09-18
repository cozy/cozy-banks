/* global mount */

import React from 'react'
import { TableTrDesktop, TableTrNoDesktop } from './Transactions'
import data from '../../../test/fixtures'
import store from '../../../test/store'
import AppLike from '../../../test/AppLike'
import { Caption } from 'cozy-ui/react'
import { getClient } from 'test/client'
import { normalizeData } from 'test/store'

const allTransactions = data['io.cozy.bank.operations']

describe('transaction row', () => {
  let root, client, transaction

  const wrapRow = row => (
    <AppLike store={store} client={client}>
      <table>
        <tbody>{row}</tbody>
      </table>
    </AppLike>
  )

  const rawTransaction = allTransactions[0]
  rawTransaction._type = 'io.cozy.bank.operations'

  beforeEach(() => {
    client = getClient()
    client.ensureStore()
    const datastore = normalizeData({
      'io.cozy.bank.accounts': data['io.cozy.bank.accounts']
    })
    jest
      .spyOn(client, 'getDocumentFromState')
      .mockImplementation((doctype, id) => {
        return datastore[doctype][id]
      })
    transaction = client.hydrateDocument(rawTransaction)
  })

  xit('should render correctly on desktop', () => {
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
