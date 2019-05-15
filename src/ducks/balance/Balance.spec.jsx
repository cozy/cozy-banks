/* global shallow */

import getClient from 'test/client'
const React = require('react')
const { DumbBalance } = require('./Balance')
const debounce = require('lodash/debounce')

jest.mock('lodash/debounce', () => jest.fn(fn => fn))

jest.useFakeTimers()

const fakeCollection = (doctype, data) => ({
  data: data || []
})

describe('Balance page', () => {
  let root, instance, saveDocumentMock, router, filterByAccounts

  const setup = () => {
    saveDocumentMock = jest.fn()
    filterByAccounts = jest.fn()
    router = {
      push: jest.fn()
    }
    const settingDoc = {}
    root = shallow(
      <DumbBalance
        accounts={fakeCollection('io.cozy.bank.accounts')}
        groups={fakeCollection('io.cozy.bank.groups')}
        settings={fakeCollection('io.cozy.bank.settings', [settingDoc])}
        triggers={fakeCollection('io.cozy.triggers')}
        transactions={fakeCollection('io.cozy.bank.operations')}
        saveDocument={saveDocumentMock}
        filterByAccounts={filterByAccounts}
        router={router}
        client={getClient()}
      />
    )
    instance = root.instance()
  }

  it('should call filterByAccounts prop with getCheckAccounts', () => {
    setup()
    let accounts = []
    instance.getCheckedAccounts = () => {
      return accounts
    }
    root.instance().handleClickBalance()
    expect(router.push).toHaveBeenCalledWith('/balances/details')
    expect(filterByAccounts).toHaveBeenCalledWith(accounts)
  })

  describe('panel toggling', () => {
    it('should debounce handlePanelChange', () => {
      setup()
      expect(debounce).toHaveBeenCalledWith(instance.handlePanelChange, 3000, {
        leading: false,
        trailing: true
      })
    })

    it('should call savePanelState when handling panel change', () => {
      setup()
      instance.setState = (fn, callback) => callback.apply(instance)
      jest.spyOn(instance, 'savePanelState')
      instance.handlePanelChange()
      instance.handlePanelChange()
      instance.handlePanelChange()
      expect(instance.savePanelState).toHaveBeenCalledTimes(3)
    })

    it('should call saveDocument when saving panel state', () => {
      setup()
      instance.savePanelState()
      expect(saveDocumentMock).toHaveBeenCalled()
    })
  })
})
