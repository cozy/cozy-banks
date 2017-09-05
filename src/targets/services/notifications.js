import { cozyClient } from 'cozy-konnector-libs'

// operations

const getOperations = async () => {
  // to refactor to get only operations without key notifications directly by the stack
  const operationsWithouNotification = []
  const operations = await cozyClient.data.findAll('io.cozy.bank.operations')
  for (const operation of operations) {
    if (operation.notifications === undefined) {
      operationsWithouNotification.push(operation)
    }
  }
  return operationsWithouNotification
}

// movementGreater

const isMovementGreaterEnable = config => config.movementGreater && config.movementGreater.enable

const processMovementGreater = (config, operations) => {
  const operationsWithMovementGreater = []
  if (config.movementGreater && config.movementGreater.enable) {
    for (const operation of operations) {
      if (operation.amount < -config.movementGreater.value) {
        operationsWithMovementGreater.push(operation)
      }
    }
  }
  return operationsWithMovementGreater
}

const sendMovementGreater = async (config, operations) => {
  const operationsWithMovementGreater = processMovementGreater(config, operations)
  if (operationsWithMovementGreater.length === 0) return

  const notification = {
    reference: 'movement_greater',
    title: operationsWithMovementGreater.length + ' operations qui dépasse votre seuil.',
    content: 'blabla'
  }
  await cozyClient.fetchJSON('POST', '/notifications', {
    data: {
      type: 'io.cozy.notifications',
      attributes: notifications
    }
  })
}

// config

const getConfiguration = async () => {
  const configurations = await cozyClient.data.findAll('io.cozy.bank.settings')
  if (configurations.length > 0 && configurations[0].notifications) {
    return configurations[0].notifications
  } else {
    return undefined
  }
}

const isNotificationsEnable = config => {
  return isMovementGreaterEnable(config)
}

// service

const notificationsService = async () => {
  // load configuration and test if a notification is enable
  const config = await getConfiguration()
  if (config === undefined || !isNotificationsEnable(config)) return // stop notifications service

  // get operations and test if there are operations no precessed
  const operations = await getOperations()
  if (operations.length === 0) return // stop notifications service

  // send notifications
  await sendMovementGreater(config, operations)

  // marks the operations processed
  for (let operation of operations) {
    operation.notifications = true
    await cozyClient.data.update('io.cozy.bank.operations', operation, operation)
  }
}

notificationsService()
