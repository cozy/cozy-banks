import React from 'react'
import { mount } from 'enzyme'
import AppLike from 'test/AppLike'
import { EnsureHasAccounts, EnsureHasAccountsView } from './EnsureHasAccounts'
import Loading from 'components/Loading'
import Onboarding from './Onboarding'

jest.useFakeTimers()

describe('EnsureHasAccountsView', () => {
  const children = () => 'test'

  it('Should show a loader if accounts are loading', () => {
    const accounts = {
      fetchStatus: 'loading'
    }

    const root = mount(
      <AppLike>
        <EnsureHasAccountsView accounts={accounts}>
          {children()}
        </EnsureHasAccountsView>
      </AppLike>
    )

    const loader = root.find(Loading).get(0)
    expect(loader).toBeDefined()
  })

  it('Should show the onboarding if there is no account', () => {
    const accounts = {
      fetchStatus: 'loaded',
      data: []
    }

    const root = mount(
      <AppLike>
        <EnsureHasAccountsView accounts={accounts}>
          {children()}
        </EnsureHasAccountsView>
      </AppLike>
    )

    const onboarding = root.find(Onboarding).get(0)
    expect(onboarding).toBeDefined()
  })

  it('Should show its children if there are some accounts', () => {
    const children = jest.fn().mockReturnValue('test')
    const accounts = {
      fetchStatus: 'loaded',
      data: [{ _id: 'test' }]
    }

    mount(
      <AppLike>
        <EnsureHasAccountsView accounts={accounts}>
          {children()}
        </EnsureHasAccountsView>
      </AppLike>
    )

    expect(children).toHaveBeenCalledTimes(1)
  })
})

describe('EnsureHasAccounts', () => {
  let root

  beforeEach(() => {
    jest
      .spyOn(EnsureHasAccounts.prototype, 'fetchAccounts')
      .mockImplementation(() => {})

    const accounts = {
      fetchStatus: 'loaded',
      data: []
    }

    root = mount(
      <AppLike>
        <EnsureHasAccounts accounts={accounts} />
      </AppLike>
    )
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  it('Should start the interval', () => {
    const component = root
      .find(EnsureHasAccounts)
      .first()
      .instance()

    expect(component.intervalId).toBeTruthy()
  })

  it('Should run the accounts query on each interval tick', () => {
    const component = root
      .find(EnsureHasAccounts)
      .first()
      .instance()

    jest.advanceTimersByTime(60000)

    expect(component.fetchAccounts).toHaveBeenCalledTimes(2)
  })

  it('Should not start the interval if there are accounts', () => {
    const accounts = {
      fetchStatus: 'loaded',
      data: [{ _id: 'test' }]
    }

    const root = mount(
      <AppLike>
        <EnsureHasAccounts accounts={accounts}>test</EnsureHasAccounts>
      </AppLike>
    )

    const component = root
      .find(EnsureHasAccounts)
      .first()
      .instance()

    expect(component.intervalId).toBe(false)
  })
})
