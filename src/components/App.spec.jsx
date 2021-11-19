import React from 'react'
import { render, fireEvent, wait } from '@testing-library/react'

import App from 'components/App'
import AppLike from 'test/AppLike'
import Links from 'ducks/client/links'

import {
  REQUEST_FAILED,
  useRequestStateContext
} from 'ducks/context/RequestStateContext'
import Alerter from 'cozy-ui/transpiled/react/Alerter'

// Mock otherwise we have a fetch is not defined error
// due to pouchdb-browser. Here we are not concerned with this
// component
jest.mock('cozy-pouch-link', () => () => null)
jest.mock('components/AppSearchBar', () => () => null)
jest.mock('ducks/commons/Nav', () => () => null)
jest.mock('ducks/client/links', () => ({
  getActivatePouch: jest.fn()
}))

const DumbComponent = () => {
  const { setRequestState } = useRequestStateContext()

  const handleChangeNetworkState = () => setRequestState(REQUEST_FAILED)

  return (
    <button onClick={handleChangeNetworkState}>
      Change NetworkState to RequestFailed
    </button>
  )
}

describe('App', () => {
  beforeEach(() => {
    jest.spyOn(Alerter, 'error')
    jest.spyOn(window.location, 'reload')
  })

  afterEach(() => {
    Alerter.error.mockReset()
    window.location.reload.mockReset()
  })

  const setup = () =>
    render(
      <AppLike>
        <App>
          <DumbComponent />
        </App>
      </AppLike>
    )

  describe('Network State Alerter', () => {
    it('should no show error if pouch is activated', async () => {
      Links.getActivatePouch = jest.fn().mockImplementation(() => true)
      const root = setup()

      fireEvent.click(root.getByText('Change NetworkState to RequestFailed'))
      await wait(() => {
        expect(Alerter.error).not.toBeCalled()
      })
    })

    it('should show an error next reload page when network state has request failed and reload button is pressed', async () => {
      Links.getActivatePouch = jest.fn().mockImplementation(() => false)
      const root = setup()
      window.location.reload = jest.fn()

      fireEvent.click(root.getByText('Change NetworkState to RequestFailed'))

      await wait(() => {
        expect(Alerter.error).toHaveBeenCalledTimes(1)
        const errorMsg = Alerter.error.mock.calls[0][0]
        expect(errorMsg).toBe(
          'Connection lost. Try again later or verify your connection and reload the page.'
        )
        setTimeout(() => {
          const refreshButton = root.getByText('Refresh')
          fireEvent.click(refreshButton)
          expect(window.location.reload).toHaveBeenCalledTimes(1)
        }, 2000)
      })
    })
  })
})
