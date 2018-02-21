import { cozyClient, log } from 'cozy-konnector-libs'
import { initTranslation } from 'cozy-ui/react/I18n/translation'
import subDays from 'date-fns/sub_days'
import { BalanceLower, TransactionGreater, HealthBillLinked } from 'ducks/notifications'
import startOfYesterday from 'date-fns/start_of_yesterday'

const lang = process.env.COZY_LOCALE || 'en'
const dictRequire = lang => require(`../../locales/${lang}`)
const translation = initTranslation(lang, dictRequire)
const t = translation.t.bind(translation)

process.on('uncaughtException', err => {
  log('warn', JSON.stringify(err.stack))
})

process.on('unhandledRejection', err => {
  log('warn', JSON.stringify(err.stack))
})

const getTransactionsChanges = async lastSeq => {
  // lastSeq = '0' // Useful for debug
  const result = await cozyClient.fetchJSON(
    'GET',
    `/data/io.cozy.bank.operations/_changes?include_docs=true&since=${lastSeq}`
  )

  const fourDaysAgo = subDays(new Date(), 4)
  const newLastSeq = result.last_seq
  const transactions = result.results
    .map(x => {
      if (!x.doc) {
        log('warn', `This response row doesn't contain a doc. Why?`, JSON.stringify(x))
      }
      return x.doc
    })
    .filter(doc => doc._id.indexOf('_design') !== 0)
    .filter(doc => !doc._deleted)
    .filter(doc => doc._rev.split('-').unshift() === '1') // only keep documents creations
    .filter(doc => doc.date && new Date(doc.date) > fourDaysAgo) // only mail 4 days old operations
    .filter(Boolean) // TODO find out why some documents are not returned

  const delta = result.results ? result.results.length - transactions.length : 0
  if (delta > 0) {
    log('warn', delta + ' transactions do not have any doc associated')
    log('warn', JSON.stringify(result.results.filter(x => !x.doc)))
  }

  return { newLastSeq, transactions }
}

const configKeys = {
  'BalanceLower': 'balanceLower',
  'TransactionGreater': 'transactionGreater',
  'HealthBillLinked': 'healthBillLinked'
}

const notificationClasses = [BalanceLower, TransactionGreater, HealthBillLinked]

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
        log('warn', `This response row doesn't contain a doc, why?`, JSON.stringify(x))
      }
      return x.doc
    })
    .filter(Boolean)

  const delta = rows.length - accounts.length
  if (delta) {
    log('warn', delta + ' accounts do not exist')
    log('warn', JSON.stringify(rows.filter(x => x.error)))
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
        log('info', Klass.name + ' is not enabled')
      }
      return enabled
    }
  )
}

const sendNotifications = async () => {
  const config = await getConfiguration()
  if (!config) {
    log('info', 'Notications are not configured. Please toggle options in the Banks application')
    return
  }

  const enabledNotificationClasses = getEnabledNotificationClasses(config)
  if (enabledNotificationClasses.length === 0) {
    log('info', 'No notification is enabled')
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
        log('warn', JSON.stringify(err))
      }
    }
  }

  if (lastSeq !== newLastSeq) {
    await saveLastSeqInConfig(config, newLastSeq)
  }
}

sendNotifications()
