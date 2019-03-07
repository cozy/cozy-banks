/* global shallow */

const React = require('react')
const { DumbBalance } = require('./Balance')
const debounce = require('lodash/debounce')

jest.mock('lodash/debounce', () => jest.fn(fn => fn))

jest.useFakeTimers()

const fakeCollection = (doctype, data) => ({
  data: data || []
})

describe('Balance page', () => {
  let root, instance, saveDocumentMock

  beforeEach(() => {
    saveDocumentMock = jest.fn()
    const settingDoc = {}
    root = shallow(
      <DumbBalance
        accounts={fakeCollection('io.cozy.bank.accounts')}
        groups={fakeCollection('io.cozy.bank.groups')}
        settings={fakeCollection('io.cozy.bank.settings', [settingDoc])}
        saveDocument={saveDocumentMock}
      />
    )
    instance = root.instance()
  })

  describe('panel toggling', () => {
    it('should debounce handlePanelChange', () => {
      expect(debounce).toHaveBeenCalledWith(instance.handlePanelChange, 3000, {
        leading: false,
        trailing: true
      })
    })

    it('should call savePanelState when handling panel change', () => {
      instance.setState = (fn, callback) => callback.apply(instance)
      jest.spyOn(instance, 'savePanelState')
      instance.handlePanelChange()
      instance.handlePanelChange()
      instance.handlePanelChange()
      expect(instance.savePanelState).toHaveBeenCalledTimes(3)
    })

    it('should call saveDocument when saving panel state', () => {
      instance.savePanelState()
      expect(saveDocumentMock).toHaveBeenCalled()
    })
  })
})
