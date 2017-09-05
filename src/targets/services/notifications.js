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
  // to refactor to get only operations without services.notifications
  return await cozyClient.data.findAll('io.cozy.bank.operations')
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
  const amountMax = processAmountMaxNotification(config, operations)

  console.log(amountMax.length) // TO REMOVE
}

notificationsService()
