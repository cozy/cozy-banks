import { cozyClient } from 'cozy-konnector-libs'

const getConfiguration = async () => {
  const configurations = await cozyClient.data.findAll('io.cozy.bank.settings')
  if (configurations.length > 0 && configurations[0].notifications) {
    return configurations[0].notifications
  } else {
    return undefined
  }
}

const isNotificationsEnable = config => {
  return config.amountMax.enable
}

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

const processAmountMaxNotification = (config, operations) => {
  const amountMax = []
  if (config.amountMax && config.amountMax.enable) {
    for (const operation of operations) {
      if (operation.amount < -config.amountMax.value) {
        amountMax.push(operation)
      }
    }
  }
  return amountMax
}

const notificationsService = async () => {
  // load configuration
  const config = await getConfiguration()
  console.log(config) // TO REMOVE

  // test if a notification is enable
  if (config === undefined || !isNotificationsEnable(config)) {
    console.log('stop') // TO REMOVE
    return // stop notifications service
  }

  // process operations
  const operations = await getOperations()
  if (operations.length === 0) {
    console.log('stop : 0 operation') // TO REMOVE
    return // stop notifications service
  }

  const amountMax = processAmountMaxNotification(config, operations)

  // marks the operations processed
  for (let operation of operations) {
    operation.notifications = true
    await cozyClient.data.update('io.cozy.bank.operations', operation, operation)
  }

  console.log(amountMax.length) // TO REMOVE
}

notificationsService()
