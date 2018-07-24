/* global mount */

import React from 'react'

import { keyBy } from 'lodash'

import { SyncTransactionActions } from './TransactionActions'
import { hydrateReimbursementWithBill } from 'ducks/transactions/helpers'
import { findMatchingActions } from 'ducks/transactions/actions'

import brands from 'ducks/brandDictionary/brands'
import AppLike from '../../../test/AppLike'
import data from '../../../test/fixtures'
import store from '../../../test/store'

jest.mock('utils/documentCache', () => ({
  get: (doctype, id) => mockBillsById[id]
}))

// Find a way to better do that, here we have to copy the definition
// of isProperIcon
jest.mock('cozy-ui/react/Icon', () => {
  const isProperIcon = icon => {
    const isSvgSymbol = icon && !!icon.id
    const isIconIdentifier = typeof icon === 'string'
    return isSvgSymbol || isIconIdentifier
  }
  const mockIcon = props => {
    const icon = props.icon
    return isProperIcon(icon) ? <span data-icon-id={icon.id || icon} /> : icon
  }
  mockIcon.isProperIcon = isProperIcon
  return mockIcon
})

const bills = data['io.cozy.bills']
// prefixed by mock to be used inside documentCache mock
const mockBillsById = keyBy(bills, x => x._id)
const transactions = data['io.cozy.bank.operations']
const getBill = billId => mockBillsById[billId]
const hydratedTransactions = transactions.map(x => ({
  ...x,
  bill: mockBillsById[x.billId],
  reimbursements:
    x.reimbursements &&
    x.reimbursements.map(r => hydrateReimbursementWithBill(r, getBill))
}))
const transactionsById = keyBy(hydratedTransactions, '_id')

/* eslint-disable */
const tests = [
  // transaction id, class variant, text, icon, action name, [action props], [test name]
  ['paiementdocteur', null, '2 reimbursements', 'file', 'HealthExpenseStatus'],
  ['paiementdocteur2', '.c-actionbtn--error', 'No reimbursement yet', 'hourglass', 'HealthExpenseStatus'],
  ['depsantelou1', '.c-actionbtn--error', 'No reimbursement yet', 'hourglass', 'HealthExpenseStatus'],
  ['depsantegene4', '.c-actionbtn--error', 'No reimbursement yet', 'hourglass', 'HealthExpenseStatus'],
  ['depsanteisa2', '.c-actionbtn--error', 'No reimbursement yet', 'hourglass', 'HealthExpenseStatus'],
  ['depsantecla3', '.c-actionbtn--error', 'No reimbursement yet', 'hourglass', 'HealthExpenseStatus'],
  ['facturebouygues', null, '1 invoice', 'file', 'bill'],
  ['salaireisa1', null, 'Accéder à votre paie', 'openwith', 'url'],
  ['fnac', null, 'Accéder au site Fnac', 'openwith', 'url'],
  ['edf', null, 'EDF', null, 'app'],
  ['remboursementcomplementaire', null, 'My reimbursements', 'plus', 'konnector', {
    brands: brands.filter(x => x.name == 'Malakoff Mederic')
  }, 'remboursementcomplementaire konnector not installed'],
  ['remboursementcomplementaire', null, '1 invoice', null, 'bill', {
    brands: []
  }, 'remboursementcomplementaire konnector installed'],
  ['normalshopping', null, 'toto', null]
]
/* eslint-enable */

const actionProps = {
  urls: {
    COLLECT: 'collect',
    edf: 'edf-url://',
    maif: 'maifurl'
  },

  // Brands represents the brands for which no konnector
  // has been installed
  brands: brands.filter(x => x.name == 'Malakoff Mederic')
}

describe('transaction action defaults', () => {
  for (let test of tests) {
    const [
      id,
      variant,
      text,
      icon,
      actionName,
      specificActionProps = {},
      extraName = ''
    ] = test
    describe(`${id} ${extraName}`, () => {
      let root, actions
      beforeAll(async () => {
        const transaction = transactionsById[test[0]]
        const mergedActionProps = { ...actionProps, ...specificActionProps }
        actions = await findMatchingActions(transaction, mergedActionProps)
        root = mount(
          <AppLike store={store}>
            <SyncTransactionActions
              onlyDefault
              transaction={transaction}
              actions={actions}
              actionProps={mergedActionProps}
            />
          </AppLike>
        )
      })

      if (actionName) {
        it('should render the correct action', () => {
          expect(actions.default).not.toBe(undefined)
          expect(actions.default.name).toBe(actionName)
        })
      } else {
        it('should not render an action', () => {
          expect(actions.default).toBe(undefined)
        })
      }

      if (actionName) {
        it('should render the correct text', () => {
          root.update() // https://github.com/airbnb/enzyme/issues/1233#issuecomment-340017108
          const btn = root.find('.c-actionbtn')
          const btnText = btn.text()
          expect(btnText).toEqual(expect.stringContaining(text))
        })
      }

      if (icon) {
        it('should render the correct icon', () => {
          expect(root.find(`[data-icon-id="${icon}"]`).length).toBe(1)
        })
      }

      if (variant) {
        it('should render the correct button', () => {
          expect(root.find(variant).length).toBe(1)
        })
      }
    })
  }
})

describe('transaction action menu', () => {
  for (let test of tests) {
    const [id, , , , , specificActionProps = {}, extraName = ''] = test
    it(`should render correctly ${id} ${extraName}`, async () => {
      const transaction = transactionsById[id]
      const mergedActionProps = { ...actionProps, ...specificActionProps }
      const actions = await findMatchingActions(transaction, mergedActionProps)
      const root = mount(
        <AppLike store={store}>
          <SyncTransactionActions
            transaction={transaction}
            actions={actions}
            actionProps={mergedActionProps}
          />
        </AppLike>
      )
      const texts = root.find('.TransactionAction').map(x => x.text())
      expect(texts).toMatchSnapshot()
    })
  }
})
