import { cozyClient } from 'cozy-konnector-libs'
import { initTranslation } from 'cozy-ui/react/I18n/translation'
import { BalanceLower, TransactionGreater } from 'ducks/notifications'
import startOfYesterday from 'date-fns/start_of_yesterday'

const lang = process.env.COZY_LOCALE || 'en'
const dictRequire = lang => require(`../../locales/${lang}`)
const translation = initTranslation(lang, dictRequire)
const t = translation.t.bind(translation)

process.on('uncaughtException', err => {
  console.warn(err.stack)
})

process.on('unhandledRejection', err => {
  console.warn(err.stack)
})

const getTransactionsChanges = async lastSeq => {
  // lastSeq = '0' // Useful for debug
  const result = await cozyClient.fetchJSON(
    'GET',
    `/data/io.cozy.bank.operations/_changes?include_docs=true&since=${lastSeq}`
  )

  const newLastSeq = result.last_seq
  const transactions = result.results
    .filter(x => x.doc && x.doc._id.indexOf('_design') !== 0)
    .filter(x => x.doc && !x.doc._deleted)
    .map(x => {
      if (!x.doc) {
        console.warn(`This response row doesn't contain a doc. Why?`, JSON.stringify(x))
      }
      return x.doc
    })
    .filter(Boolean) // TODO find out why some documents are not returned
    .filter(doc => new Date(doc.dateImport) > startOfYesterday())

  const delta = result.results ? result.results.length - transactions.length : 0
  if (delta > 0) {
    console.warn(delta + ' transactions do not have any doc associated')
    console.warn(result.results.filter(x => !x.doc))
  }

  return { newLastSeq, transactions }
}

const configKeys = {
  'BalanceLower': 'balanceLower',
  'TransactionGreater': 'transactionGreater'
}

const notificationClasses = [BalanceLower, TransactionGreater]

const getAccountsOfTransactions = async transactions => {
  const accountsIds = Array.from(new Set(transactions.map(x => x.account)))
  const result = await cozyClient.fetchJSON(
    'POST',
    '/data/io.cozy.bank.accounts/_all_docs?include_docs=true',
    {keys: accountsIds}
  )

  const rows = result.rows
  const accounts = rows
    .filter(x => !x.error) // filter accounts that have not been found
    .map(x => {
      if (!x.doc) {
        console.warn(`This response row doesn't contain a doc, why?`, JSON.stringify(x))
      }
      return x.doc
    })
    .filter(Boolean)

  const delta = rows.length - accounts.length
  if (delta) {
    console.warn(delta + ' accounts do not exist')
    console.warn(rows.filter(x => x.error))
  }

  return accounts
}

const getConfiguration = async () => {
  const configurations = await cozyClient.data.findAll('io.cozy.bank.settings')
  if (configurations.length > 0) {
    return configurations[0]
  }
}

const getLastSeqFromConfig = config =>
  config.notifications.lastSeq ? config.notifications.lastSeq : '0'

const saveLastSeqInConfig = async (config, lastSeq) => {
  config.notifications.lastSeq = lastSeq
  await cozyClient.data.update('io.cozy.bank.settings', config, config)
}

const getClassConfig = (Klass, config) => config.notifications[configKeys[Klass.name]]

const getEnabledNotificationClasses = config => {
  return notificationClasses.filter(
    Klass => {
      const klassConfig = getClassConfig(Klass, config)
      const enabled = klassConfig && klassConfig.enabled
      if (!enabled) {
        console.log(Klass.name + ' is not enabled')
      }
      return enabled
    }
  )
}

const sendNotifications = async () => {
  const config = await getConfiguration()
  if (!config) {
    console.warn('Notications are not configured. Please toggle options in the Banks application')
    return
  }

  const enabledNotificationClasses = getEnabledNotificationClasses(config)
  if (enabledNotificationClasses.length === 0) {
    console.log('No notification is enabled')
    return
  }

  const lastSeq = getLastSeqFromConfig(config)
  const { newLastSeq, transactions } = await getTransactionsChanges(lastSeq)

  if (transactions.length > 0) {
    const accounts = await getAccountsOfTransactions(transactions)
    for (const Klass of enabledNotificationClasses) {
      const klassConfig = getClassConfig(Klass, config)
      const notification = new Klass({ ...klassConfig, t, data: { accounts, transactions } })
      try {
        await notification.sendNotification(accounts, transactions)
      } catch (err) {
        console.warn(err)
      }
    }
  }

  if (lastSeq !== newLastSeq) {
    await saveLastSeqInConfig(config, newLastSeq)
  }
}

sendNotifications()
