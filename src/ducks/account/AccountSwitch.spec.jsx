import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import AccountSwitch from './AccountSwitch'

import { createMockClient } from 'cozy-client/dist/mock'

import AppLike from 'test/AppLike'
import fixtures from 'test/fixtures'
import getClient from 'selectors/getClient'

const accounts = fixtures['io.cozy.bank.accounts']

jest.mock('selectors/getClient', () => jest.fn())

describe('personal info dialog', () => {
  const setup = () => {
    const client = createMockClient({
      queries: {
        accounts: {
          doctype: 'io.cozy.bank.accounts',
          data: accounts
        }
      }
    })
    getClient.mockReturnValue(client)
    const root = render(
      <AppLike client={client}>
        <AccountSwitch />
      </AppLike>
    )
    return { root }
  }

  it('should load the data from several sources', async () => {
    const { root } = setup()

    const allAccounts = root.getByText('All accounts')
    expect(allAccounts).toBeTruthy()
    fireEvent.click(allAccounts)
    expect(root.getByText('Checking accounts')).toBeTruthy()
    expect(root.getByText('7 accounts')).toBeTruthy()
  })
})
