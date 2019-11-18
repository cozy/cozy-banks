import schema from './schema'
import CozyClient from 'cozy-client'
import { saveDocHandlingConflicts } from './conflicts'

const makeConflictError = () => ({
  message: JSON.stringify({
    error: 'conflict'
  })
})

describe('conflict resolution', () => {
  const setup = () => {
    const client = new CozyClient({
      schema: schema
    })
    let i = 0
    jest.spyOn(client, 'save').mockImplementation(async doc => {
      if (i === 0) {
        i++
        throw makeConflictError()
      } else {
        return doc
      }
    })

    const originalSettings = {
      _id: '1234',
      _type: 'io.cozy.bank.settings',
      categoryBudgetAlerts: [
        {
          id: 0,
          maxThreshold: 10,
          categoryId: '400100'
        }
      ]
    }

    const serverSettings = {
      ...originalSettings,
      categoryBudgetAlerts: [
        {
          ...originalSettings.categoryBudgetAlerts[0],
          lastNotificationAmount: 120, // server has changed lastNotificationAmount
          lastNotificationDate: '2019-08-07T12:00' // server has changed lastNotificationDate
        }
      ]
    }

    jest.spyOn(client, 'query').mockResolvedValue({
      data: serverSettings
    })

    return { client, originalSettings }
  }

  describe('when both server and user have made changes', () => {
    it('should correctly handle a conflict', async () => {
      const { client, originalSettings } = setup()

      const updatedDoc = await saveDocHandlingConflicts(client, {
        ...originalSettings,
        categoryBudgetAlerts: [
          {
            id: 0,
            maxThreshold: 20, // user has changed maxThresold
            categoryId: '400200' // user has changed categoryId
          }
        ]
      })

      expect(updatedDoc).toEqual({
        _id: '1234',
        _type: 'io.cozy.bank.settings',
        categoryBudgetAlerts: [
          {
            id: 0,
            maxThreshold: 20, // from user
            categoryId: '400200', // from user
            lastNotificationAmount: 120, // from server
            lastNotificationDate: '2019-08-07T12:00' // from server
          }
        ]
      })
    })
  })

  describe('when user has deleted elements from an array', () => {
    it('should correctly handle a conflict', async () => {
      const { client, originalSettings } = setup()

      const updatedDoc = await saveDocHandlingConflicts(client, {
        ...originalSettings,
        categoryBudgetAlerts: []
      })

      expect(updatedDoc).toEqual({
        _id: '1234',
        _type: 'io.cozy.bank.settings',
        categoryBudgetAlerts: [] // from user
      })
    })
  })
})
