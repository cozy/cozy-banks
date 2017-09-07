import { cozyClient } from 'cozy-konnector-libs'
import { initTranslation } from 'cozy-ui/react/I18n/translation'

const lang = process.env.COZY_LOCALE || 'en'
const dictRequire = lang => require(`../../locales/${lang}`)
const translation = initTranslation(lang, dictRequire)
const t = translation.t.bind(translation)

const abs = number => number < 0 ? -number : number

// operations

const getLastSeq = config => config.notifications.lastSeq ? config.notifications.lastSeq : '0'

const saveLastSeq = async (config, lastSeq) => {
  config.notifications.lastSeq = lastSeq
  await cozyClient.data.update('io.cozy.bank.settings', config, config)
}

const getOperationsChanges = async (lastSeq, includeDocs = false) => {
  const result = await cozyClient.fetchJSON(
    'GET',
    `/data/io.cozy.bank.operations/_changes?${includeDocs ? 'include_docs=true&' : ''}since=${lastSeq}`
  )
  if (includeDocs) {
    const operations = []
    for (const operation of result.results) {
      operations.push(operation.doc)
    }
    return operations
  } else {
    return result.last_seq
  }
}

const getOperations = async config => {
  const lastSeq = getLastSeq(config)
  return await getOperationsChanges(lastSeq, true)
}

// movementGreater

const isMovementGreaterEnabled = config => config.notifications.movementGreater && config.notifications.movementGreater.enabled

const processMovementGreater = (config, operations) => {
  const operationsWithMovementGreater = []
  if (config.notifications.movementGreater && config.notifications.movementGreater.enabled) {
    for (const operation of operations) {
      if (abs(operation.amount) > abs(config.notifications.movementGreater.value)) {
        operationsWithMovementGreater.push(operation)
      }
    }
  }
  return operationsWithMovementGreater
}

const sendMovementGreater = async (config, operations) => {
  const operationsWithMovementGreater = processMovementGreater(config, operations)
  if (operationsWithMovementGreater.length === 0) return

  const notification = { reference: 'movement_greater' }
  let translateKey = 'Notifications.if_movement_greater.notification.'
  if (operationsWithMovementGreater.length === 1) {
    const operation = operationsWithMovementGreater[0]
    translateKey += operation.amount > 0 ? 'credit' : 'debit'
    notification.title = t(`${translateKey}.title`, { amount: operation.amount, currency: operation.currency })
    notification.content = t(`${translateKey}.content`, { label: operation.label })
  } else {
    translateKey += 'others'
    notification.title = t(`${translateKey}.title`, {
      movement_length: operationsWithMovementGreater.length,
      greater_than: config.notifications.movementGreater.value
    })
    notification.content = ' '
  }
  await cozyClient.fetchJSON('POST', '/notifications', {
    data: {
      type: 'io.cozy.notifications',
      attributes: notification
    }
  })
}

// config

const getConfiguration = async () => {
  const configurations = await cozyClient.data.findAll('io.cozy.bank.settings')
  if (configurations.length > 0 && configurations[0].notifications) {
    return configurations[0]
  } else {
    return undefined
  }
}

const isNotificationsEnabled = config => {
  return isMovementGreaterEnabled(config)
}

// service

const notificationsService = async () => {
  // load configuration and test if a notification is enabled
  const config = await getConfiguration()
  if (config === undefined || !isNotificationsEnabled(config)) return // stop notifications service

  // get operations and test if there are operations no precessed
  const operations = await getOperations(config)
  if (operations.length === 0) return // stop notifications service

  // send notifications
  await sendMovementGreater(config, operations)

  // marks the operations processed
  for (let operation of operations) {
    operation.notifications = true
    await cozyClient.data.update('io.cozy.bank.operations', operation, operation)
  }

  // save lastSeq
  const lastSeq = await getOperationsChanges(getLastSeq(config))
  await saveLastSeq(config, lastSeq)
}

notificationsService()
