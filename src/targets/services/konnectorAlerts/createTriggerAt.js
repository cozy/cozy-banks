import { TRIGGER_DOCTYPE } from 'doctypes'
import { logger } from 'ducks/konnectorAlerts'

const createTriggerAt = async (client, date) => {
  logger(
    'info',
    `Try to create new @at trigger for konnectorAlerts service at ${
      date.toISOString().split('T')[0]
    }...`
  )
  try {
    await client.save({
      _type: TRIGGER_DOCTYPE,
      type: '@at',
      arguments: date.toISOString(),
      worker: 'service',
      message: {
        name: 'konnectorAlerts',
        slug: 'banks'
      }
    })
    logger(
      'info',
      `⭐ Created: new @at trigger for konnectorAlerts service at ${
        date.toISOString().split('T')[0]
      }`
    )
  } catch (error) {
    logger(
      'error',
      `❗ Error when creating new @at trigger for konnectorAlerts service: ${error.message}`
    )
  }
}

export const containerForTesting = {
  createTriggerAt
}
