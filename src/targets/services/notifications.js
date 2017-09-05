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

// amountMax

const isAmountMaxEnable = config => config.amountMax && config.amountMax.enable

const processAmountMax = (config, operations) => {
  const operationsWithAmountMax = []
  if (config.amountMax && config.amountMax.enable) {
    for (const operation of operations) {
      if (operation.amount < -config.amountMax.value) {
        operationsWithAmountMax.push(operation)
      }
    }
  }
  return operationsWithAmountMax
}

const sendAmountMax = async (config, operations) => {
  const operationsWithAmountMax = processAmountMax(config, operations)
  if (operationsWithAmountMax.length === 0) return

  const notification = {
    reference: 'alert_amount_max',
    title: operationsWithAmountMax.length + ' operations qui dépasse votre seuil.',
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
  return isAmountMaxEnable(config)
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
  await sendAmountMax(config, operations)

  // marks the operations processed
  for (let operation of operations) {
    operation.notifications = true
    await cozyClient.data.update('io.cozy.bank.operations', operation, operation)
  }
}

notificationsService()
