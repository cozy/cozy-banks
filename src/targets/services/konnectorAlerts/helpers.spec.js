import { createMockClient } from 'cozy-client'
import MockDate from 'mockdate'
import parseISO from 'date-fns/parseISO'

import { isOlderThan, storeTriggerStates } from './helpers'

const triggerStatesWithNotifsInfo = [
  {
    trigger: {
      _rev: '1',
      current_state: {
        trigger_id: 'trigger1Id',
        status: 'errored'
      }
    },
    shouldNotify: { reason: 'manual-job' }
  },
  {
    trigger: {
      _rev: '1',
      current_state: {
        trigger_id: 'trigger2Id',
        status: 'errored'
      }
    },
    shouldNotify: { reason: 'last-failure-already-notified' }
  }
]

const previousDoc = { _rev: 'rev1' }

describe('storeTriggerStates', () => {
  it('should save a well formated doc', async () => {
    const client = createMockClient({})

    await storeTriggerStates(client, triggerStatesWithNotifsInfo, previousDoc)

    expect(client.save).toBeCalledWith({
      _id: 'trigger-states',
      _rev: 'rev1',
      _type: 'io.cozy.bank.settings',
      triggerStates: {
        trigger1Id: {
          shouldNotify: {
            reason: 'manual-job'
          },
          status: 'errored',
          trigger_id: 'trigger1Id'
        },
        trigger2Id: {
          shouldNotify: {
            reason: 'last-failure-already-notified'
          },
          status: 'errored',
          trigger_id: 'trigger2Id'
        }
      }
    })
  })
})

describe('isOlderThan', () => {
  afterEach(() => {
    MockDate.reset()
  })

  it('returns true if given date is older than given time parameters', () => {
    MockDate.set(Date.parse('28 Sep 2022 11:14:37 GMT'))

    expect(isOlderThan(parseISO('2022-09-28T11:14:33Z'), { seconds: 3 })).toBe(
      true
    )
  })

  it('returns false if given date is not older than given time parameters', () => {
    MockDate.set(Date.parse('28 Sep 2022 11:14:37 GMT'))

    expect(isOlderThan(parseISO('2022-09-28T11:14:33Z'), { seconds: 4 })).toBe(
      false
    )
  })
})
