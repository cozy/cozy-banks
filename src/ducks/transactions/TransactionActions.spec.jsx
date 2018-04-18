import dummyjson from 'dummy-json'
import { configure, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-15'
import React from 'react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import merge from 'lodash/merge'
import keyBy from 'lodash/keyBy'

import { I18n } from 'cozy-ui/react'
import { SyncTransactionActions } from './TransactionActions'
import { hydrateReimbursementWithBill } from 'documents/transaction'
import { findMatchingActions } from 'ducks/transactions/actions'
import langEn from 'locales/en.json'

import dataTpl from '../../../test/fixtures/operations.json'
import helpers from '../../../test/fixtures/helpers'

const data = JSON.parse(
  dummyjson.parse(
    JSON.stringify(dataTpl),
    merge(helpers, {
      helpers: {
        reference: x => x
      }
    })
  )
)

const store = createStore(() => ({
  mobile: {
    url: 'cozy-url://'
  }
}))

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
    return isProperIcon(icon) ? <span data-icon-id={ icon.id || icon} /> : icon
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

configure({ adapter: new Adapter() })

/* eslint-disable */
const tests = [
  // transaction id, class variant, text, icon, action name
  // TODO find a way to test for icons that are not in cozy-ui/
  // The transform option for jest seems be a good option but
  // I could not get it to work
  ['paiementdocteur', null, '2 reimbursements', 'file', 'HealthExpenseStatus'],
  ['paiementdocteur2', '.c-actionbtn--error', 'No reimbursement yet', null, 'HealthExpenseStatus'],
  ['depsantelou1', '.c-actionbtn--error', 'No reimbursement yet', null, 'HealthExpenseStatus'],
  ['depsantegene4', '.c-actionbtn--error', 'No reimbursement yet', null, 'HealthExpenseStatus'],
  ['depsanteisa2', '.c-actionbtn--error', 'No reimbursement yet', null, 'HealthExpenseStatus'],
  ['depsantecla3', '.c-actionbtn--error', 'No reimbursement yet', null, 'HealthExpenseStatus'],
  ['facturebouygues', null, '1 invoice', 'file', 'bill'],
  ['salaireisa1', null, 'Accéder à votre paie', 'openwith', 'url'],
  ['fnac', null, 'Accéder au site Fnac', 'openwith', 'url'],
  ['edf', null, 'EDF', null, 'app']
]
/* eslint-enable */

const AppLike = ({ children }) => (
  <I18n lang={'en'} dictRequire={() => langEn}>
    <Provider store={store}>{children}</Provider>
  </I18n>
)

const actionProps = {
  urls: {
    edf: 'edf-url://'
  },
  brands: []
}

describe('transaction action defaults', () => {
  for (let test of tests) {
    const [id, variant, text, icon, actionName] = test
    describe(`${id}`, () => {
      let root, actions
      beforeAll(async () => {
        const transaction = transactionsById[test[0]]
        actions = await findMatchingActions(transaction, actionProps)
        root = mount(
          <AppLike>
            <SyncTransactionActions
              onlyDefault
              transaction={transaction}
              actions={actions}
              actionProps={actionProps}
            />
          </AppLike>
        )
      })

      it('should render the correct action', () => {
        expect(actions.default).not.toBe(undefined)
        expect(actions.default.name).toBe(actionName)
      })

      it('should render the correct text', () => {
        root.update() // https://github.com/airbnb/enzyme/issues/1233#issuecomment-340017108
        const btn = root.find('.c-actionbtn')
        const btnText = btn.text()
        expect(btnText).toEqual(expect.stringContaining(text))
      })

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
    const [id] = test
    it(`should render correctly ${id}`, async () => {
      const transaction = transactionsById[id]
      const actions = await findMatchingActions(transaction, actionProps)
      const root = mount(
        <AppLike>
          <SyncTransactionActions
            transaction={transaction}
            actions={actions}
            actionProps={actionProps}
          />
        </AppLike>
      )
      const texts = root.find('.TransactionAction').map(x => x.text())
      expect(texts).toMatchSnapshot()
    })
  }
})
