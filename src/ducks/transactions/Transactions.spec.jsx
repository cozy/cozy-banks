/* global mount */

import React from 'react'
import Tappable from 'react-tappable/lib/Tappable'
import { render, fireEvent, wait } from '@testing-library/react'
import flag from 'cozy-flags'

import useBreakpoints from 'cozy-ui/transpiled/react/hooks/useBreakpoints'
import Alerter from 'cozy-ui/transpiled/react/Alerter'

import data from 'test/fixtures'
import AppLike from 'test/AppLike'
import { createMockClient } from 'cozy-client/dist/mock'

import TransactionPageErrors from 'ducks/transactions/TransactionPageErrors'
import { TransactionsDumb, sortByDate } from './Transactions'

// No need to test this here
jest.mock('ducks/transactions/TransactionPageErrors', () => () => null)

jest.mock('react-tappable/lib/Tappable', () => ({
  default: jest.fn(),
  __esModule: true
}))

jest.mock('cozy-ui/transpiled/react/hooks/useBreakpoints', () => ({
  __esModule: true,
  default: jest.fn(),
  BreakpointsProvider: ({ children }) => children
}))

jest.mock('cozy-ui/transpiled/react/Alerter', () => ({
  success: jest.fn()
}))

describe('Transactions', () => {
  let i = 0
  const mockTransactions = data['io.cozy.bank.operations'].map(x => ({
    _id: `transaction-id-${i++}`,
    ...x
  }))
  const setup = ({ showTriggerErrors }) => {
    const Wrapper = ({ transactions = mockTransactions }) => {
      return (
        <AppLike>
          <TransactionsDumb
            breakpoints={{ isDesktop: false }}
            transactions={transactions}
            showTriggerErrors={showTriggerErrors}
            TransactionSections={() => <div />}
          />
        </AppLike>
      )
    }
    const root = mount(<Wrapper />)

    return { root, transactions: mockTransactions }
  }

  describe('when showTriggerErrors is false', () => {
    it('should not show transaction errors', () => {
      const { root } = setup({ showTriggerErrors: false })
      expect(root.find(TransactionPageErrors).length).toBe(0)
    })
  })

  describe('when showTriggerErrors is true', () => {
    it('should show transaction errors', () => {
      const { root } = setup({ showTriggerErrors: true })
      expect(root.find(TransactionPageErrors).length).toBe(1)
    })
  })

  it('should sort transactions from props on mount and on update', () => {
    const { root, transactions } = setup({ isOnSubcategory: false })

    const instance = root.find(TransactionsDumb).instance()
    expect(instance.transactions).toEqual(sortByDate(transactions))

    const slicedTransactions = transactions.slice(0, 10)
    root.setProps({ transactions: slicedTransactions })

    const instance2 = root.find(TransactionsDumb).instance()
    expect(instance2.transactions).toEqual(sortByDate(slicedTransactions))
  })
})

describe('SelectionBar', () => {
  beforeAll(() => {
    flag('banks.selectionMode.enabled', true)
  })

  afterAll(() => {
    flag('banks.selectionMode.enabled', undefined)
  })

  beforeEach(() => {
    Alerter.success.mockReset()
  })

  let i = 0
  const mockTransactions = data['io.cozy.bank.operations'].map(x => ({
    _id: `transaction-id-${i++}`,
    ...x
  }))

  // Mock tappable so that key down fires its onPress event
  Tappable.mockImplementation(({ children, onPress, onTap }) => {
    return (
      <div onClick={onTap} onKeyDown={onPress}>
        {children}
      </div>
    )
  })

  const setup = ({ isDesktop = false } = {}) => {
    const client = createMockClient({})
    client.save.mockImplementation(doc => ({ data: doc }))
    useBreakpoints.mockReturnValue({ isDesktop })

    const root = render(
      <AppLike client={client}>
        <TransactionsDumb
          breakpoints={{ isDesktop: false }}
          transactions={mockTransactions}
          showTriggerErrors={false}
        />
      </AppLike>
    )

    return { root, client }
  }

  it('should show selection bar and open category modal', async () => {
    const { root, client } = setup({ isDesktop: false })
    const { getByText, getByTestId, queryByTestId } = root

    fireEvent.keyDown(getByText('Remboursement Pret Lcl'))
    expect(queryByTestId('selectionBar')).toBeTruthy()
    expect(queryByTestId('selectionBar-count').textContent).toBe(
      '1 item selected'
    )

    // should remove the selection bar
    fireEvent.click(getByText('Remboursement Pret Lcl'))
    expect(queryByTestId('selectionBar')).toBeFalsy()

    // should show 2 transactions selected
    fireEvent.keyDown(getByText('Remboursement Pret Lcl'))
    expect(queryByTestId('selectionBar')).toBeTruthy()
    fireEvent.click(getByText('Edf Particuliers'))
    expect(queryByTestId('selectionBar-count').textContent).toBe(
      '2 items selected'
    )

    // should unselected transaction
    fireEvent.click(getByText('Edf Particuliers'))
    expect(queryByTestId('selectionBar-count').textContent).toBe(
      '1 item selected'
    )
    fireEvent.click(getByText('Edf Particuliers'))
    expect(queryByTestId('selectionBar-count').textContent).toBe(
      '2 items selected'
    )

    // selecting a category
    fireEvent.click(getByTestId('selectionBar-action-categorize'))
    fireEvent.click(getByText('Everyday life'))
    fireEvent.click(getByText('Supermarket'))

    // should remove the selection bar and show a success alert
    expect(queryByTestId('selectionBar')).toBeFalsy()
    await wait(() => expect(client.save).toHaveBeenCalledTimes(2))
    expect(Alerter.success).toHaveBeenCalledWith(
      '2 operations have been recategorized'
    )
  })

  it('should show selection bar and open category modal on desktop', async () => {
    const { root, client } = setup({ isDesktop: true })
    const { getByText, getByTestId, queryByTestId } = root

    fireEvent.click(getByTestId('TransactionRow-checkbox-reimbursement'))
    expect(queryByTestId('selectionBar')).toBeTruthy()
    expect(queryByTestId('selectionBar-count').textContent).toBe(
      '1 item selected'
    )

    // should remove the selection bar
    fireEvent.click(getByText('Remboursement Pret Lcl'))
    expect(queryByTestId('selectionBar')).toBeFalsy()

    // should show 2 transactions selected
    fireEvent.click(getByTestId('TransactionRow-checkbox-reimbursement'))
    expect(queryByTestId('selectionBar')).toBeTruthy()
    fireEvent.click(getByText('Edf Particuliers'))
    expect(queryByTestId('selectionBar-count').textContent).toBe(
      '2 items selected'
    )

    // should unselected transaction
    fireEvent.click(getByText('Edf Particuliers'))
    expect(queryByTestId('selectionBar-count').textContent).toBe(
      '1 item selected'
    )
    fireEvent.click(getByText('Edf Particuliers'))
    expect(queryByTestId('selectionBar-count').textContent).toBe(
      '2 items selected'
    )

    // selecting a category
    fireEvent.click(getByText('Categorize'))
    fireEvent.click(getByText('Everyday life'))
    fireEvent.click(getByText('Supermarket'))

    // should remove the selection bar and show a success alert
    expect(queryByTestId('selectionBar')).toBeFalsy()
    await wait(() => expect(client.save).toHaveBeenCalledTimes(2))
    expect(Alerter.success).toHaveBeenCalledWith(
      '2 operations have been recategorized'
    )
  })
})
