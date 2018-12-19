// Mocking handlersbars since we don't want to test HTML rendering here and it fails in the tests context
jest.mock('handlebars')

import { getEnabledNotificationClasses } from './services'
import BalanceLower from './BalanceLower'
import TransactionGreater from './TransactionGreater'
import HealthBillLinked from './HealthBillLinked'

describe('getEnabledNotificationClasses', () => {
  it('should return the right classes', () => {
    const config = {
      notifications: {
        balanceLower: { enabled: true },
        transactionGreater: { enabled: true },
        healthBillLinked: { enabled: true }
      }
    }

    expect(getEnabledNotificationClasses(config)).toEqual([
      BalanceLower,
      TransactionGreater,
      HealthBillLinked
    ])

    config.notifications.transactionGreater.enabled = false
    expect(getEnabledNotificationClasses(config)).toEqual([
      BalanceLower,
      HealthBillLinked
    ])

    config.notifications.balanceLower.enabled = false
    expect(getEnabledNotificationClasses(config)).toEqual([HealthBillLinked])

    config.notifications.healthBillLinked.enabled = false
    expect(getEnabledNotificationClasses(config)).toHaveLength(0)
  })
})
