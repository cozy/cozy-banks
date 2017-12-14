import { cozyClient } from 'cozy-konnector-libs'
import { initTranslation } from 'cozy-ui/react/I18n/translation'
import { BalanceLower, TransactionGreater } from 'ducks/notifications'

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
  const result = await cozyClient.fetchJSON(
    'GET',
    `/data/io.cozy.bank.operations/_changes?include_docs=true&since=${lastSeq}`
  )
  const newLastSeq = result.last_seq
  const transactions = result.results
    .filter(x => x.doc)
    .map(x => x.doc)

  if (transactions.length < result.results.length) {
    console.warn('Some transactions do not have any doc associated')
    console.warn(results.results.filter(x => !x.doc))
  }

  return { newLastSeq, transactions }
}

const getAccountsOfTransactions = async transactions => {
  const accountsIds = Array.from(new Set(transactions.map(x => x.account)))
  const result = await cozyClient.fetchJSON(
    'POST',
    '/data/io.cozy.bank.accounts/_all_docs?include_docs=true',
    {keys: accountsIds}
  )

  const rows = result.rows
  const accounts = rows
    .filter(x => !x.error) // filter document that have not been found
    .map(x => x.doc)

  if (accounts.length !== rows.length) {
    console.warn('Some transactions\' account do not exist')
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

const sendNotifications = async () => {
  const config = await getConfiguration()
  if (!config) return

  const notifications = [
    new TransactionGreater({ ...config.notifications.transactionGreater, t }),
    new BalanceLower({ ...config.notifications.balanceLower, t })
  ]
  const enabledNotifications = notifications.filter(notif => notif.isEnabled())
  if (enabledNotifications.length === 0) return

  const lastSeq = getLastSeqFromConfig(config)
  const { newLastSeq, transactions } = await getTransactionsChanges(lastSeq)

  if (transactions.length > 0) {
    const accounts = await getAccountsOfTransactions(transactions)
    for (const notification of notifications) {
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
