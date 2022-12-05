import React from 'react'
import MicroEE from 'microee'

import JobsProvider, { JobsContext } from '../context/JobsContext'
import { render, act } from '@testing-library/react'
import CozyClient from 'cozy-client'

const onSuccess = jest.fn()

function CozyRealtimeMock() {
  this.subscribe = jest
    .fn()
    .mockImplementation((eventType, doctype, fn) => {
      this.on(eventType + doctype, fn)
    })
  this.unsubscribe = jest.fn().mockImplementation(() => {
    this.removeAllListeners()
  })

  this.emitRealtimeEvent = (eventType, doctype, event) => {
    this.emit(eventType + doctype, event)
  }

  this.clear = () => {
    this.removeAllListeners()
    this.subscribe.mockClear()
    this.unsubscribe.mockClear()
  }
}
MicroEE.mixin(CozyRealtimeMock)

describe('Jobs Context', () => {
  const setup = () => {
    const client = new CozyClient({})
    client.plugins.realtime = new CozyRealtimeMock()

    const children = (
      <JobsContext.Consumer>
        {({ jobsInProgress }) => {
          return jobsInProgress.map(job => (
            <div key={job.konnector}>
              <span>{job.konnector}</span>
              <span>{job.account}</span>
            </div>
          ))
        }}
      </JobsContext.Consumer>
    )
    const root = render(
      <JobsProvider client={client} options={{ onSuccess }}>
        {children}
      </JobsProvider>
    )
    return { root, client }
  }

  afterEach(() => {
    jest.clearAllMocks()
    jest.clearAllTimers()
  })
  it('should display job in progress', async () => {
    const { root, client } = setup()
    act(() => {
      client.plugins.realtime.emitRealtimeEvent('created', 'io.cozy.jobs', {
        worker: 'konnector',
        state: 'running',
        message: {
          konnector: 'caissedepargne1',
          account: '1234'
        }
      })
      client.plugins.realtime.emitRealtimeEvent('created', 'io.cozy.jobs', {
        worker: 'konnector',
        state: 'running',
        message: {
          konnector: 'boursorama83',
          account: '5678'
        }
      })
    })

    expect(await root.findByText('caissedepargne1')).toBeTruthy()
    expect(await root.findByText('1234')).toBeTruthy()
    expect(await root.findByText('boursorama83')).toBeTruthy()
    expect(await root.findByText('5678')).toBeTruthy()
  })

  it('should not display job in progress for a CONNECTION_DELETED job', () => {
    const { root, client } = setup()
    act(() => {
      client.plugins.realtime.emitRealtimeEvent('created', 'io.cozy.jobs', {
        worker: 'konnector',
        state: 'running',
        message: {
          konnector: 'caissedepargne1',
          account: '1234',
          event: 'CONNECTION_DELETED',
          bi_webhook: true
        }
      })
    })

    expect(root.queryByText('caissedepargne1')).toBeNull()
    expect(root.queryByText('1234')).toBeNull()
    expect(root.queryByText('boursorama83')).toBeNull()
    expect(root.queryByText('5678')).toBeNull()
  })

  it('should display wait job in progress', async () => {
    const { root, client } = setup()

    act(() => {
      client.plugins.realtime.emitRealtimeEvent('notified', 'io.cozy.jobs', {
        data: {
          slug: 'caissedepargne1'
        }
      })
    })

    expect(await root.findByText('caissedepargne1')).toBeTruthy()
    expect(root.queryByText('boursorama83')).toBeNull()
  })

  it('should still display job in progress when real job is running', async () => {
    const { root, client } = setup()

    act(() => {
      client.plugins.realtime.emitRealtimeEvent('notified', 'io.cozy.jobs', {
        data: {
          slug: 'caissedepargne1'
        }
      })
    })

    expect(await root.findByText('caissedepargne1')).toBeTruthy()

    act(() => {
      client.plugins.realtime.emitRealtimeEvent('created', 'io.cozy.jobs', {
        worker: 'konnector',
        state: 'running',
        message: {
          konnector: 'caissedepargne1',
          account: '1234',
        }
      })
    })

    expect(await root.findByText('caissedepargne1')).toBeTruthy()
    expect(await root.findByText('1234')).toBeTruthy()
  })

  it('should should hide wait job in progress after around 5 minutes if no real job was created', async () => {
    const { root, client } = setup()

    act(() => {
      client.plugins.realtime.emitRealtimeEvent('notified', 'io.cozy.jobs', {
        data: {
          slug: 'boursorama83'
        }
      })
    })

    expect(await root.findByText('boursorama83')).toBeTruthy()

    jest.spyOn(Date, 'now').mockImplementation(() => 0)
    jest.useFakeTimers()

    Date.now.mockImplementation(() => 6 * 1000 * 60)
    act(() => {
      jest.advanceTimersByTime(6 * 1000 * 60)
    })
    root.rerender()

    expect(root.queryByText('boursorama83')).toBeNull()
  })
})
