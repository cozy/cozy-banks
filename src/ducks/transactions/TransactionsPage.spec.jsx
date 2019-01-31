/* global mount */

import React from 'react'
import {
  DumbTransactionsPage,
  UnpluggedTransactionsPage,
  TransactionsPageBar
} from './TransactionsPage'
import data from '../../../test/fixtures'

const allAccounts = data['io.cozy.bank.accounts']
const allTransactions = data['io.cozy.bank.operations']

const saveWindowWidth = () => {
  let windowWidth = window.innerWidth
  return () => {
    window.innerWidth = windowWidth
  }
}

const useMobile = () => (window.innerWidth = 400)

describe('TransactionsPage', () => {
  let root, subcategoryName, restoreWindowWidth
  beforeEach(() => {
    restoreWindowWidth = saveWindowWidth()
    jest
      .spyOn(DumbTransactionsPage.prototype, 'displayTransactions')
      .mockReturnValue([])
  })

  afterEach(() => {
    restoreWindowWidth()
    jest.restoreAllMocks()
  })

  const setup = () => {
    root = mount(
      <UnpluggedTransactionsPage
        filteredTransactions={allTransactions}
        filteredAccounts={allAccounts}
        router={{
          params: {
            subcategoryName
          }
        }}
      />
    )
  }

  it('should not show the top balance on movements page on non mobile', () => {
    setup()
    expect(root.find(TransactionsPageBar).length).toBe(0)
  })

  it('should show the top balance on movements page on mobile', () => {
    useMobile()
    setup()
    expect(root.find(TransactionsPageBar).length).toBe(1)
  })

  it('should not show the top balance on movements page on mobile if inside category', () => {
    useMobile()
    subcategoryName = 'family'
    setup()
    expect(root.find(TransactionsPageBar).length).toBe(0)
  })

  it('should handle change in top most transaction', () => {
    setup()
    const tp = root.find(DumbTransactionsPage)
    const instance = tp.instance()
    instance.setState = jest.fn()
    instance.handleChangeTopmostTransaction({ date: '2018-01-02T12:00' })
    expect(instance.setState).toHaveBeenCalledWith({
      currentMonth: '2018-01'
    })
    instance.handleChangeTopmostTransaction({
      realisationDate: '2018-03-30T12:00',
      date: '2018-04-30T12:00'
    })
    expect(instance.setState).toHaveBeenCalledWith({
      currentMonth: '2018-03'
    })
  })
})
