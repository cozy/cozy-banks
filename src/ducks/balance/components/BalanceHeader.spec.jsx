/* global mount */

import React from 'react'
import { Figure } from 'components/Figure'
import { DumbBalanceHeader } from './BalanceHeader'

jest.mock('components/KonnectorUpdateInfo', () => () => null)

describe('Balance header', () => {
  let root
  it('should push a route and filter when clicking on the Figure', () => {
    const router = { push: jest.fn() }
    const filterByAccounts = jest.fn()
    const accounts = [{ _id: 'b123' }, { _id: 'b456' }]
    root = mount(
      <DumbBalanceHeader
        accountsBalance={1000}
        t={x => x}
        router={router}
        breakpoints={{ isMobile: true }}
        filterByAccounts={filterByAccounts}
        accounts={accounts}
      />
    )
    const fig = root.find(Figure)
    fig.simulate('click')
    expect(router.push).toHaveBeenCalledWith('/balances/details')
    expect(filterByAccounts).toHaveBeenCalledWith([
      { _id: 'b123' },
      { _id: 'b456' }
    ])
  })
})
